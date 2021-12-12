import React, { useContext, useEffect, useState } from 'react';
import { getDrivers, 
	// getOrderCities, 
	getOrderedCities, 
	getOrderRoutingForCity, 
	getOrdersByCity, 
	updateDriverForPath, 
	updateOrderStatus 
} from '../../api';
// import { mockRoutesData } from '../../api/mock';
import Card from '../../components/Common/Card';
import Pathcard from '../../components/Common/Pathcard';
import DeliveryRoute from '../../components/Layout/DeliveryRoute';
import Leftbar from '../../components/Layout/Leftbar';
import AuthContext from '../../context/Auth/AuthContext';
import './style.scss';

const Home = () => {
	const [cityOrdersData, setCityOrdersData] = useState([]);
	const [cityDeliveryRouting, setCityDeliveryRouting] = useState([]);
	const [currentDisplay, setCurrentDisplay] = useState("City");
	const [selectedCity, setSelectedCity] = useState();
	const [deliveryRoutingAssignment, setDeliveryRoutingAssignment] = useState([]);
	// const [ordersData, setOrders] = useState([]);
	const [deliveryDate, setDeliveryDate] = useState();
	const [driversList, setDriversList] = useState([])
	const { role } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// const today = new Date()
		// setDeliveryDate(today.toISOString().split('T')[0]);
		setDeliveryDate("2021-12-31");
	}, []);

	useEffect(() => {
		if (deliveryDate) {
			// fetch data with changed Delivery Date
			setLoading(true);
			if (role === "driver") {
				const city = localStorage.getItem("userCity")
				if (city) {
					setSelectedCity(city);
				}
				getOrdersByCity(deliveryDate).then(res => {
					setCityDeliveryRouting(res.data);
					setLoading(false);
				});
			} else if (role === 'admin') {
				getOrderedCities(deliveryDate).then(res => {
					setCityOrdersData(res.data);
					setLoading(false);
				});
			};
		}
	}, [deliveryDate, role]);

	useEffect(() => {
		if (selectedCity) {
			setLoading(true);
			getDrivers(selectedCity).then(res => {
				setDriversList(res.data)
			});
			getOrderRoutingForCity(deliveryDate, selectedCity).then(res => {
				setDeliveryRoutingAssignment(res.data)
				setLoading(false);
			});
			setCurrentDisplay("orderDeliveryPath");
		}
	}, [deliveryDate, selectedCity]);

	// useEffect(() => {
	// 	if (selectedCity && selectedPostalCode) {
	// 		const orders = filterData(mockRoutesData, "orders", { city: selectedCity, postalCode: selectedPostalCode });
	// 		setOrders(orders);
	// 		setCurrentDisplay("orders");
	// 	}
	// }, [selectedCity, selectedPostalCode]);

	const clickHandler = (type, data) => {
		if (type === "City") {
			setSelectedCity(data)
		}
	};

	const onDriverAssigned = async (driverId, path) => {
		setLoading(true);
		updateDriverForPath(driverId, path, deliveryDate, selectedCity).then(() => {
			getOrderRoutingForCity(deliveryDate, selectedCity).then(res => {
				setDeliveryRoutingAssignment(res.data)
				setLoading(false);
			});
		})
	}

	const onStatusChange = async (orderId, status) => {
		setLoading(true);
		updateOrderStatus(orderId, status, deliveryDate).then(() => {
			getOrdersByCity(deliveryDate).then(res => {
				setCityDeliveryRouting(res.data);
				setLoading(false);
			});
		});
	}
	
	return (
		<div className="container">
			{currentDisplay === "City" ? 
				<Leftbar title="Category" value="Cities" onDateChange={(date) => setDeliveryDate(date)} isLoading={loading} />:
				<Leftbar title="Delivery paths for" value={selectedCity} isLoading={loading} />
				// <Leftbar title={`Orders of ${selectedCity} in postalCode`} value={selectedPostalCode} />
			}
			<div className='content'>
				<p className='date_selected'>Selected Date: {(new Date(deliveryDate)).toDateString()}</p>
				{role === "driver"?
					<div className='driver_delivery_routes'>
						<DeliveryRoute orders={cityDeliveryRouting} onStatusChange={onStatusChange} />
					</div>
				:
				currentDisplay === 'City' ?
					<div className="grid">
						{Object.keys(cityOrdersData).length > 0 && Object.keys(cityOrdersData).map(city => (
							<Card
								classes="cities"
								cardType='City'
								data={{ name: city, count: cityOrdersData[city] }} 
								clickHandler={clickHandler}
								onStatusUpdate={() => {}}
							/>
						))}
					</div>
				:
					<div className='delivery_paths'>
						{
							deliveryRoutingAssignment.length > 0 && deliveryRoutingAssignment.map(route => (
								<Pathcard 
									pathName={route.path_id} 
									count={route.noOfOrders} 
									driversList={driversList}
									assignedDriver={route.driverAssigned}
									onDriverAssigned={onDriverAssigned}
								/>
							))
						}
					</div>
				}
			</div>
		</div>
	)
};

export default Home;