import { useDispatch, useSelector } from 'react-redux';
import { changeView, fetchWeatherByCity } from '../weather/weatherSlice';

const FavoriteCities = ({ searchHandler }) => {
	const favoriteCities = useSelector((state) => state.weather.favoriteCities);

	const dispatch = useDispatch();

	const handleClick = async (city) => {
		dispatch(changeView())
		dispatch(fetchWeatherByCity(city));
	}

	return (
		<div className='cityList'>
			<h1>List of Favorite Cities</h1>
			<h3>(Click on a name to view the current weather details)</h3>
			{favoriteCities.length > 0 && favoriteCities.map((city, index) => <div key={index + 'city'} onClick={() => handleClick(city.name)}>{city.printed}</div>)}
		</div>
	);
};

export default FavoriteCities;
