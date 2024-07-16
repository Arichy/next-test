import { useActionState } from 'react';
import { submitForm } from '../actions/action';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

function FormStatus() {
  const status = useFormStatus();

  return status.pending ? (
    <div className="text-blue-400 mt-4">
      Submitting with name: {status.data.get('name') as string}; age: {status.data.get('age') as string}
    </div>
  ) : null;
}

export default function ServerActionForm() {
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

        <FormStatus />

        {/* error message */}
        {state?.error && <div className="text-red-500 mt-4">{state.error}</div>}
      </form>
    </div>
  );
}
