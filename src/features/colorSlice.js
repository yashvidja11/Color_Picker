import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "colorData",
  initialState: {
    colorData: [],
  },
  reducers: {
    colorStore: (state, action) => {
      state.colorData.push(action.payload)
    },
    saveGeneratedColors: (state, action) => {
        state.colorData = action.payload;
      },
      updatedColors : (state , action)=>{
        state.colorData = action.payload
      }
  },
});

export const {colorStore , saveGeneratedColors , updatedColors} = colorSlice.actions;
export default colorSlice.reducer
