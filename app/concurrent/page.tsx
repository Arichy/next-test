'use client';

import { useDeferredValue, useMemo, useState, useTransition } from 'react';

const N = 500;

function SlowPost({ value }: { value: string }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Post #{value}</li>;
}

function Normal() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(e.target.value);

    if (value === '') {
      setResults([]);
      return;
    }

    const mockResults = Array(N).fill(value);
    setResults(mockResults);
  };

  return (
    <div className="w-full">
      <p>Normal Input</p>
      <input
        type="text"
        value={query}
        onChange={changeHandler}
        placeholder="Search..."
        className="border border-gray-300 rounded-md p-2 w-full mt-4"
      />

      <ul className="mt-4">
        {results.map((result, index) => (
          <SlowPost key={index} value={result} />
        ))}
      </ul>
    </div>
  );
}

function TransitionTest() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);

    if (value === '') {
      setResults([]);
      return;
    }

    startTransition(() => {
      const mockResults = Array(N).fill(value);
      setResults(mockResults);
    });
  };

  return (
    <div className="w-full">
      <p>useTransition</p>
      <input
        type="text"
        value={query}
        onChange={changeHandler}
        placeholder="Search..."
        className="border border-gray-300 rounded-md p-2 w-full mt-4"
      />

      {isPending ? (
        <div className="mt-4">Loading...</div>
      ) : (
        <ul className="mt-4">
          {results.map((result, index) => (
            <SlowPost key={index} value={result} />
          ))}
        </ul>
      )}
    </div>
  );
}

function DeferredValue() {
  const [query, setQuery] = useState('');
  const deferredValue = useDeferredValue(query);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const list = useMemo(() => {
    if (!deferredValue) {
      return [];
    }
    const l = [];
    for (let i = 0; i < N; i++) {
      l.push(deferredValue);
    }
    return l;
  }, [deferredValue]);

  return (
    <div className="w-full">
      <p>useDeferredValue</p>
      <input
        type="text"
        value={query}
        onChange={changeHandler}
        placeholder="Search..."
        className="border border-gray-300 rounded-md p-2 w-full mt-4"
      />

      {query !== deferredValue ? (
        <div className="mt-4">Loading...</div>
      ) : (
        <ul className="mt-4">
          {list.map((value, index) => {
            return <SlowPost key={index} value={value} />;
          })}
        </ul>
      )}
    </div>
  );
}

export default function Page() {
  // list Normal, TransitionTest, and DeferredValue in the UI side by side
  return (
    <div className="flex gap-x-16 w-full justify-between">
      <Normal />
      <TransitionTest />
      <DeferredValue />
    </div>
  );
}
