import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { setTempScale } from './weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

const TemperatureToggle = (props) => {

	const scale = useSelector(state => state.weather.tempScale);
	const dispatch = useDispatch();
	return (
		<ToggleButtonGroup
			color='primary'
			value={scale}
			onChange={(event) => {
				const newValue = event.target.value;
				localStorage.setItem('tempScale', newValue);
				dispatch(setTempScale(newValue));
			}}>
			<ToggleButton value='fahrenheit' sx={{ borderRadius: '20px 0 0 20px' }}>
				Fahrenheit
			</ToggleButton>
			<ToggleButton value='celsius' sx={{ borderRadius: '0 20px 20px 0' }}>
				Celsius
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default TemperatureToggle;
