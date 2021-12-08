import React, { useContext } from 'react';
import Navbar from '../../components/Layout/Navbar';
import AuthContext from '../../context/Auth/AuthContext';
import Home from '../Home';
import Login from '../Login';

const Layout = () => {
	const { 
		loginstate
	} = useContext(AuthContext);
	const [ isLoggedin, setIsLoggedin ] = loginstate
	return (
		<div>
			<Navbar />
			{ isLoggedin?
				<Home />
				:
				<Login />
			}
		</div>
	)
};

export default Layout;