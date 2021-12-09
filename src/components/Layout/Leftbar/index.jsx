import React from 'react';
import './style.scss';

const Leftbar = ({
	title,
	value,
	onDateChange
}) => {
	return (
		<div className='left_bar'>
			<div className='date_selector'>
				<label>Change date</label>
				<input type='date' className='custom_date' onChange={(e) => onDateChange(e)} />
			</div>
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