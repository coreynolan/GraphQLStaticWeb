import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './weatherAPI';
// import { addCity } from '../city/citySlice';
import getHourlyForecast from './getHourlyForecast';

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

if (!localStorage.getItem('viewPref')) {
	localStorage.setItem('viewPref', 'current');
}

const nullCity = { name: '', printed: '', valid: false };
export const initialState = {
	loading: false,
	error: null,
	data: null,
	tempScale: localStorage.getItem('tempScale'),
	viewPref: localStorage.getItem('viewPref'),
	threeDayForecast: null,
	hourlyForecast: null,
	currentCity: nullCity,
	favoriteCities: []
};

export const fetchWeatherByCity = createAsyncThunk('weather/fetchWeatherByCity', async (city, thunkAPI) => {
	// console.log(city);
	// console.log(thunkAPI)
	const response = await fetchData(city.name, 3);
	if (response.error) {
		console.log(response.error);
		return thunkAPI.rejectWithValue(response.error);
	} else {
		// console.log(response);
		return response;
	}
});

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		invalidateCity: (state, action) => {
			state.currentCity = nullCity;
		},
		setTempScale: (state, action) => {
			state.tempScale = action.payload;
		},
		setViewPref: (state, action) => {
			state.viewPref = action.payload;
		},
		setHourly: (state, action) => {
			// state.hourlyForecast =
		},
		addCity: (state, { payload }) => {
			console.log(payload);
			state.favoriteCities.indexOf(payload) === -1 ? state.favoriteCities.push(payload) : console.log('This is already a favorite city!');
		},
		removeCity: (state, { payload }) => {
			state.favoriteCities.indexOf(payload) === -1 ? console.log('This is not a favorite city!') : state.favoriteCities.pop(payload);
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
			.addCase(fetchWeatherByCity.fulfilled, (state, { payload }) => {
				console.log('fulfilled');
				state.loading = false;
				state.data = payload;
				// console.log(payload);
				const printed = payload.location.country.includes('United States')
					? payload.location.name + ', ' + payload.location.region + ' (USA)'
					: payload.location.name + ', ' + payload.location.country;
				state.currentCity = { name: payload.location.name, printed: printed, valid: true };
				state.error = null;
				state.threeDayForecast = payload.forecast.forecastday.map((day) => {
					return {
						date: day.date,
						maxtemp_f: day.day.maxtemp_f,
						maxtemp_c: day.day.maxtemp_c,
						mintemp_f: day.day.mintemp_f,
						mintemp_c: day.day.mintemp_c,
						temp_c: day.day.avgtemp_c,
						temp_f: day.day.avgtemp_f,
						isDay: '1',
						code: day.day.condition.code,
						condition: day.day.condition.text.toLowerCase(),
						icon: day.day.condition.icon
					};
				});
				const hourlyByDay = payload.forecast.forecastday.map((day) => day.hour);
				state.hourlyForecast = getHourlyForecast([].concat.apply([], hourlyByDay));
			})
			.addCase(fetchWeatherByCity.rejected, (state, action) => {
				console.log('rejected');
				console.log(action);
				state.data = null;
				state.loading = false;
				state.error = action;
				state.currentCity = nullCity;
			});
	}
});

export const { setTempScale, setViewPref, addCity, removeCity, invalidateCity } = weatherSlice.actions;
export const weatherSelector = (state) => state;

export default weatherSlice.reducer;
