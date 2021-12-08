import React, { useEffect, useState } from 'react';
import AuthContext from '../AuthContext';
import { loginAPI } from '../../../api';

const AuthProvider = ({ children }) => {
	const [isLoggedin, setIsLoggedin] = useState(true);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('userToken'));
		if (token) {
			setIsLoggedin(true);
		} else {
			// setIsLoggedin(false);
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

	return (
		<AuthContext.Provider
			value={{
				loginstate: [isLoggedin, setIsLoggedin],
				login
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;