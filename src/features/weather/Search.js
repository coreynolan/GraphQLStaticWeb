import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex, Box, Input, Select } from 'theme-ui';
import { addCity, removeCity } from '../city/citySlice';
import FavoriteButton from '../city/FavoriteButton';
import TemperatureToggle from './TemperatureToggle';

const Search = ({ searchHandler }) => {
	// Leaving for now - but look at API to see if we could pass units in!
	const [values, setValues] = useState({ name: '', units: ['fahrenheit', 'celsius'] });

	const handleSubmit = (event) => {
		console.log('handle submit before search handler');
		event.preventDefault();
		console.log(values);
		// console.log(event)
		searchHandler({ name: values.name, config: { units: values.units } });
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const cities = useSelector((state) => state.cities.arrayOfCities);
	const currentCity = useSelector((state) => state.cities.currentCity);
	const [isFavorite, setFavorite] = useState(cities.includes(currentCity.name));
	const [isDisabled, setDisabled] = useState(false);

	console.log("fav??: " + isFavorite)

	const dispatch = useDispatch();

	const toggleFavorite = (event) => {
		console.log(currentCity)
		if (currentCity.valid) {
			if (!isFavorite) {
				console.log("adding city")
				dispatch(addCity(currentCity.name))
			} else {
				console.log("removing city")
				dispatch(removeCity(currentCity.name))
			}
			setFavorite(!isFavorite);
		} else {
			console.log("current city isnt valid yo")
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Flex>
				<Box marginRight={2} sx={{ flex: '4 1 auto' }}>
					<Input paddingLeft={3} type='text' name='name' value={values.name} onChange={handleChange} placeholder='London etc...' />
				</Box>
				<TemperatureToggle props={() => searchHandler()} />
				<FavoriteButton onClick={() => toggleFavorite()} disabled={isDisabled} checked={!!isFavorite} />
			</Flex>
		</form>
	);
};

export default Search;
