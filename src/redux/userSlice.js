import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Initially no user is logged in
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set the logged-in user
    },
    logout: (state) => {
      state.user = null; // Clear the user on logout
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;