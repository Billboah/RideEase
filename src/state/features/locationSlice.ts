import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  carType: string;
  carDuration: number;
}

const initialState: LocationState = {
  carType: "",
  carDuration: 0,
};

export const locationSlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setCarType: (state: { carType: string }, action: PayloadAction<string>) => {
      state.carType = action.payload;
    },
    setCarDuration: (
      state: { carDuration: number },
      action: PayloadAction<number>
    ) => {
      state.carDuration = action.payload;
    },
  },
});

export const { setCarDuration, setCarType } = locationSlice.actions;

export const selectCarDuration = (state: { query: LocationState }) =>
  state.query.carDuration;
export const selectCarType = (state: { query: LocationState }) =>
  state.query.carType;

export default locationSlice.reducer;
