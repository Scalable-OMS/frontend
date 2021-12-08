import React, { useEffect, useState } from 'react';
import AuthContext from '../AuthContext';
import { loginAPI, logoutAPI } from '../../../api';

const AuthProvider = ({ children }) => {
	const [isLoggedin, setIsLoggedin] = useState(true);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('userToken'));
		if (token) {
			setIsLoggedin(true);
		} else {
			setIsLoggedin(false);
		}
	}, []);

	const login = async (creds) => {
		const res = await loginAPI(creds);
		if (res.status === 200) {
			localStorage.setItem("userToken", JSON.stringify(res.data))
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
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;