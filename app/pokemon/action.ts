'use server';

import { writeFile } from 'fs/promises';
import { getDBPath, readDb } from './utils';

export async function toggleStarStatus(name: string, isStar: boolean) {
  const db = await readDb();
  let newDb: string[] = [];

  if (isStar) {
    const set = new Set(db);
    set.add(name);
    newDb = Array.from(set);
  } else {
    newDb = db.filter(star => star !== name);
  }

  await writeFile(getDBPath(), JSON.stringify(newDb));

  return { newStatus: isStar };
}
