import React from 'react';
import logo from './logo.svg';
import { Weather } from './features/weather/Weather';
import './App.css';
import { Container } from '@mui/material';

function App() {
	return (
		<Container maxWidth='sm' className='appBase'>
			<Weather />
		</Container>
	);
}

export default App;
