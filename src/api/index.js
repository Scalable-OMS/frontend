import axios from "axios";

const BASE_URL = "http://localhost:4000";

const getHeaders = () => {
	const token = localStorage.getItem("userToken");
	return {"token": token}
}

const responseFormatter = (res, err) => {
	const response = {};
	response.data = undefined;
	if (res) {
		response.status = res.status;
		response.role = res.headers["role"]
		if (res.headers["role"] === 'driver') {
			localStorage.setItem('userCity', res.headers["city"])
			response.city = res.headers["city"]
		}
		if (err) {
			response.error = err;
		}
		if (res) {
			response.data = res.data;
		}
	}
	return response;
}

export const getOrderedCities = async (deliveryDate) => {
	const url = BASE_URL + "/orders/cities?deliveryDate=" + deliveryDate;
	try {
		const response = await axios.get(url, { headers: getHeaders() });
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err)
	}
}

export const getOrdersByCity = async (deliveryDate) => {
	const url = BASE_URL + "/orders/city?deliveryDate=" + deliveryDate;
	try {
		const response = await axios.get(url, { headers: getHeaders() });
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err)
	}
}

export const getOrderRoutingForCity = async (deliveryDate, city) => {
	const url = BASE_URL + "/orders/routing?deliveryDate=" + deliveryDate + "&city=" + city;
	try {
		const response = await axios.get(url, { headers: getHeaders() });
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err)
	}
}

export const getRoutes = async () => {
	const url = BASE_URL + "/routes";
	try {
		const response = await axios.get(url, { headers: getHeaders() });
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err)
	}
}

export const loginAPI = async (creds) => {
	const url = BASE_URL + "/auth/login"
	try {
		const response = await axios.post(url, creds);
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err);
	}
}

export const logoutAPI = async () => {
	const url = BASE_URL + "/auth/logout";
	try {
		const response = await axios.put(url, null, { headers: getHeaders() });
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err);
	}
}

export const getDrivers = async (city) => {
	const url = BASE_URL + "/drivers?city="+city;
	try {
		const response = await axios.get(url, { headers: getHeaders() });
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err);
	}
}

export const updateDriverForPath = async (driverId, path, deliveryDate, selectedCity) => {
	const url = BASE_URL + "/drivers";
	try {
		const response = await axios.put(url, { deliveryDate, driverId, path, city: selectedCity } ,{ headers: getHeaders() });
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err);
	}
}

export const updateRouteOrders = async (city, deliveryDate, status) => {
	const url = BASE_URL + "/routes";
	try {
		const response = await axios.put(url, { city, deliveryDate, status }, { headers: getHeaders() });
		return responseFormatter(response);
	} catch(err) {
		return responseFormatter(undefined, err);
	}
}

export const updateOrderStatus = async (orderId, status, deliveryDate) => {
	const url = BASE_URL + "/orders/status";
	try {
		await axios.put(url, { category: { "key": "order", value: orderId }, status: status, deliveryDate: deliveryDate }, { headers: getHeaders() })
	} catch(err) {
		return responseFormatter(undefined, err);
	}
}