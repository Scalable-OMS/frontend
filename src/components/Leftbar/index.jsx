import React from 'react';
import './style.scss';

const Leftbar = ({
	title,
	value
}) => {
	return (
		<div className='left_bar'>
			<p>{title}</p>
			{value && 
				<div className='wrapper'>
					<p className='value'>{value}</p>
				</div>
			}
		</div>
	)
};

export default Leftbar;