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

	useEffect(() => {
		const data = filterData(mockRoutesData, "city");
		setCityRoutesData(data);
	}, []);

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
	}
	
	return (
		<div className="container">
			{currentDisplay === "City" ? 
				<Leftbar title="Category" value="Cities" />:
				currentDisplay === 'postalCode' ? <Leftbar title="Postal Codes in City" value={selectedCity} />:
				<Leftbar title={`Orders of ${selectedCity} in postalCode`} value={selectedPostalCode} />
			}
			<div className="grid">
				{currentDisplay === 'City' ?
					<>
						{cityRoutesData.length > 0 && cityRoutesData.map(city => (
							<Card
								classes="cities"
								cardType='City'
								data={{ name: city, count: getCount("city", city, mockRoutesData) }} 
								clickHandler={clickHandler}
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
							/>
						))}
					</>
				}
			</div>
		</div>
	)
};

export default Home;