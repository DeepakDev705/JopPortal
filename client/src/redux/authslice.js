import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user:null
  },
  reducers: {
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthuser:(state,action) => {
      state.user = action.payload;
    }
  },
});

export const { setLoading, setAuthuser } = authSlice.actions;
export default authSlice.reducer;
