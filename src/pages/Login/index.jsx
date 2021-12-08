import React, { useContext, useState } from 'react';
import AuthContext from '../../context/Auth/AuthContext';
import './style.scss';

const Login = () => {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const loginHandler = async () => {
		await login({
			email,
			password
		});
	}

	return (
		<div className="container">
			<label>Email</label>
			<input 
				className='custom_input' 
				type='email'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label>Password</label>
			<input 
				className="custom_input"
				type='password'
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button 
				className="custom_button"
				onClick={() => loginHandler()}
			>
				Login
			</button>
		</div>
	)
};

export default Login;