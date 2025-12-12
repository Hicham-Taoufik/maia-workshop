import { kv } from '@vercel/kv';
import { Registration } from '@/types/registration';

const REGISTRATION_LIST_KEY = 'registrations:list';

// @vercel/kv generic helpers expect an object-like record type
type KVRecord = Record<string, unknown>;
type KVRegistration = Registration & KVRecord;

/**
 * Fetch all registrations from Vercel KV.
 * Returns most recent first.
 */
export async function getRegistrations(): Promise<Registration[]> {
  const ids = await kv.lrange<string>(REGISTRATION_LIST_KEY, 0, -1);
  if (!ids || ids.length === 0) return [];

  const records = await Promise.all(
    ids.map(async (id) => {
      const data = await kv.hgetall<KVRegistration>(`registration:${id}`);
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
  const key = `registration:${id}`;

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

