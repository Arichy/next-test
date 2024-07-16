/* eslint-disable @next/next/no-img-element */
'use client';

import { Suspense, useState, use } from 'react';

function SuspenseList({ query, promise }: { query: string; promise: Promise<any> | null }) {
  if (!promise) {
    return null;
  }

  const result = use(promise);
  console.log(result);

  return (
    <div>
      {result === 'Not found' ? (
        <p className="mt-4">Not found</p>
      ) : (
        <div>
          {/* table with border */}
          <table className="border border-gray-300 rounded-md p-2 w-full mt-4">
            <tbody>
              <tr className="border">
                <th className="border">Name</th>
                <th className="border">{result.name}</th>
              </tr>
              <tr className="border">
                <th className="border">Image</th>
                <th className="border">
                  <div className="flex items-center justify-center">
                    <img
                      // src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${result.id}.svg`}
                      src={result.sprites.front_default}
                      width={100}
                      height={100}
                      alt="Pokemon"
                    />
                  </div>
                </th>
              </tr>
              <tr className="border">
                <th className="border">Type</th>
                <th className="border">{result.types.map(slot => slot.type.name).join(', ')}</th>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ditto
// bulbasaur
// pikachu
// gengar
export default function Page() {
  const [query, setQuery] = useState('');

  const [promise, setPromise] = useState<Promise<any> | null>(null);

  return (
    <div>
      <div>// ditto // bulbasaur // pikachu // gengar</div>
      <input
        type="text"
        value={query}
        onChange={e => {
          const value = e.target.value;

          setQuery(value);

          if (value.trim()) {
            setPromise(
              fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value.trim()}`)
                .then(async res => {
                  if (res.status === 404) {
                    return 'Not found';
                  }

                  return res.json();
                })
                .catch(err => {
                  console.log({ err });
                  return err;
                })
            );
          }
        }}
        placeholder="Search..."
        className="border border-gray-300 rounded-md p-2 w-full mt-4"
      />

      <Suspense fallback={<div className="mt-4">Loading...</div>}>
        <SuspenseList query={query} promise={promise} />
      </Suspense>
    </div>
  );
}
