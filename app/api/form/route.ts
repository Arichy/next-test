import { delay } from '@/app/utils';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const name = data.get('name') as string;
  const age = data.get('age') as string;

  await delay(1000);

  if (name.length < 2) {
    return Response.json({ error: 'From server: Name should be more than 2 characters' });
  }

  if (parseInt(age, 10) < 18) {
    return Response.json({ error: 'From server: Age should be more than 18' });
  }

  return Response.json({ success: true });
}
