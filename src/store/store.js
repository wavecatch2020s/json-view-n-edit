import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./data-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
