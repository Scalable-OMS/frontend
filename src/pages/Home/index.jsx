import React, { useEffect, useState } from 'react';
import { mockRoutesData } from '../../api/mock';
import Card from '../../components/Common/Card';
import Leftbar from '../../components/Layout/Leftbar';
import { filterData, getCount } from '../../utils';
import './style.scss';

const Home = () => {
	const [cityRoutesData, setCityRoutesData] = useState([]);
	const [currentDisplay, setCurrentDisplay] = useState("City");
	const [selectedCity, setSelectedCity] = useState();
	const [postalCodes, setPostalCodes] = useState([]);
	const [selectedPostalCode, setSelectedPostalCode] = useState();
	const [ordersData, setOrders] = useState([]);
	const [deliveryDate, setDeliveryDate] = useState();

	useEffect(() => {
		const data = filterData(mockRoutesData, "city");
		setCityRoutesData(data);
		const today = new Date()
		setDeliveryDate(today.toISOString().split('T')[0]);
	}, []);

	useEffect(() => {
		// fetch data with changed Delivery Date
	}, [deliveryDate]);

	useEffect(() => {
		if (selectedCity) {
			const postalCodes = filterData(mockRoutesData, "postalCode", { city: selectedCity })
			console.log(postalCodes);
			setPostalCodes(postalCodes);
			setCurrentDisplay("postalCode");
		}
	}, [selectedCity]);

	useEffect(() => {
		if (selectedCity && selectedPostalCode) {
			const orders = filterData(mockRoutesData, "orders", { city: selectedCity, postalCode: selectedPostalCode });
			setOrders(orders);
			setCurrentDisplay("orders");
		}
	}, [selectedCity, selectedPostalCode]);

	const clickHandler = (type, data) => {
		if (type === "City") {
			setSelectedCity(data)
		} else if (type === "postalCode") {
			setSelectedPostalCode(data)
		}
	};

	const onStatusUpdate = (category, status) => {

	}
	
	return (
		<div className="container">
			{currentDisplay === "City" ? 
				<Leftbar title="Category" value="Cities" onDateChange={(date) => setDeliveryDate(date)} />:
				currentDisplay === 'postalCode' ? <Leftbar title="Postal Codes in City" value={selectedCity} />:
				<Leftbar title={`Orders of ${selectedCity} in postalCode`} value={selectedPostalCode} />
			}
			<div className='content'>
				<p className='date_selected'>Selected Date: {(new Date(deliveryDate)).toDateString()}</p>
				<div className="grid">
					{currentDisplay === 'City' ?
						<>
							{cityRoutesData.length > 0 && cityRoutesData.map(city => (
								<Card
									classes="cities"
									cardType='City'
									data={{ name: city, count: getCount("city", city, mockRoutesData) }} 
									clickHandler={clickHandler}
									onStatusUpdate={onStatusUpdate}
								/>
							))}
						</>
						: currentDisplay === 'postalCode' ?
						<>
							{postalCodes.length > 0 && postalCodes.map(code => (
								<Card 
									classes="postalCodes"
									cardType='postalCode'
									data={{ name: code, count: getCount("postalCode", code, mockRoutesData) }}
									onStatusUpdate={onStatusUpdate}
								/>
							))}
						</>
						:
						<>
							{ordersData.length > 0 && ordersData.map(order => (
								<Card 
									classes="orders"
									cardType="Order"
									data={{ name: order }}
									onStatusUpdate={onStatusUpdate}
								/>
							))}
						</>
					}
				</div>
			</div>
		</div>
	)
};

export default Home;