import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { setViewPref } from './weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

const ViewPrefToggle = (props) => {
	const viewPref = useSelector((state) => state.weather.viewPref);
	const dispatch = useDispatch();
	return (
		<ToggleButtonGroup
			className='viewSelectorGroup'
			color='primary'
			value={viewPref}
			onChange={(event) => {
				const newValue = event.target.value;
				localStorage.setItem('viewPref', newValue);
				dispatch(setViewPref(newValue));
			}}>
			<ToggleButton value='current' sx={{ borderRadius: '20px 0 0 20px' }}>
				Current
			</ToggleButton>
			<ToggleButton value='hourly' sx={{ borderRadius: '0 20px 20px 0' }}>
				Hourly
			</ToggleButton>
            <ToggleButton value='threeday' sx={{ borderRadius: '0 20px 20px 0' }}>
				Three Day
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default ViewPrefToggle;
