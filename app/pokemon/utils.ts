import { readFile } from 'fs/promises';
import { resolve } from 'path';

export async function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function getDBPath() {
  return resolve(process.cwd(), 'public/star.json');
}

export async function readDb() {
  const db = await readFile(getDBPath(), 'utf-8');
  return JSON.parse(db) as string[];
}
