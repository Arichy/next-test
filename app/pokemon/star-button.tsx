'use client';

import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useState, useTransition, useOptimistic, use } from 'react';
import { toggleStarStatus } from './action';

export default function StarButton({ name, isStar }: { name: string; isStar: boolean }) {
  const [starStatus, setStarStatus] = useState(isStar);
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(starStatus, (state, newStatus: boolean) => {
    return newStatus;
  });

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        onClick={() => {
          startTransition(async () => {
            setOptimisticStatus(!starStatus);
            const { newStatus } = await toggleStarStatus(name, !starStatus);
            setStarStatus(newStatus);
          });
        }}
        disabled={isPending}
      >
        {optimisticStatus ? (
          <StarIconSolid className="text-yellow-500 w-6" />
        ) : (
          <StarIcon className="text-gray-300 w-6" />
        )}
      </button>
    </>
  );
}
