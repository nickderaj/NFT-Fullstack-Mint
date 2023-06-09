import { IUserState } from '@/types/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUserState = {
  walletAddress: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    clearUser: (state) => {
      state.walletAddress = '';
    },
  },
});

export const { setWalletAddress, clearUser } = userSlice.actions;

export default userSlice.reducer;
