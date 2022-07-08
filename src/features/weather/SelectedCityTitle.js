import { Text } from 'theme-ui';

const SelectedCityTitle = (props) => {
	const { country, region, name } = { ...props.location };

	return (
		<Text className='cityNameAndRegionText' sx={{ fontSize: 24 }}>
			{name}, {country.includes('United States') ? region + ' (USA)' : country}
		</Text>
	);
};

export default SelectedCityTitle;
