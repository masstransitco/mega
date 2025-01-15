import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface BookingState {
  step: number;
  stepName: string; // Optional helper for Chat's context
  departureDate: Date | null;
}

const initialState: BookingState = {
  step: 1,
  stepName: 'select_departure_time',
  departureDate: null
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setDepartureDate: (state, action: PayloadAction<Date>) => {
      state.departureDate = action.payload;
    },
    confirmBookingStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
      switch (action.payload) {
        case 1:
          state.stepName = 'select_departure_time';
          break;
        case 2:
          state.stepName = 'confirm_details';
          break;
        case 3:
          state.stepName = 'verify_id';
          break;
        case 4:
          state.stepName = 'payment';
          break;
        case 5:
          state.stepName = 'finalizing';
          break;
        default:
          state.stepName = 'select_departure_time';
          break;
      }
    },
    resetBookingState: (state) => {
      state.step = 1;
      state.stepName = 'select_departure_time';
      state.departureDate = null;
    }
  }
});

export const { setDepartureDate, confirmBookingStep, resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;

// Selectors
export const selectBookingStep = (state: RootState) => state.booking.step;
export const selectStepName = (state: RootState) => state.booking.stepName;
export const selectDepartureDate = (state: RootState) => state.booking.departureDate;
