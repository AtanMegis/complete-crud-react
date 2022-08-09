import { AddLocationAlt, Bed, LocationOn } from '@mui/icons-material';
import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Paper,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AddRoom from '../AddRoom/AddRoom';
import ClusterMap from '../Map/ClusterMap';
import Protected from '../Protected/Protected';
import Rooms from '../Rooms/Rooms';

const BottomNav = () => {
	const [value, setValue] = useState(0);
	const ref = useRef();

	useEffect(() => {
		ref.current.ownerDocument.body.scrollTop = 0;
	}, [value]);

	return (
		// !SWITCH CASE IN JSX L:18-24
		<Box ref={ref}>
			{
				{
					0: <ClusterMap />,
					1: <Rooms />,
					2: (
						<Protected>
							<AddRoom setPage={setValue} />
						</Protected>
					),
				}[value]
			}
			<Paper
				elevation={3}
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 2,
				}}
			>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(e, newValue) => setValue(newValue)}
				>
					<BottomNavigationAction
						label="map"
						icon={<LocationOn />}
					/>
					<BottomNavigationAction label="Rooms" icon={<Bed />} />
					<BottomNavigationAction
						label="Add"
						icon={<AddLocationAlt />}
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	);
};

export default BottomNav;
