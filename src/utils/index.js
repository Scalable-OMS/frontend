export const filterData = (data, key, conditions) => {
	switch(key) {
		case "city":
			const cities = data.map(d => d.city);
			return cities;
		case "postalCode":
			const codes = data
				.filter(d => d.city === conditions["city"])
				.map(dd => dd.postalCode)
			return codes;
		default:
			const orders = data
				.filter(d => d.city === conditions["city"] && d.postalCode === conditions["postalCode"])
				.map(dd => dd.orders)
			return orders;
	}
}

export const getCount = (key, value, data) => {
	let count = 0;
	data.map(d => {
		if (d[key] === value) {
			count += d.orders.length
		}
		return d;
	});
	return count;
}
