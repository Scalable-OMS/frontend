import React from 'react';
import './style.scss';

const Pathcard = ({
	pathName,
	count,
	assignedDriver,
	driversList,
	onDriverAssigned
}) => {
	const isDriverAssigned = (driver) => {
		if (driver === undefined || driver === "" || driver === null) {
			return false
		}
		return true
	}
	return (
		<div className='path_card'>
			<span>{pathName}</span>
			<span>{count}</span>
			{assignedDriver && <span>Driver Id: {assignedDriver}</span>}
			{driversList && !isDriverAssigned(assignedDriver) &&
				<select 
					name="drivers" 
					id="drivers"
					onChange={(e) => onDriverAssigned(e.target.value, pathName)}
				>
					{driversList.map(driver => (
						<option value={driver.id}>{driver.driver_name}</option>
					))}
				</select>
			}
		</div>
	)
}

export default Pathcard;