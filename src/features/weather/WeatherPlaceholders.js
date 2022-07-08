import { useSelector } from 'react-redux';

const WeatherPlaceholders = () => {
	const { loading, error } = useSelector((state) => state.weather);
	return loading ? <h3>Loading...</h3> : error ? <h3>Invalid City</h3> : <h3>No City Selected</h3>;
};

export default WeatherPlaceholders;
