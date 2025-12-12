import { kv } from '@vercel/kv';
import { Registration } from '@/types/registration';

const REGISTRATION_LIST_KEY = 'registrations:list';
const REGISTRATION_KEY_PREFIX = 'registration:';

// @vercel/kv generic helpers expect an object-like record type
type KVRecord = Record<string, unknown>;
type KVRegistration = Registration & KVRecord;

async function getRegistrationIdsFromList(): Promise<string[]> {
  const ids = await kv.lrange<string>(REGISTRATION_LIST_KEY, 0, -1);
  return ids || [];
}

async function getRegistrationIdsByScan(options?: { limit?: number }): Promise<string[]> {
  const limit = options?.limit ?? 2000;
  const ids: string[] = [];

  // Fallback for older deployments that may have saved hashes but not the list index key.
  for await (const key of kv.scanIterator({ match: `${REGISTRATION_KEY_PREFIX}*`, count: 100 })) {
    if (typeof key !== 'string') continue;
    if (!key.startsWith(REGISTRATION_KEY_PREFIX)) continue;

    const id = key.slice(REGISTRATION_KEY_PREFIX.length);
    if (id) ids.push(id);
    if (ids.length >= limit) break;
  }

  return ids;
}

/**
 * Fetch all registrations from Vercel KV.
 * Returns most recent first.
 */
export async function getRegistrations(): Promise<Registration[]> {
  // Preferred path: read from the list index
  let ids = await getRegistrationIdsFromList();

  // Fallback path: scan all hash keys if the list index is missing/empty
  if (ids.length === 0) {
    ids = await getRegistrationIdsByScan();
  }

  // De-dupe (defensive: LPUSH can duplicate on retries)
  ids = Array.from(new Set(ids));
  if (ids.length === 0) return [];

  const records = await Promise.all(
    ids.map(async (id) => {
      const data = await kv.hgetall<KVRegistration>(`${REGISTRATION_KEY_PREFIX}${id}`);
      return (data as Registration) || null;
    })
  );

  return records
    .filter((r): r is Registration => Boolean(r))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * Save a registration into Vercel KV.
 */
export async function saveRegistration(registration: Registration): Promise<void> {
  const id = registration.id;
  const key = `${REGISTRATION_KEY_PREFIX}${id}`;

  // Upstash does not support null hash values; omit null/undefined fields.
  const cleaned = Object.fromEntries(
    Object.entries(registration).filter(([, v]) => v !== null && v !== undefined)
  ) as KVRegistration;

  await kv.hset(key, cleaned);
  // Prepend to list so newest are first
  await kv.lpush(REGISTRATION_LIST_KEY, id);
}

// Generate confirmation number (kept for compatibility, though we no longer display it)
export function generateConfirmationNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MAIA-${timestamp}-${random}`;
}

