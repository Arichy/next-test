import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { Message } from './type';

export async function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function getDBPath() {
  return resolve(process.cwd(), 'public/db.json');
}

export async function readDb() {
  const db = await readFile(getDBPath(), 'utf-8');
  return JSON.parse(db) as { messages: Message[] };
}
