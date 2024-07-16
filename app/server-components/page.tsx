import { readFile } from 'fs/promises';
import { Suspense } from 'react';
import { delay } from '../utils';

async function AsyncContent() {
  const content = await readFile('package.json', 'utf-8');
  await delay(1000);
  return <div>{content}</div>;
}

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncContent />
      </Suspense>
    </div>
  );
}
