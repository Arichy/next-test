'use client';

import ServerActionForm from './server-action-form';
import NativeUseActionStateTest from './native-use-action-state';
import ClientActionForm from './client-action-form';
import ClientAction from './client-action';
import ServerAction from './server-action';

export default function Page() {
  return (
    <div className="flex flex-col h-full gap-10">
      <section>
        <p>Client Action</p>
        <div className="border p-2 rounded-md">
          <ClientAction />
        </div>
      </section>

      <section>
        <p>Server Action</p>
        <div className="border p-2 rounded-md">
          <ServerAction />
        </div>
      </section>

      <section>
        <p>Native useActionState</p>
        <div className="border p-2 rounded-md">
          <NativeUseActionStateTest />
        </div>
      </section>

      <section>
        <p>Client Form Test</p>
        <div className="border p-2 rounded-md">
          <ClientActionForm />
        </div>
      </section>

      <section>
        <p>Server Action Form Test</p>
        <div className="border p-2 rounded-md">
          <ServerActionForm />
        </div>
      </section>
    </div>
  );
}
