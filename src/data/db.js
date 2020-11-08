import { openDB } from 'idb';

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_VERSION = process.env.DATABASE_VERSION;
const OBJECT_STORE_NAME = process.env.OBJECT_STORE_NAME;

const db = openDB(DATABASE_NAME, DATABASE_VERSION, {
	upgrade(database) {
		database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
	},
});

class FavoriteRestaurantIdb {
	static async getRestaurant(id) {
		try {
			return (await db).get(OBJECT_STORE_NAME, id);
		} catch (error) {
			return error;
		}
	}

	static async getRestaurants() {
		try {
			return (await db).getAll(OBJECT_STORE_NAME);
		} catch (error) {
			return error;
		}
	}

	static async saveRestaurant(restaurant) {
		try {
			return (await db).put(OBJECT_STORE_NAME, restaurant);
		} catch (error) {
			return error;
		}
	}

	static async deleteRestaurant(id) {
		try {
			return (await db).delete(OBJECT_STORE_NAME, id);
		} catch (error) {
			return error;
		}
	}

	static async getRestaurantIds() {
		try {
			return (await db).getAllKeys(OBJECT_STORE_NAME);
		} catch (error) {
			return error;
		}
	}

	static async clearDb() {
		try {
			return (await db).clear(OBJECT_STORE_NAME);
		} catch (error) {
			return error;
		}
	}
}

export default FavoriteRestaurantIdb;
