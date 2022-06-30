import { Box, Grid, Input, TextField } from '@mui/material';
import { current } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// import { addCity, removeCity } from '../city/citySlice';
import FavoriteButton from '../city/FavoriteButton';
import useDebounce from '../helpers/useDebounce';
import TemperatureToggle from './TemperatureToggle';
import { addCity, removeCity } from './weatherSlice';

const Search = ({ searchHandler }) => {
	// Leaving for now - but look at API to see if we could pass units in!
	const [values, setValues] = useState({ name: '', units: ['fahrenheit', 'celsius'] });

	const debounceSearchCityName = useDebounce(values.name, 500);

	useEffect(() => {
		console.log("debouncing")
		// console.log(values)
		// console.log(currentCity)
		if (debounceSearchCityName) {
			// console.log('settings');
			// console.log(currentCity);
			searchHandler({ name: debounceSearchCityName, config: { units: values.units } });
			// setIsDisabled(!currentCity.valid);
			// setFavorite(favoriteCities.includes(currentCity.printed));
		}
	}, [debounceSearchCityName]);

	// const arrayOfCities = useSelector((state) => state.cities.arrayOfCities);
	const favoriteCities = useSelector((state) => state.weather.favoriteCities);

	const currentCity = useSelector(
		({ weather }) => ({
			valid: weather.currentCity.valid,
			name: weather.currentCity.name,
			printed: weather.currentCity.printed,
			favorite: favoriteCities.includes(weather.currentCity.printed)
		}),
		shallowEqual
	);

	const handleSubmit = (event) => {
		// console.log('handle submit before search handler');
		event.preventDefault();
		searchHandler({ name: values.name, config: { units: values.units } });
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	// TODO: implement local storage

	const dispatch = useDispatch();

	const toggleFavorite = (event) => {
		if (currentCity.valid) {
			if (!favoriteCities.includes(currentCity.printed)) {
				console.log('Attempting to add city to favorites...');
				dispatch(addCity(currentCity.printed));
			} else {
				console.log('Attempting to remove city from favorites...');
				dispatch(removeCity(currentCity.printed));
			}
			// setFavorite(!isFavorite);
		} else {
			console.log('Current city is not valid.');
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<div className='newFlexBox'>
				<Input color='primary' fullWidth type='text' name='name' value={values.name} onChange={handleChange} placeholder='Enter a city...' />
				<FavoriteButton onClick={() => toggleFavorite()} disabled={!currentCity.valid} checked={!!favoriteCities.includes(currentCity.printed)} />
				<TemperatureToggle props={() => searchHandler()} />
			</div>
		</form>
	);
};

export default Search;
