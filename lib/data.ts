import { Registration } from '@/types/registration';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'registrations.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read registrations from file
export function getRegistrations(): Registration[] {
  ensureDataDir();
  
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading registrations:', error);
    return [];
  }
}

// Save registration to file
export function saveRegistration(registration: Registration): void {
  ensureDataDir();
  
  const registrations = getRegistrations();
  registrations.push(registration);
  
  fs.writeFileSync(dataFilePath, JSON.stringify(registrations, null, 2));
}

// Generate confirmation number
export function generateConfirmationNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MAIA-${timestamp}-${random}`;
}

