import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/redux/store';

export enum UserState {
  LoggedIn = 'Logged In',
  NotLoggedIn = 'Not Logged In',
}

export interface BasicState {
  userState: UserState;
  userName: string | null;
}

// Initial state
const initialState: BasicState = {
  userState: UserState.NotLoggedIn,
  userName: null,
};

const basicSlice = createSlice({
  name: 'basic',
  // `basicSlice` will infer the state type from the `initialState` argument
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    logout: (state) => {
      state.userState = UserState.NotLoggedIn;
      state.userName = null;
    },
    login: (state, action: PayloadAction<BasicState['userName']>) => {
      state.userState = UserState.LoggedIn;
      state.userName = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, login } = basicSlice.actions;

// The functions below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserState = (state: RootState) => state.basic.userState;
export const selectUserName = (state: RootState) => state.basic.userName;

export default basicSlice.reducer;
