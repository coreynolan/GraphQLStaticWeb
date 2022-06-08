import { useSelector } from 'react-redux';

const FavoriteCities = (props) => {
	const { currentCity, arrayOfCities } = useSelector((state) => state.cities);

    const {name, valid } = {...currentCity}

	return (
		<div>
			<h3>Favorite Cities</h3>
			Current: {name} <br/>
			Favorite cities: {arrayOfCities.length > 0 && arrayOfCities.map((city) => <div>{city}</div>)}
		</div>
	);
};

export default FavoriteCities;
