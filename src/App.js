import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Login from './components/User/Login';
import Notification from './components/UI/Notification';
import Loading from './components/UI/Loading';

const App = () => {
	return (
		<>
			<Loading />
			<Notification />
			<Login />
			<NavBar />
		</>
	);
};

export default App;
