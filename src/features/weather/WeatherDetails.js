import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Box, Heading, Text } from 'theme-ui';
import { WiDirectionDown, WiDirectionUp, WiCelsius, WiFahrenheit, WiDaySunny, WiDaySunnyOvercast, WiRain, WiSnow, WiCloudy } from 'weather-icons-react';

const WeatherDetails = (props) => {
	// var name = props.name;
	const { country, name } = { ...props.location };

	// console.log(country);
	// console.log(name);
	// console.log(region);

	const scale = useSelector(state => state.weather.tempScale)
	const isFahr = scale === 'fahrenheit'

	const current = { ...props.current };
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

	const { forecastday } = { ...props.forecast };

	const attachedIcon = () => {
		const condition = props.current.condition;
		const { icon } = { ...condition };
		const htmlstr = 'https:' + icon;
		return <img src={htmlstr} alt='weather_icon' />;
	};

	return (
		<Box py={5}>
			<Heading marginBottom={2} sx={{ fontSize: 34, textTransform: 'uppercase' }}>
				<Flex sx={{ alignItems: 'center' }}>
					{name},<Text sx={{ fontWeight: 'normal', fontSize: 24, paddingLeft: 1 }}> {country}</Text>
				</Flex>
			</Heading>
			<Flex sx={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
				<Box sx={{ marginLeft: -3 }}>{attachedIcon()} {props.current.condition.text}</Box>

				<Flex>
					<Flex sx={{ flexDirection: 'column' }}>
						<Heading sx={{ fontSize: 58, paddingLeft: 2 }}>
							<span style={{ marginRight: '-15px' }}>{isFahr ? temp_f : temp_c}</span>
							{/* <span style={{ marginRight: '-15px' }}>{props.weather.temperature.actual}</span> */}
							<WiCelsius size={64} />
						</Heading>
						<Flex sx={{ flexDirection: 'column', alignItems: 'center', marginRight: 4 }}>
							<Flex sx={{ alignItems: 'center' }}>
								<WiDirectionUp size={48} />
								<Text sx={{ fontSize: 20 }}>{isFahr ? temp_f : temp_c}</Text>
								{/* <Text sx={{ fontSize: 20 }}>{props.weather.temperature.min}</Text> */}
								<WiDirectionDown size={48} />
								<Text sx={{ fontSize: 20 }}>{feelslike_c}</Text>
								{/* <Text sx={{ fontSize: 20 }}>{props.weather.temperature.max}</Text> */}
							</Flex>
						</Flex>
					</Flex>
					{/* <Box sx={{ borderLeft: '8px solid', paddingLeft: 4, paddingY: 2 }}>
						<Flex sx={{ flexDirection: 'column' }}>
							<Text py={2}>
								Humidity: <span style={{ fontWeight: 'bold' }}>{props.weather.clouds.humidity}</span>
							</Text>
							<Text py={2}>
								Clouds: <span style={{ fontWeight: 'bold' }}>{props.weather.clouds.visibility}</span>
							</Text>
							<Text py={2}>
								Wind: <span style={{ fontWeight: 'bold' }}>{props.weather.wind.speed}</span>
							</Text>
						</Flex>
					</Box> */}
				</Flex>
			</Flex>
		</Box>
	);
};

export default WeatherDetails;
