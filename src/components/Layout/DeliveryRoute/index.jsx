import React from 'react';
import './style.scss';
import GreenTick from '../../../assets/icons/tick.png'; 
import GreyTick from '../../../assets/icons/tick_grey.png'; 

const DeliveryRoute = ({
	orders,
	onStatusChange
}) => {
	const getElements = () => {
		const result = []
		orders.map((order, index) => {
			if (index % 20 === 0) {
				result.push(<p className='batch_label'>Batch - {(index / 20) + 1}</p>)
			}
			result.push(
				<div className='delivery_item'>
					<img 
						src={order.status === 'ordered' ? GreyTick : GreenTick} 
						className='order_status'
						onClick={() => onStatusChange(order.orderId, order.status === 'ordered'? "delivered":"ordered")}
						alt="Status Update"
					/>
					<p className='delivery_address'>
						Delivery Location - {index + 1} 
						{index === 0 ? 
							<span className='warehouse_location'><b><i>  Warehouse</i></b></span> :
							<b> {order.deliveryAddress}</b>
						}
					</p>
				</div>
			)
			return order;
		});
		return result;
	}
	return (
		<div className='delivery_route'>
			{getElements()}
		</div>
	)
};

export default DeliveryRoute;