import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, setCity } from '../city/citySlice';
import FavoriteCities from '../city/FavoriteCities';
import Search from './Search';
import WeatherDetails from './WeatherDetails';
import { fetchWeatherByCity } from './weatherSlice';


export function Weather() {

    const { data, loading, error } = useSelector((state) => state.weather)
    const dispatch = useDispatch()

    const searchHandler = async (values)  => {
        console.log("dispatch fetchweatherbycity")
        console.log("values")
        console.log(values)
        var worked = await dispatch(fetchWeatherByCity(values))
        console.log(worked.error)
        if (worked.error) {
            console.log("invalid city")
            dispatch(setCity(''))

        } else {
            dispatch(setCity(values.name))
        }
    }

	return (
		<div>
			<h3>Test Corey page</h3>
            <Search searchHandler={searchHandler} />
            {loading ? <p>LOADING!</p> :
            data ? <WeatherDetails {...data} /> :
            error ? <p>ERROR!!</p> : <p>nothing loaded yet</p>}
            <FavoriteCities />
		</div>
	);
}
