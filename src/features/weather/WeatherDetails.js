import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Text } from 'theme-ui';

const WeatherDetails = (props) => {
	const { country, region, name } = { ...props.location };

	const scale = useSelector((state) => state.weather.tempScale);
	const isFahr = scale === 'fahrenheit';

	const viewPref = useSelector((state) => state.weather.viewPref);

	const hourlyForecast = useSelector((state) => state.weather.hourlyForecast);
	// this is forecastday
	const threeDayForecast = useSelector((state) => state.weather.threeDayForecast);

	const current = { ...useSelector((state) => state.weather.data.current) };

	const {
		feelslike_c,
		feelslike_f,
		cloud,
		condition,
		gust_kph,
		gust_mph,
		humidity,
		is_day,
		last_updated,
		last_updated_epoch,
		precip_in,
		precip_mm,
		pressure_in,
		pressure_mb,
		temp_c,
		temp_f,
		uv,
		vis_km,
		vis_miles,
		wind_degree,
		wind_dir,
		wind_kph,
		wind_mph
	} = { ...current };

	const { forecastday } = { ...useSelector((state) => state.weather.data.forecast) };

	const {
		maxtemp_c,
		maxtemp_f,
		mintemp_c,
		mintemp_f,
		avgtemp_c,
		avgtemp_f,
		maxwind_mph,
		maxwind_kph,
		totalprecip_mm,
		totalprecip_in,
		avgvis_km,
		avgvis_miles,
		avghumidity,
		daily_will_it_rain,
		daily_chance_of_rain,
		daily_will_it_snow,
		daily_chance_of_snow
	} = { ...forecastday[0].day };

	const attachedIcon = (currentIcon) => {
		const htmlstr = 'https:' + currentIcon;
		return <img width={80} height={80} src={htmlstr} alt='weather_icon' />;
	};

	function higherPrecipChance() {
		return Math.max(daily_chance_of_rain, daily_chance_of_snow);
	}

	const currentDisplay = () => {
		return (
			<Grid container justifyContent={'center'} className='mt-4 mb-4'>
				<Grid item sm={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
					{attachedIcon(condition.icon)}
					<Text sx={{ fontSize: 16 }}>{props.current.condition.text}</Text>
				</Grid>
				<Grid item sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
					<div className='weathertemp'>
						<Text sx={{ fontSize: 32 }}>{isFahr ? temp_f : temp_c}</Text> <Text sx={{ fontSize: 16 }}>{'\u00b0'}{isFahr ? 'F' : 'C'}</Text>
					</div>
					<Flex sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						<Text sx={{ fontSize: 16, marginRight: '5px' }}>{isFahr ? maxtemp_f : maxtemp_c}{'\u00b0'}</Text>
						<Text sx={{ fontSize: 16, marginLeft: '5px', opacity: 0.5 }}>{isFahr ? mintemp_f : mintemp_c}{'\u00b0'}</Text>
					</Flex>
				</Grid>
				<Grid item sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
					<Text sx={{ fontSize: 14 }}>Precipitation: {higherPrecipChance()}%</Text>
					<Text sx={{ fontSize: 14 }}>Humidity: {humidity}%</Text>
					<Text sx={{ fontSize: 14 }}>
						Wind: {isFahr ? wind_mph + ' mph' : wind_kph + ' kph'} {wind_dir}
					</Text>
					<Text sx={{ fontSize: 14 }}>UV: {uv}</Text>
				</Grid>
			</Grid>
		);
	};

	const hourlyDisplay = () => {
		return (
			<div className='hourlyWeatherScroll'>
				{hourlyForecast.map((day, index) => (
					<div className={'hourlyWeatherCard' + (new Date(day.time).getHours() === 23 ? ' right' : '')} key={index+'hourly'}>
						{attachedIcon(day.condition.icon)}
						<div className='weatherConditionWrapper'>
							<p className='weatherCondition'>{day.condition.text}</p>
						</div>
						<Flex sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
							<Text sx={{ fontSize: 20 }}>
								{isFahr ? day.temp_f : day.temp_c}
								{'\u00b0'}
							</Text>
						</Flex>
						<Text sx={{ fontSize: 12 }}> {new Date(day.time).getHours()}:00</Text>
					</div>
				))}
			</div>
		);
	};

	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	const threeDayDisplay = () => {
		return (
			<Grid container direction='row' justifyContent='center' alignItems='center' style={{marginBottom: '10px'}}>
				{threeDayForecast.map((day, index) => (
					<Grid item sm={4} key={index+'threeDay'}>
						<Stack spacing={1} alignItems='center'>
							{attachedIcon(day.icon)}
							<Text autoCapitalize='on' sx={{ fontSize: 16, textTransform: 'capitalize' }}>
								{day.condition}
							</Text>
							<Flex sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
								<Text sx={{ fontSize: 16, marginRight: '5px' }}>{isFahr ? day.maxtemp_f : day.maxtemp_c}{'\u00b0'}</Text>
								<Text sx={{ fontSize: 16, marginLeft: '5px', opacity: 0.5 }}>{isFahr ? day.mintemp_f : day.mintemp_c}{'\u00b0'}</Text>
							</Flex>
							<Text sx={{ fontSize: 16 }}>
								{monthNames[new Date(day.date).getUTCMonth()]} {new Date(day.date).getUTCDate()}
							</Text>
						</Stack>
					</Grid>
				))}
			</Grid>
		);
	};

	// favorite button, click it and it save the region, state, country, but uses the lat and long to re search.
	const returnType = () => {
		switch (viewPref) {
			case 'hourly':
				// add the city!
				return hourlyDisplay();
			case 'threeday':
				return threeDayDisplay();
			case 'current':
				// add the time!
				return currentDisplay();
			default:
				return null;
		}
	};
	return <div className='weatherDetailsData'>{returnType()}</div>;
};

export default WeatherDetails;
