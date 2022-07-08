import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteCities from '../city/FavoriteCities';
import Search from './Search';
import ViewPrefToggle from './ViewPrefToggle';
import WeatherDetails from './WeatherDetails';
import WeatherPlaceholders from './WeatherPlaceholders';
import SelectedCityTitle from './SelectedCityTitle';
import { fetchWeatherByCity } from './weatherSlice';
import { Text } from 'theme-ui';
import ListButton from './ListButton';
import TemperatureToggle from './TemperatureToggle';

export function Weather() {
	const { data } = useSelector((state) => state.weather);
	const dispatch = useDispatch();

	const searchHandler = async (values) => {
		console.log(values);
		dispatch(fetchWeatherByCity(values));
	};

	useEffect(() => {
		const currentCity = localStorage.getItem('currentCity');
		dispatch(fetchWeatherByCity(currentCity));
		console.log(currentCity);
	}, [dispatch]);

	const detailedWeatherCard = () => {
		return (
			<div className='weatherBase'>
				<Search searchHandler={searchHandler} />
				{data ? (
					<div className='weatherDetails'>
						<Text>The weather in</Text>
						<SelectedCityTitle {...data} />
						<WeatherDetails />
					</div>
				) : (
					<div className='weatherDataStatus'>
						<WeatherPlaceholders />
					</div>
				)}
				<ViewPrefToggle />
			</div>
		);
	};

	const favoriteCitiesList = () => {
		return (
			<div className='weatherBase'>
				<FavoriteCities searchHandler={searchHandler} />
				<ListButton />
				<TemperatureToggle props={() => searchHandler()} />
			</div>
		);
	};

	const viewType = useSelector((state) => state.weather.weatherOrCityList);

	return viewType === 'cityList' ? favoriteCitiesList() : detailedWeatherCard();
}
