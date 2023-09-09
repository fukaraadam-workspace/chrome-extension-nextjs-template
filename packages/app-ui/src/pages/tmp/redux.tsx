'use client';

import { useState } from 'react';
// Redux
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import {
  UserState,
  selectUserState,
  selectUserName,
  login,
  logout,
} from '@/lib/redux/features/tmp/basicSlice';
import {
  selectAsyncState,
  asyncFuncWithData,
} from '@/lib/redux/features/tmp/asyncSlice';
import { useGetPokemonByNameQuery } from '@/lib/redux/features/tmp/pokemonApi/pokemonApi';
import { useLazyGetSimplePriceQuery } from '@/lib/redux/features/tmp/coinGeckoApi/coinGeckoEndpoint';

export default function Redux() {
  const userState = useAppSelector(selectUserState);
  const userName = useAppSelector(selectUserName);
  const asyncState = useAppSelector(selectAsyncState);
  const dispatch = useAppDispatch();

  const [userNameInput, setUserNameInput] = useState('');

  const { data, error, isLoading, isSuccess } =
    useGetPokemonByNameQuery('bulbasaur');

  const pokemonName = userNameInput ? 'pikachu' : null;
  const pokemonPikachu = useGetPokemonByNameQuery(pokemonName ?? skipToken);

  const [trigger, result, lastPromiseInfo] = useLazyGetSimplePriceQuery();
  const handleTrigger = () => {
    trigger({
      ids: 'ethereum',
      vsCurrencies: 'usd',
    });
  };

  return (
    <div className="mx-auto h-[600px] w-[400px]">
      {/* Above is added for extension */}
      <main className="flex min-h-screen flex-col items-start justify-between p-12">
        <h1 className="text-xl font-bold">Redux Usage Examples</h1>

        <div>
          <h2 className="text-lg font-bold">1. Basic Usage</h2>

          <input
            type="text"
            value={userNameInput}
            onChange={(event) => setUserNameInput(event.target.value)}
            className="mr-2 rounded border border-gray-400 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="User Name"
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => dispatch(login(userNameInput))}
          >
            Login
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
          {userState === UserState.LoggedIn ? (
            <p>Logged in as {userName}</p>
          ) : (
            <p>Not logged in</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold">2. Get Some Async Data</h2>

          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => dispatch(asyncFuncWithData())}
          >
            Get Async Data
          </button>
          <p>Status: {asyncState.status}</p>
          <p>Data: {asyncState.data}</p>
        </div>

        <div>
          <h2 className="text-lg font-bold">3. Redux Query Pokemon</h2>

          {isLoading ? (
            <span>Loading...</span>
          ) : isSuccess ? (
            <h3>{data.species.name}</h3>
          ) : (
            <span>error: Unexpected error happened...</span>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold">
            4. Redux Query Pokemon if there is user name
          </h2>

          {pokemonPikachu.isLoading ? (
            <span>Loading...</span>
          ) : pokemonPikachu.isSuccess ? (
            <h3>{pokemonPikachu.data.species.name}</h3>
          ) : pokemonPikachu.isUninitialized ? null : (
            <span>error: Unexpected error happened...</span>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold">
            5. Redux Query coinGeckoApi manually
          </h2>

          <div>
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={() => handleTrigger()}
            >
              Fetch Data Manually
            </button>
          </div>
          {result.isUninitialized ? null : result.isFetching ? (
            <span>Loading...</span>
          ) : result.isSuccess ? (
            <h3>
              1 eth = {(result.data as any)?.ethereum?.usd ?? 'no data'} usd
            </h3>
          ) : (
            <span>error: Unexpected error happened...</span>
          )}
        </div>
      </main>
    </div>
  );
}
