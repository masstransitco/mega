import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  selectedCarId: number | null;
  selectedStationId: number | null;
}

const initialState: UserState = {
  selectedCarId: null,
  selectedStationId: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectCar: (state, action: PayloadAction<number>) => {
      state.selectedCarId = action.payload;
    },
    selectStation: (state, action: PayloadAction<number>) => {
      state.selectedStationId = action.payload;
    },
    resetBooking: (state) => {
      state.selectedCarId = null;
      state.selectedStationId = null;
    }
  }
});

export const { selectCar, selectStation, resetBooking } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectSelectedCarId = (state: { user: UserState }) => state.user.selectedCarId;
export const selectSelectedStationId = (state: { user: UserState }) => state.user.selectedStationId;
