import { IUserState } from '@/types/redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUserState = {
  walletAddress: '',
  nric: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    setNric: (state, action: PayloadAction<string>) => {
      state.nric = action.payload;
    },
    clearUser: (state) => {
      state.walletAddress = '';
    },
  },
});

export const { setWalletAddress, setNric, clearUser } = userSlice.actions;

export default userSlice.reducer;
