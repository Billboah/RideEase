import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  carType: string;
  carDuration: number;
  checkoutSessionId: string;
}

const initialState: LocationState = {
  carType: "",
  carDuration: 0,
  checkoutSessionId: "",
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
    setCheckoutSessionId: (state, action) => {
      state.checkoutSessionId = action.payload;
    },
  },
});

export const { setCarDuration, setCarType, setCheckoutSessionId } =
  locationSlice.actions;

export const selectCarDuration = (state: { query: LocationState }) =>
  state.query.carDuration;
export const selectCarType = (state: { query: LocationState }) =>
  state.query.carType;

export const selectCheckoutSessionId = (state: {
  query: { checkoutSessionId: string };
}) => {
  state.query.checkoutSessionId;
};

export default locationSlice.reducer;
