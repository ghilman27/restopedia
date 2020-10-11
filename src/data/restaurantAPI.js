const API_BASE_URL = "https://dicoding-restaurant-api.el.r.appspot.com";

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
}

export default RestaurantAPI;