import React from 'react';
import './style.scss';

const Button = ({
	clickHandler,
	title,
	classes
}) => {
	return (
		<div 
			className={`custom_button ${classes}`}
			onClick={clickHandler}
			role='button'
			tabIndex={0}
		>
			{title}
		</div>
	);
};

export default Button;