// import { createAction, createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit';

// import { ADD_CITY, GET_CITY, REMOVE_CITY } from './cityConstants';


// const nullCity = { name: '', printed: '', valid: false };

// export const initialState = {
// 	currentCity: nullCity,
// 	favoriteCities: [],
//     viewType: 'weather'
// };

// export const setCityToggleView = createAsyncThunk('city/setAndToggle', async (city, thunkAPI) => {

// })

// const citySlice = createSlice({
//     name: 'city',
//     initialState,
//     reducers: {
//         setCityAndToggleView: (state, {action}) => {
//         }
//     }
// })

// // if (!localStorage.getItem('cities')) {
// //     localStorage.setItem('cities', '[]');
// // } else {
// //     const citiesStr = localStorage.getItem('cities')
// //     const cities = JSON.parse(citiesStr);
// //     store.dispatch(getCitiesFromLocaleStorage(cities));
// // }


// // const initialState = { arrayOfCities: [] };

// // export const citySlice = createSlice({
// // 	name: 'city',
// // 	initialState,
// // 	reducers: {
// // 		addCity: (state, {payload}) => {
// //             console.log(payload)
// //             state.arrayOfCities.indexOf(payload) === -1 ? state.arrayOfCities.push(payload) : console.log("This is already a favorite city!");
// // 		},
// // 		removeCity: (state, {payload}) => {
// //             state.arrayOfCities.indexOf(payload) === -1 ? console.log("This is not a favorite city!") : state.arrayOfCities.pop(payload);
// // 		}
// // 	}
// // });

// // export const { addCity, getCity, removeCity, setCity } = citySlice.actions;
// // export default citySlice.reducer;

// // extraReducers: (builder) => {
// //     builder
// //     .addCase(addCity, (state, action) => {
// //         // "mutate" the array by calling push()
// //         state.push(action.payload)
// //       })
// //       .addCase(getCity, (state, action) => {
// //         const city = state[action.payload.index]
// //         // "mutate" the object by overwriting a field
// //         city.completed = !city.completed
// //       })
// //       .addCase(removeCity, (state, action) => {
// //         // Can still return an immutably-updated value if we want to
// //         return state.filter((city, i) => i !== action.payload.index)
// //       })
// // }
