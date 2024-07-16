import { useState, useTransition } from 'react';
import { delay } from '../utils';
import clsx from 'clsx';

export default function ClientAction() {
  const [state, setState] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await delay(1000);
      setState(prev => prev + 1);
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
