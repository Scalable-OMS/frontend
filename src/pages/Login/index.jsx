import React, { useContext, useState } from 'react';
import Button from '../../components/Common/Button';
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
		<div className="login_container">
			<label>Email</label>
			<input 
				className='custom_input' 
				type='email'
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Type email here..."
			/>
			<label>Password</label>
			<input 
				className="custom_input"
				type='password'
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Type password here..."
			/>
			<Button 
				className="custom_button"
				clickHandler={() => loginHandler()}
				title="Login"
			/>
		</div>
	)
};

export default Login;