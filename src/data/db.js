import { openDB } from 'idb';
import { IdbWriteError, IdbGetError } from '../utils/errors';
import ENV from '../global/env';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = ENV;

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
            throw new IdbGetError(error);
        }
    }

    static async getRestaurants() {
        try {
            return (await db).getAll(OBJECT_STORE_NAME);
        } catch (error) {
            throw new IdbGetError(error);
        }
    }

    static async saveRestaurant(restaurant) {
        try {
            return (await db).put(OBJECT_STORE_NAME, restaurant);
        } catch (error) {
            throw new IdbWriteError(error);
        }
    }

    static async deleteRestaurant(id) {
        try {
            return (await db).delete(OBJECT_STORE_NAME, id);
        } catch (error) {
            throw new IdbWriteError(error);
        }
    }

    static async getRestaurantIds() {
        try {
            return (await db).getAllKeys(OBJECT_STORE_NAME);
        } catch (error) {
            throw new IdbGetError(error);
        }
    }

    static async clearDb() {
        try {
            return (await db).clear(OBJECT_STORE_NAME);
        } catch (error) {
            throw new IdbWriteError(error);
        }
    }
}

export default FavoriteRestaurantIdb;
