import React from 'react';
import './style.scss';

const Button = ({
	clickHandler,
	title
}) => {
	return (
		<div 
			className='custom_button'
			onClick={clickHandler}
			role='button'
			tabIndex={0}
		>
			{title}
		</div>
	);
};

export default Button;