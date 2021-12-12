import React from 'react';
import Loader from '../../Common/Loader';
import './style.scss';

const Leftbar = ({
	title,
	value,
	onDateChange,
	isLoading
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
			{isLoading && 
				<Loader />
			}
		</div>
	)
};

export default Leftbar;