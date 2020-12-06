import { HttpGetError, HttpPostError } from '../utils/errors';

const { API_BASE_URL } = process.env;
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

const handleError = (error, ErrorClass) => {
    if (error instanceof ErrorClass) {
        return error;
    }
    if (!window.navigator.online) {
        return new ErrorClass('Restaurant API request error: No connection');
    }
    return error;
};

class RestaurantAPI {
    static async getRestaurants() {
        try {
            const url = `${API_BASE_URL}/list`;
            const { error, message, restaurants } = await fetchData(url);
            if (error) throw new HttpGetError(`Restaurant list GET error: ${message}`);
            return restaurants;
        } catch (error) {
            throw handleError(error, HttpGetError);
        }
    }

    static async getRestaurant(restaurantId) {
        try {
            const url = `${API_BASE_URL}/detail/${restaurantId}`;
            const { error, message, restaurant } = await fetchData(url);
            if (error) throw new HttpGetError(`Restaurant GET error (ID: ${restaurantId}): ${message}`);
            return restaurant;
        } catch (error) {
            throw handleError(error, HttpGetError);
        }
    }

    static async searchRestaurants(query) {
        try {
            const url = `${API_BASE_URL}/search?q=${query}`;
            const { error, message, restaurants } = await fetchData(url);
            if (error) throw new HttpGetError(`Restaurant search request with keyword ${query} error: ${message}`);
            return restaurants;
        } catch (error) {
            throw handleError(error, HttpGetError);
        }
    }

    static async postReview({ id, name, review }) {
        try {
            const url = `${API_BASE_URL}/review`;
            const body = JSON.stringify({ id, name, review });
            const headers = { ...DEFAULT_POST_HEADERS, body };
            const { error, message, customerReviews } = await fetchData(
                url,
                headers,
            );
            if (error) throw new HttpPostError(`Post review error of restaurant with ID ${id}: ${message}`);
            return customerReviews;
        } catch (error) {
            throw handleError(error, HttpPostError);
        }
    }
}

export default RestaurantAPI;
