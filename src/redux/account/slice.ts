import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountState } from './types';

const initialState: AccountState = {
  email: '',
  roles: [],
}

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    clearAccount: (state, action: PayloadAction) => {
      state.email = '';
      state.roles = [];
      window.localStorage.clear();
    },
    setAccount: (state, action: PayloadAction<AccountState>) => {
      state.email = action.payload.email;
      state.roles = action.payload.roles;
    },
  },
})

export const { setAccount, clearAccount } = accountSlice.actions;

export default accountSlice.reducer;
