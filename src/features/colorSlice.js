
import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "colorData",
  initialState: {
    colorData:[],
  },
  reducers: {
    colorStore: (state, action) => {
      const lastGroup = state.colorData[state.colorData.length - 1];
      if (lastGroup && lastGroup.length < 4) {
        lastGroup.push(action.payload);
      } else {
        console.log(action.payload);
        state.colorData.push(action.payload);
      }
    },
    saveGeneratedColors: (state, action) => {
      state.colorData=action.payload;
    },
    updatedColors: (state, action) => {
      state.colorData = action.payload;
    },
    

  },
});

export const { colorStore, saveGeneratedColors, updatedColors } = colorSlice.actions;
export default colorSlice.reducer;