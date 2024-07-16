'use server';

import { delay } from '../utils';

export async function add(a: number, b: number) {
  return a + b;
}

let count = 0;
export async function increment() {
  await delay(1000);
  count++;
  return count;
}

export async function submitForm(prevState: { error: string } | null, formData: FormData) {
  const name = formData.get('name') as string;
  const age = formData.get('age') as string;

  await delay(1000);

  if (name.length < 2) {
    return { error: 'From Server Action: Name should be more than 2 characters' };
  }

  if (parseInt(age, 10) < 18) {
    return { error: 'From Server Action: Age should be more than 18' };
  }

  return null;
}
