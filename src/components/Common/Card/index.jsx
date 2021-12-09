import React from "react";
import Button from "../Button";
import "./style.scss";

const Card = ({
	classes,
	cardType,
	data,
	clickHandler,
	onStatusUpdate={onStatusUpdate}
}) => {
	return (
		<div 
			className={`card ${classes}`}
			onClick={() => clickHandler(cardType, data.name)}
		>
			<div className='row_1'>
				{cardType && <label className="card_label">{cardType.toUpperCase()}</label>}
				<p className='title'>{data.name}</p>
				{cardType !== 'Order' && 
					<>
						<label className="card_label">No. of Orders</label>
						<div className='count_wrapper'>
							<p className='count'>{data.count}</p>
						</div>
					</>
				}
			</div>
			<label className='card_label add_margin'>Change Status</label>
			<div className='row'>
				<Button title="Out for Delivery" onStatusUpdate={() => onStatusUpdate({ key: cardType, value: data.name }, "Out for Delivery")} />
				<Button title="Delivered" onStatusUpdate={() => onStatusUpdate({ key: cardType, value: data.name }, "Delivered")} />
			</div>
		</div>
	)
};

export default Card;