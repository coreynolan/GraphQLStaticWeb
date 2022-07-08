import { configureStore } from '@reduxjs/toolkit';
// import citySlice from '../features/city/citySlice';
import weatherSlice from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    // cities: citySlice
  },
});
