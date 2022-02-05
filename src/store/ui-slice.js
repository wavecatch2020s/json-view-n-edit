import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showJsonCode: false,
  },
  reducers: {
    showJson(state, action) {
      const showStatus = action.payload;

      state.showJsonCode = showStatus;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
