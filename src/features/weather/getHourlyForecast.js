const getHourlyForecast = (hourlyArray) => {
	var now = new Date();
	now.setMinutes(0, 0, 0);
	var nextDayOfHours = [];
	var start = 0;
    var untouched = true;
	hourlyArray.forEach((hour) => {
		const oldTime = new Date(hour.time_epoch * 1000);

		if (oldTime >= now && untouched) {
            untouched=false;
			for (let i = 0; i < 24; i++) {
                // console.log(hourlyArray[i+start])
				nextDayOfHours.push(hourlyArray[i + start]);
			}
			return nextDayOfHours;
		} else {
			start++;
		}
	});
    return nextDayOfHours;
};

export default getHourlyForecast;
