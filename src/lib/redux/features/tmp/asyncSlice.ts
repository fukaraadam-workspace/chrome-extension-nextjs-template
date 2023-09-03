import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/redux/store';

export interface AsyncState {
  asyncState: {
    data: null | string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: null | any;
  };
}

// Initial state
const initialState: AsyncState = {
  asyncState: {
    data: null,
    status: 'idle',
    error: null,
  },
};

const sleep = async (milliseconds: number) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, milliseconds);
  });
};

export const asyncFuncWithData = createAsyncThunk('async/sleep', async () => {
  await sleep(2000);
  return { data: 'test data' };
});

const asyncSlice = createSlice({
  name: 'async',
  // `asyncSlice` will infer the state type from the `initialState` argument
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncFuncWithData.pending, (state, action) => {
        state.asyncState.status = 'loading';
      })
      .addCase(asyncFuncWithData.fulfilled, (state, action) => {
        state.asyncState.status = 'succeeded';
        // Add any fetched data to the state
        state.asyncState.data = action.payload.data;
      })
      .addCase(asyncFuncWithData.rejected, (state, action) => {
        state.asyncState.status = 'failed';
        state.asyncState.error = action.error.message;
      });
  },
});

// The functions below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAsyncState = (state: RootState) => state.async.asyncState;

export default asyncSlice.reducer;
