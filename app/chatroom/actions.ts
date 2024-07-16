'use server';

import { writeFile } from 'fs/promises';

import { delay, getDBPath, readDb } from './utils';
import { Message } from './type';
import { revalidatePath } from 'next/cache';

export async function sendMessage(prevState: any, formData: FormData) {
  const message = formData.get('message') as string;

  if (!message) {
    return { success: false, error: 'message cannot be empty' };
  }

  if (message.includes('123')) {
    return { success: false, error: 'message cannot contain 123' };
  }

  const { messages } = await readDb();

  const newMessage = [...messages, { key: messages.length, text: message, sending: false }] satisfies Message[];

  await delay(1000);

  await writeFile(getDBPath(), JSON.stringify({ messages: newMessage }));

  revalidatePath('/');

  return { success: true };
}

export async function deleteMessage(key: number) {
  const { messages } = await readDb();

  const newMessages = messages.filter(message => message.key !== key);

  await writeFile(getDBPath(), JSON.stringify({ messages: newMessages }));

  revalidatePath('/');

  return { success: true };
}
