import { Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import FavoriteButton from '../city/FavoriteButton';
import useDebounce from '../helpers/useDebounce';
import ListButton from './ListButton';
import { toggleFavorite } from './weatherSlice';

const Search = ({ searchHandler }) => {
	// Leaving for now - but look at API to see if we could pass units in!
	const [values, setValues] = useState({ name: '', units: ['fahrenheit', 'celsius'] });

	const debounceSearchCityName = useDebounce(values.name, 500);

	// Ended up not using value.units so ignore that it's not in the dependency array
	useEffect(() => {
		// console.log("debouncing")
		if (debounceSearchCityName) {
			searchHandler({ name: debounceSearchCityName, config: { units: values.units } });
		}
	}, [debounceSearchCityName]);

	const currentCity = useSelector(
		({ weather }) => ({
			valid: weather.currentCity.valid,
			name: weather.currentCity.name,
			printed: weather.currentCity.printed,
			favorite: weather.currentCity.favorite
		}),
		shallowEqual
	);


	const handleSubmit = (event) => {
		event.preventDefault();
		searchHandler({ name: values.name, config: { units: values.units } });
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	// TODO: implement local storage

	const dispatch = useDispatch();

	const toggleCurrentCityFavoriteStatus = (event) => {
		console.log(currentCity)
		if (currentCity.valid) {
			dispatch(toggleFavorite())
		} else {
			console.log('Current city is not valid.');
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<div className='newFlexBox'>
				<Input color='primary' fullWidth type='text' name='name' value={values.name} onChange={handleChange} placeholder='Enter a city...' autoFocus />
				<FavoriteButton onClick={() => toggleCurrentCityFavoriteStatus()} disabled={!currentCity.valid} checked={!!currentCity.favorite} />
				{/* <TemperatureToggle props={() => searchHandler()} /> */}
				<ListButton />
			</div>
		</form>
	);
};

export default Search;
