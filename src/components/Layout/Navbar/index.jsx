import React, { useContext } from 'react';
import './style.scss';
import Icon from '../../../assets/icons/icon.png';
import Button from '../../Common/Button';
import AuthContext from '../../../context/Auth/AuthContext';

const Navbar = () => {
	const { loginstate, logout } = useContext(AuthContext);
	const [isLoggedin, ] = loginstate;

	return (
		<div className="nav_bar">
			<img src={Icon} className="icon" alt='Order Management System' />
			<span className="app_name">Order Management System</span>
			{isLoggedin && 
				<Button 
					title="Logout" 
					classes="secondary"
					clickHandler={logout}
				/>
			}
		</div>
	)
};

export default Navbar;