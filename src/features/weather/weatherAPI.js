// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
	return new Promise((resolve) => setTimeout(() => resolve({ data: amount }), 500));
}

export const fetchData = async (cityName, days) => {
	// var {current, location, forecast, error} = {}
	try {
		// days = 3;
		// console.log('location:' + cityName);
		// console.log('days:' + days);
		const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=428022b89cf14528ac663011222903&q=${cityName}&days=${days}&aqi=no&alerts=no`);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (e) {
		console.log("catch error!")
		console.error(e);
		return e;
	}
};
