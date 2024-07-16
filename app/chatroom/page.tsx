import Thread from './Thread';
import { readDb } from './utils';

export default async function Page() {
  const db = await readDb();

  return (
    <div>
      <h1 className="font-bold text-4xl">ChatRoom</h1>
      <hr className="my-7" />
      <Thread messages={db.messages} />
    </div>
  );
}
