const API_BASE_URL = process.env.API_BASE_URL;
const DEFAULT_POST_HEADERS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.API_KEY
    }
}

const fetchData =  async (url, headers = undefined) => {
    const response = await fetch(url, headers);
    const json = await response.json();
    return json;
}

class RestaurantAPI {
    static getRestaurants = async () => {
        const url = `${API_BASE_URL}/list`;
        const { restaurants } = await fetchData(url);
        return restaurants;
    }

    static getRestaurant = async (restaurantId) => {
        const url = `${API_BASE_URL}/detail/${restaurantId}`;
        const { restaurant } = await fetchData(url);
        return restaurant;
    }
    
    static searchRestaurants = async (query) => {
        const url = `${API_BASE_URL}/search?q=${query}`;
        const { restaurants } = await fetchData(url);
        return restaurants;
    }

    static postReview = async ({restaurantId, restaurantName, review}) => {
        const headers = {
            ...DEFAULT_POST_HEADERS,
            body: {
                id: restaurantId,
                name: restaurantName,
                review: review
            }
        };
        const response = await fetchData(url, headers);
        return response;
    }
}

export default RestaurantAPI;