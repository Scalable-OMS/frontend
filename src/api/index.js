import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const getHeaders = () => {
	const token = JSON.parse(localStorage.getItem("userToken"));
	return {
		token
	}
}

const responseFormatter = (res, err) => {
	const response = {};
	response.data = undefined;
	response.status = res.status;
	if (err) {
		response.error = err;
	}
	if (res) {
		response.data = res.data;
	}
	return response;
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
	const url = BASE_URL + "/routes/drivers?city="+city;
	try {
		const response = await axios.get(url, { headers: getHeaders() });
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