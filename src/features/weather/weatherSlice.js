import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { fetchCount, fetchData } from './weatherAPI';
import {addCity} from '../city/citySlice';

// Add city
// Remove city
// Get from local storage
// Update temp
// Fetch temp
// Add to favorites
// Remove from favorites

if (!localStorage.getItem('tempScale')) {
	localStorage.setItem('tempScale', 'fahrenheit');
}

export const initialState = {
	loading: false,
	error: null,
	data: null,
	tempScale: localStorage.getItem('tempScale')
};

export const fetchWeatherByCity = createAsyncThunk('weather/fetchWeatherByCity', async (cityName, thunkAPI) => {
	console.log(cityName);
	// console.log(thunkAPI)
	const response = await fetchData(cityName.name, 3);
	if (response.error) {
		console.log(response.error);
		return thunkAPI.rejectWithValue(response.error);
	} else {
		console.log(response);
		return response;
	}
});

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		setTempScale: (state, action) => {
			state.tempScale = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeatherByCity.pending, (state) => {
				console.log('pending');
				state.loading = true;
				state.error = null;
				state.data = null;
			})
			.addCase(fetchWeatherByCity.fulfilled, (state, action) => {
				console.log('fulfilled');
				state.loading = false;
				state.data = action.payload;
				state.error = null;
				// useDispatch(cityReducer(action.payload.location.name));
			})
			.addCase(fetchWeatherByCity.rejected, (state, action) => {
				console.log('rejected');
				console.log(action)
				state.data = null;
				state.loading = false;
				state.error = action;
			});
	}
});

export const { setTempScale } = weatherSlice.actions;
export const weatherSelector = (state) => state;

export default weatherSlice.reducer;
