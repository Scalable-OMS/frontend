import React, { useEffect, useState } from 'react';
import AuthContext from '../AuthContext';
import { loginAPI, logoutAPI } from '../../../api';

const AuthProvider = ({ children }) => {
	const [isLoggedin, setIsLoggedin] = useState(true);
	const [role, setRole] = useState();
	const [driverCity, setDriverCity] = useState();

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('userToken'));
		const user_role = localStorage.getItem('role');
		if (token) {
			setIsLoggedin(true);
			setRole(user_role);
		} else {
			setIsLoggedin(false);
		}
	}, []);

	const login = async (creds) => {
		const res = await loginAPI(creds);
		if (res.status === 200) {
			localStorage.setItem("userToken", JSON.stringify(res.data.token))
			localStorage.setItem("role", res.role)
			setRole(res.role)
			setIsLoggedin(true);
		} else {
			setIsLoggedin(false);
		}
	}

	const logout = async () => {
		const res = await logoutAPI();
		if (res.status === 200) {
			localStorage.removeItem("userToken");
			setIsLoggedin(false);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				loginstate: [isLoggedin, setIsLoggedin],
				login,
				logout,
				role,
				driverState: [driverCity, setDriverCity]
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;