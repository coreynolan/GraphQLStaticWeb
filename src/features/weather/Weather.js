import { Card, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addCity, setCity } from '../city/citySlice';
import FavoriteCities from '../city/FavoriteCities';
import Search from './Search';
import ViewPrefToggle from './ViewPrefToggle';
import WeatherDetails from './WeatherDetails';
import WeatherPlaceholders from './WeatherPlaceholders';
import SelectedCityTitle from './SelectedCityTitle';
import { fetchWeatherByCity, invalidateCity } from './weatherSlice';
import { Text } from 'theme-ui';


export function Weather() {
	const { data, loading, error } = useSelector((state) => state.weather);
	const dispatch = useDispatch();

	const searchHandler = async (values) => {
		dispatch(fetchWeatherByCity(values));
		// var worked = await dispatch(fetchWeatherByCity(values));
		// console.log(worked)
		// if (worked.error) {
		// 	console.log('Invalid city, try respelling.');
		// }
	};

	// const { country, region, name } = { ...props.location };
	return (
		<div className='weatherBase'>
			<Search searchHandler={searchHandler} />
			{data ? (
				<div className='weatherDetails'>
					<Text>The weather in</Text>
					<SelectedCityTitle {...data} />
					<WeatherDetails {...data} />
				</div>
			) : (
				<div className='weatherDataStatus'>
					<WeatherPlaceholders />
				</div>
			)}
			<ViewPrefToggle />
			{/* <FavoriteCities /> */}
		</div>
	);
}
