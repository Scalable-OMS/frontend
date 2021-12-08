import React, { useContext } from 'react';
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
			{ isLoggedin?
				<Home />
				:
				<Login />
			}
		</div>
	)
};

export default Layout;