import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

import { ADD_CITY, GET_CITY, REMOVE_CITY } from './cityConstants';

// if (!localStorage.getItem('cities')) {
//     localStorage.setItem('cities', '[]');
// } else {
//     const citiesStr = localStorage.getItem('cities')
//     const cities = JSON.parse(citiesStr);
//     store.dispatch(getCitiesFromLocaleStorage(cities));
// }


const initialState = { currentCity: {
    name: '',
    valid: false
}, arrayOfCities: [] };



export const citySlice = createSlice({
	name: 'city',
	initialState,
	reducers: {
		addCity: (state, action) => {
			console.log(action.payload);
            state.arrayOfCities.indexOf(action.payload) === -1 ? state.arrayOfCities.push(action.payload) : console.log("This is already a favorite city!");
		},
		removeCity: (state, action) => {
			console.log(action.payload);
            state.arrayOfCities.indexOf(action.payload) === -1 ? console.log("This is not a favorite city!") : state.arrayOfCities.pop(action.payload);
		},
		getCity: (state, action) => {
			console.log(state);
			console.log(action);
		},
        setCity: (state, {payload}) => {
            state.currentCity.name = payload

            if (payload === '') {
                state.currentCity.valid=true
            } else {
                state.currentCity.valid=true
            }
        }
	}
});

export const { addCity, getCity, removeCity, setCity } = citySlice.actions;
export default citySlice.reducer;

// extraReducers: (builder) => {
//     builder
//     .addCase(addCity, (state, action) => {
//         // "mutate" the array by calling push()
//         state.push(action.payload)
//       })
//       .addCase(getCity, (state, action) => {
//         const city = state[action.payload.index]
//         // "mutate" the object by overwriting a field
//         city.completed = !city.completed
//       })
//       .addCase(removeCity, (state, action) => {
//         // Can still return an immutably-updated value if we want to
//         return state.filter((city, i) => i !== action.payload.index)
//       })
// }
