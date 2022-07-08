import React from 'react';
import { IconButton } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useDispatch } from 'react-redux';
import { changeView } from './weatherSlice';

const ListButton = () => {
	const dispatch = useDispatch();

	const handleClick = (event) => {
		event.preventDefault();
		dispatch(changeView());
	};

	return (
		<IconButton size='large' sx={{ color: '#4d5dfb', position:'absolute', right:'20px', top:'12px' }} onClick={handleClick}>
			<FormatListBulletedIcon fontSize='large' />
		</IconButton>
	);
};

export default ListButton;
