import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

const GoogleAuthentication = () => {
	return (
		<Button variant="outlined" startIcon={<Google />}>
			Login With Google
		</Button>
	);
};

export default GoogleAuthentication;
