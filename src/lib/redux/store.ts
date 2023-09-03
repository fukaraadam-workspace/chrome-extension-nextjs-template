import { configureStore } from '@reduxjs/toolkit';
import basicReducer from './features/tmp/basicSlice';
import asyncReducer from './features/tmp/asyncSlice';
import { pokemonApi } from './features/tmp/pokemonApi/pokemonApi';
import { coinGeckoApi } from './features/tmp/coinGeckoApi/coinGeckoApi';
// For logging errors
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

/**
 * Catch all errors from RTK Query
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.error(action);
    }

    return next(action);
  };

export const store = configureStore({
  reducer: {
    basic: basicReducer,
    async: asyncReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(coinGeckoApi.middleware)
      .concat(rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
