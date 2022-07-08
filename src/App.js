import React, { useState } from 'react';
import logo from './logo.svg';
import { Weather } from './features/weather/Weather';
import './App.css';
import { Container } from '@mui/material';
import FavoriteCities from './features/city/FavoriteCities';
import { useDispatch } from 'react-redux';
import { loadInitialCities } from './features/weather/weatherSlice';

function App() {
	const dispatch = useDispatch();
	const favCities = localStorage.getItem('favoriteCities');
	const myArray = favCities.split(',');

	myArray.map((piece) => dispatch(loadInitialCities(piece)));

	return (
		<Container maxWidth='sm' className='appBase'>
			<Weather />
		</Container>
	);
}

export default App;
