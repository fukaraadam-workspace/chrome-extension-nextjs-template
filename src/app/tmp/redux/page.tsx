'use client';

import { useState } from 'react';
// Redux
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

export default function Redux() {
  const userState = useAppSelector(selectUserState);
  const userName = useAppSelector(selectUserName);
  const asyncState = useAppSelector(selectAsyncState);
  const dispatch = useAppDispatch();

  const [userNameInput, setUserNameInput] = useState('');

  const { data, error, isLoading, isSuccess } =
    useGetPokemonByNameQuery('bulbasaur');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Redux Usage Examples</h1>

      <h2 className="text-3xl font-bold">Basic Usage</h2>
      <div>
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

      <h2 className="text-3xl font-bold">Get Some Async Data</h2>
      <div>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => dispatch(asyncFuncWithData())}
        >
          Get Async Data
        </button>
        <p>Status: {asyncState.status}</p>
        <p>Data: {asyncState.data}</p>
      </div>

      <h2 className="text-3xl font-bold">Redux Query Pokemon</h2>
      <div>
        {isLoading ? (
          <span>Loading...</span>
        ) : isSuccess ? (
          <h3>{data.species.name}</h3>
        ) : (
          <span>error: Unexpected error happened...</span>
        )}
      </div>
    </main>
  );
}
