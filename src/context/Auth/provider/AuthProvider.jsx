import React, { useEffect, useState } from 'react';
import AuthContext from '../authContext';

const AuthProvider = (children) => {
	const [isLoggedin, setIsLoggedin] = useState(true);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('userToken'));
		if (token) {
			setIsLoggedin(true);
		} else {
			setIsLoggedin(false);
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				loginstate: [isLoggedin, setIsLoggedin]
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;