import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Login from './components/User/Login';
import Notification from './components/UI/Notification';
import Loading from './components/UI/Loading';
import BottomNav from './components/NavBar/BottomNav';
import Room from './components/Rooms/Room';

const App = () => {
	return (
		<>
			<Loading />
			<Notification />
			<Login />
			<NavBar />
			<BottomNav />
			<Room />
		</>
	);
};

export default App;
