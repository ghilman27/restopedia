import { HttpGetError, HttpPostError } from 'src/utils/errors.js';

const API_BASE_URL = process.env.API_BASE_URL;
const DEFAULT_POST_HEADERS = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'X-Auth-Token': process.env.API_KEY,
	},
};

const fetchData = async (url, headers = undefined) => {
	const response = await fetch(url, headers);
	const json = await response.json();
	return json;
};

class RestaurantAPI {
	static getRestaurants = async () => {
		const url = `${API_BASE_URL}/list`;
		try {
			const { error, message, restaurants } = await fetchData(url);
			if (error) throw new HttpGetError(message);
			return restaurants;
		} catch (error) {
			throw error;
		}
	};

	static getRestaurant = async (restaurantId) => {
		const url = `${API_BASE_URL}/detail/${restaurantId}`;
		try {
			const { error, message, restaurant } = await fetchData(url);
			if (error) throw new HttpGetError(message);
			return restaurant;
		} catch (error) {
			throw error;
		}
	};

	static searchRestaurants = async (query) => {
		const url = `${API_BASE_URL}/search?q=${query}`;
		try {
			const { error, message, restaurants } = await fetchData(url);
			if (error) throw new HttpGetError(message);
			return restaurants;
		} catch (error) {
			throw error;
		}
	};

	static postReview = async ({ id, name, review }) => {
		const url = `${API_BASE_URL}/review`;
		const body = JSON.stringify({ id, name, review });
		const headers = { ...DEFAULT_POST_HEADERS, body };
		try {
			const { error, message, customerReviews } = await fetchData(
				url,
				headers
			);
			if (error) throw new HttpPostError(message);
            return customerReviews;
		} catch (error) {
			throw error;
		}
	};
}

export default RestaurantAPI;
