import { INftState } from '@/types/redux';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: INftState = {
  nftsOwned: [],
  latestTx: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNftsOwned: (state, action: PayloadAction<any[]>) => {
      state.nftsOwned = action.payload;
    },
    setLatestTx: (state, action: PayloadAction<string>) => {
      state.latestTx = action.payload;
    },
    clearLatestTx: (state) => {
      state.latestTx = '';
    },
  },
});

export const { setNftsOwned, setLatestTx, clearLatestTx } = userSlice.actions;

export default userSlice.reducer;
