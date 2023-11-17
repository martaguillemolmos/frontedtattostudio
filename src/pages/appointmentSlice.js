import { createSlice } from '@reduxjs/toolkit';

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointment: {
      portfolio_id: null,
      date: null, 
    }
  },
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { setAppointment } = appointmentSlice.actions;
export const selectAppointment = (state) => state.appointment.appointment;
export default appointmentSlice.reducer;