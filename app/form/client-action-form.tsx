import { useActionState } from 'react';

import styles from './index.module.scss';
import clsx from 'clsx';
import { delay } from '../utils';

const clientValidate = false;

const submitForm = async (prevState: { error: string } | null, formData: FormData) => {
  const name = formData.get('name') as string;
  const age = formData.get('age') as string;

  if (clientValidate) {
    // name should be more than 2 characters
    if (name.length < 2) {
      return { error: 'Name should be more than 2 characters' };
    }
    // age should be more than 18
    if (parseInt(age, 10) < 18) {
      return { error: 'Age should be more than 18' };
    }
  }

  const res = (await fetch('/api/form', { method: 'POST', body: formData }).then(res => res.json())) as
    | {
        error: string;
      }
    | { success: true };

  if ('error' in res) {
    return { error: res.error };
  }

  return null;
};

export default function ClientActionForm() {
  const [state, dispatch, isPending] = useActionState<{ error: string } | null, FormData>(submitForm, null);

  return (
    <div>
      <form action={dispatch} className={styles.container}>
        <div>
          <label htmlFor="name" className="block">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 rounded-md p-2"
            autoComplete="off"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="age" className="block">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="border border-gray-300 rounded-md p-2"
            autoComplete="off"
          />
        </div>

        {/* submit button */}
        <button
          type="submit"
          disabled={isPending}
          className={clsx('border-gray-300 rounded-md bg-blue-500 text-white p-2 mt-4', {
            'bg-gray-100 cursor-not-allowed': isPending,
          })}
        >
          Submit
        </button>

        {/* error message */}
        {state?.error && <div className="text-red-500 mt-4">{state.error}</div>}
      </form>
    </div>
  );
}
