import { startTransition, useActionState } from 'react';
import { delay } from '../utils';
import clsx from 'clsx';

export default function NativeUseActionStateTest() {
  const [state, dispatch, isPending] = useActionState<number, number>(async (prevState, payload) => {
    await delay(1000);
    return prevState + payload;
  }, 0);

  const handleClick = () => {
    startTransition(() => {
      dispatch(1);
    });
  };

  return (
    <div>
      <button
        className={clsx('bg-blue-500 rounded-md p-2 text-white', {
          'bg-gray-100 cursor-not-allowed': isPending,
        })}
        onClick={handleClick}
        disabled={isPending}
      >
        call action
      </button>
      <div>{isPending ? 'calculating...' : state}</div>
    </div>
  );
}
