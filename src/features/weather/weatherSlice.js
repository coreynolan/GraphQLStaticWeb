import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCity, fetchData } from './weatherAPI';
import getHourlyForecast from './getHourlyForecast';

if (!localStorage.getItem('tempScale')) {
	localStorage.setItem('tempScale', 'fahrenheit');
}

if (!localStorage.getItem('viewPref')) {
	localStorage.setItem('viewPref', 'current');
}

const nullCity = { name: '', printed: '', valid: false, favorite: false };
export const initialState = {
	loading: false,
	error: null,
	data: null,
	tempScale: localStorage.getItem('tempScale'),
	viewPref: localStorage.getItem('viewPref'),
	threeDayForecast: null,
	hourlyForecast: null,
	currentCity: nullCity,
	favoriteCities: [],
	weatherOrCityList: 'weather'
};

export const fetchWeatherByCity = createAsyncThunk('weather/fetchWeatherByCity', async (city, thunkAPI) => {
	// console.log(city);
	const response = await fetchData(city.name ? city.name : city, 3);
	if (response.error) {
		console.log(response.error);
		return thunkAPI.rejectWithValue(response.error);
	} else {
		return response;
	}
});

export const loadInitialCities = createAsyncThunk('weather/loadInitialData', async (city, thunkAPI) => {
	const response = await fetchCity(city);
	if (response.error) {
		console.log(response.error);
		return thunkAPI.rejectWithValue(response.error);
	} else {
		return response;
	}
});

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		changeView: (state) => {
			if (state.weatherOrCityList === 'weather') {
				state.weatherOrCityList = 'cityList';
			} else {
				state.weatherOrCityList = 'weather';
			}
		},
		setTempScale: (state, action) => {
			state.tempScale = action.payload;
		},
		setViewPref: (state, action) => {
			state.viewPref = action.payload;
		},
		toggleFavorite: (state) => {
			state.currentCity = { ...state.currentCity, favorite: !state.currentCity.favorite };
			let isCurrentCityInFavorites = state.favoriteCities.find((city) => city.name.toLowerCase() === state.currentCity.name.toLowerCase());
			if (state.currentCity.favorite) {
				if (isCurrentCityInFavorites) {
					console.log('Current City is already a favorite. THIS SHOULD BE AN ERROR.');
				} else {
					state.favoriteCities.push(state.currentCity);
					console.log('Added current city to favorites.');
				}
			} else {
				if (isCurrentCityInFavorites) {
					state.favoriteCities.pop(state.currentCity);
					console.log('Removed current city from favorites.');
				} else {
					state.favoriteCities.push(state.currentCity);
					console.log('Current City is not a favorite. THIS SHOULD BE AN ERROR.');
				}
			}
			const favCities = state.favoriteCities.map((city) => city.name);
			localStorage.setItem('favoriteCities', favCities);
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
				state.currentCity = {
					name: payload.location.name,
					printed: printed,
					valid: true,
					favorite: state.favoriteCities.some((city) => city.name.toLowerCase() === payload.location.name.toLowerCase())
				};
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
				localStorage.setItem('currentCity', state.currentCity.name);
			})
			.addCase(loadInitialCities.fulfilled, (state, { payload }) => {
				console.log(payload);
				const printed = payload.location.country.includes('United States')
					? payload.location.name + ', ' + payload.location.region + ' (USA)'
					: payload.location.name + ', ' + payload.location.country;
				var myObj = { name: payload.location.name, printed: printed, valid: true, favorite: true };
				console.log(myObj);

				state.favoriteCities.push(myObj);
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

export const { setTempScale, setViewPref, changeView, toggleFavorite } = weatherSlice.actions;
export const weatherSelector = (state) => state;

export default weatherSlice.reducer;

// addCity: (state, { payload }) => {
// 	// payload is the printed city
// 	console.log(payload);
// 	state.favoriteCities.forEach(e=> console.log(e))
// 	let obj = state.favoriteCities.find(o => o.name === payload);
// 	console.log(obj)
// 	if (obj !== undefined) {
// 		console.log('not null obj, so already on favorites list!' +obj)
// 	} else {
// 		console.log('adding to the facvorite list')
// 		console.log(state.currentCity)
// 		console.log(state.currentCity.name)
// 		let obj2 = {name: state.currentCity.name, printed: state.currentCity.printed}
// 		console.log(obj2)
// 		state.favoriteCities.push(obj2)
// 	}
// 	// state.favoriteCities.indexOf(payload) === -1 ? state.favoriteCities.push(payload) : console.log('This is already a favorite city!');
// },
// removeCity: (state, { payload }) => {
// 	console.log(payload);
// 	let obj = state.favoriteCities.find(o => o.name.toLowerCase() === payload.toLowerCase());
// 	console.log(obj)
// 	if (obj !== undefined) {
// 		console.log('not null obj, so removing from list!' +obj)
// 		state.favoriteCities.pop(obj);
// 	} else {
// 		console.log('object is not on favorite list')
// 		// state.favoriteCities.push({name: payload, printed: state.currentCity.printed})
// 	}
// 	// state.favoriteCities.indexOf(payload) === -1 ? console.log('This is not a favorite city!') : state.favoriteCities.pop(payload);
// },
