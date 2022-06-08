import { configureStore } from '@reduxjs/toolkit';
import citySlice from '../features/city/citySlice';
import counterReducer from '../features/counter/counterSlice';
import weatherSlice from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    weather: weatherSlice,
    cities: citySlice
  },
});
