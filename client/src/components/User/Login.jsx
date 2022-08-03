import { Close, Send } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	TextField,
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';
import GoogleAuthentication from './GoogleAuthentication';
import PasswordField from './PasswordField';

const Login = () => {
	const {
		state: { openLogin },
		dispatch,
	} = useValue();

	const [title, setTitle] = useState('login');
	const [isRegister, setIsRegistered] = useState(false);
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confPasswordRef = useRef();

	const handleClose = () => {
		dispatch({ type: 'CLOSE_LOGIN' });
	};

	const submitHandler = (e) => {
		e.preventDefault();

		// ! TESTING LOADING
		dispatch({ type: 'START_LOADING' });

		setTimeout(() => {
			dispatch({ type: 'END_LOADING' });
		}, 3000);

		// ! TESTING NOTIFICATION
		const password = passwordRef.current.value;
		const confPassword = confPasswordRef.current.value;

		if (password !== confPassword) {
			dispatch({
				type: 'UPDATE_ALERT',
				payload: {
					open: true,
					severity: 'error',
					message: 'Passwords do not match',
				},
			});
		}
	};

	useEffect(() => {
		isRegister ? setTitle('Register') : setTitle('Login');
	}, [isRegister]);

	return (
		<>
			<Dialog open={openLogin} onClose={handleClose}>
				<DialogTitle>
					{title}
					<IconButton
						sx={{
							position: 'absolute',
							top: '8',
							right: '8',
							color: (theme) => theme.palette.grey[500],
						}}
						onClick={handleClose}
					>
						<Close />
					</IconButton>
				</DialogTitle>
				<form onSubmit={submitHandler}>
					<DialogContent dividers>
						<DialogContentText>
							Please fill your information in the fields
							below !
						</DialogContentText>
						{isRegister && (
							<TextField
								autoFocus
								margin="normal"
								variant="standard"
								id="name"
								label="Name"
								type="text"
								fullWidth
								inputRef={nameRef}
								inputProps={{ minLength: 2 }}
								required
							/>
						)}
						<TextField
							autoFocus={!isRegister}
							margin="normal"
							variant="standard"
							id="email"
							label="Email"
							type="email"
							fullWidth
							inputRef={emailRef}
							required
						/>
						<PasswordField {...{ passwordRef }} />
						{isRegister && (
							<PasswordField
								passwordRef={confPasswordRef}
								id="confirm password"
								label="Confirm Password"
							/>
						)}
					</DialogContent>
					<DialogActions sx={{ px: '18px' }}>
						<Button
							sx={{ margin: '15px' }}
							type="submit"
							variant="contained"
							endIcon={<Send />}
						>
							Submit
						</Button>
					</DialogActions>
				</form>
				<DialogActions
					sx={{ justifyContent: 'center', p: '5px 24px' }}
				>
					{isRegister
						? 'Already have an account ? Sign in now'
						: `Don't have an account ? Create now `}
					<Button
						onClick={() => {
							setIsRegistered(!isRegister);
						}}
					>
						{isRegister ? 'Login' : 'Register'}
					</Button>
				</DialogActions>
				<DialogActions
					sx={{ justifyContent: 'center', py: '16px' }}
				>
					<GoogleAuthentication />
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Login;
