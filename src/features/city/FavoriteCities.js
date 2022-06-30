import { useSelector } from 'react-redux';

const FavoriteCities = (props) => {
	const favoriteCities = useSelector((state) => state.weather.favoriteCities);
	return (
		<div>
			<h3>Favorite Cities</h3>
			Favorite cities: {favoriteCities.length > 0 && favoriteCities.map((city) => <div>{city}</div>)}
		</div>
	);
};

export default FavoriteCities;
