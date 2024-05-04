import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDriver: null,
  error: null,
  loading: false,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    signInDriverStart: (state) => {
      state.loading = true;
    },
    signInDriverSuccess: (state, action) => {
      state.currentDriver = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInDriverFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateDriverStart: (state) => {
      state.loading = true;
    },
    updateDriverSuccess: (state, action) => {
      state.currentDriver = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateDriverFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteDriverStart: (state) => {
      state.loading = true;
    },
    deleteDriverSuccess: (state) => {
      state.currentDriver = null;
      state.loading = false;
      state.error = null;
    },
    deleteDriverFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutDriverStart: (state) => {
      state.loading = true;
    },
    signOutDriverSuccess: (state) => {
      state.currentDriver = null;
      state.loading = false;
      state.error = null;
    },
    signOutDriverFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInDriverStart,
  signInDriverSuccess,
  signInDriverFailure,
  updateDriverFailure,
  updateDriverSuccess,
  updateDriverStart,
  deleteDriverFailure,
  deleteDriverSuccess,
  deleteDriverStart,
  signOutDriverFailure,
  signOutDriverSuccess,
  signOutDriverStart,
} = driverSlice.actions;

export default driverSlice.reducer;
