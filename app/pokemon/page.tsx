import { Suspense } from 'react';
import { readDb } from './utils';

import StarButton from './star-button';
import Pagination from './pagination';
import Image from 'next/image';
import Skeleton from './skeleton';

const LIMIT = 10;

async function Await({ promises, children }: { promises: Promise<any>[]; children: (data: any) => JSX.Element }) {
  const data = await Promise.all(promises);
  return children(data);
}

async function PokemonCard({ name, url, isStar }: { name: string; url: string; isStar: boolean }) {
  const pokemon = await fetch(url).then(res => res.json());

  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-2 hover:bg-gray-100">
      <div className="w-1/3">
        <span className="text-gray-500">#{url.split('/')[6]}</span>
        <span> {name}</span>
      </div>

      {
        <div className="w-1/3" style={{ height: 60 }}>
          {pokemon.sprites.front_default ? (
            <Image src={pokemon.sprites.front_default} width={60} height={60} alt={name} />
          ) : null}
        </div>
      }

      <StarButton name={name} isStar={isStar} />
    </div>
  );
}

async function List({ page, query, data, stars }: { page: number; query?: string; data?: any; stars: string[] }) {
  return (
    <div>
      <div>
        {data.results.map((pokemon: any) => (
          <div key={pokemon.name}>
            <PokemonCard name={pokemon.name} url={pokemon.url} isStar={stars.includes(pokemon.name)} />
          </div>
        ))}
      </div>
    </div>
  );
}

let previousTotalPage = 0;
export default async function Page({ searchParams }: { searchParams?: { page?: string; query?: string } }) {
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const query = searchParams?.query;

  const fetchWithDelay = async () => {
    console.log('start fetching');
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}&offset=${LIMIT * (page - 1)}`).then(
      res => res.json()
    );
    console.log('finish fetching');
    // await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('finish delay');
    return data;
  };

  const promises = [fetchWithDelay(), readDb()];

  console.log(`fetch pokemon list: ${page}`);

  const returnValue = (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Pokemon Page {page}</h1>
        <Suspense key={`${page},${query}`} fallback={<Skeleton />}>
          <Await promises={promises}>
            {([data, stars]) => {
              return <List page={page} query={query} data={data} stars={stars} />;
            }}
          </Await>
        </Suspense>
        <div className="flex justify-end">
          <Suspense key={page} fallback={<Pagination totalPages={previousTotalPage} classNames="mt-8" />}>
            <Await promises={promises}>
              {([data]) => {
                const totalPages = Math.ceil(data.count / LIMIT);
                previousTotalPage = totalPages;

                return <Pagination totalPages={totalPages} classNames="mt-8" />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );

  console.log('return', returnValue);
  return returnValue;
}
