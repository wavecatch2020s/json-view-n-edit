import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    loadJsonData(state, action) {
      const jsonFile = action.payload;

      state.data = jsonFile;
    },
    changeValue(state, action) {
      const [groupIndex, propertyName, newValue] = action.payload;

      state.data[groupIndex][propertyName] = newValue;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
