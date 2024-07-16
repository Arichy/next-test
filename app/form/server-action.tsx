'use client';
import { useState, useTransition } from 'react';
import clsx from 'clsx';
import { increment } from '../actions/action';

export default function ServerAction() {
  const [state, setState] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const nextCount = await increment();
      setState(nextCount);
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
