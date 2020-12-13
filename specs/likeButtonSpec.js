/* eslint-disable import/order */
/* eslint-disable no-undef */
import LikeButton from '../src/components/like-button/like-button';
import RestaurantDb from '../src/data/db';
import store from '../src/store';
import {
    resetRestaurants,
    saveRestaurant,
} from '../src/store/restaurant/actions';
import { fixture, html } from '@open-wc/testing';

const initiateLikeButton = async (restaurant) => fixture(html`<like-button .restaurant=${restaurant}></like-button>`);

const resetState = async () => {
    store.dispatch(resetRestaurants());
    await RestaurantDb.clearDb();
};

const clickButton = async (element) => {
    const button = element.querySelector('button');
    button.click();
    await element.updateComplete;
};

describe('Liking a restaurant:', () => {
    let likeButton;
    const RESTAURANT_ID = 1;
    const RESTAURANT_NAME = 'a restaurant';
    const dummyRestaurant = {
        id: RESTAURANT_ID,
        name: RESTAURANT_NAME,
    };
    const emptyRestaurant = {};

    beforeEach(async () => {
        likeButton = await initiateLikeButton(dummyRestaurant);
    });

    afterEach(async () => resetState());

    it('is an instance of LikeButton', async () => {
        expect(likeButton).toBeInstanceOf(LikeButton);
    });

    it('should show the like button', async () => {
        expect(
            likeButton.querySelector('[aria-label="add to favorite"]'),
        ).toBeTruthy();
    });

    it('should not show the dislike button', async () => {
        expect(
            likeButton.querySelector('[aria-label="remove from favorite"]'),
        ).toBeFalsy();
    });

    it('should be able to save the restaurant', async () => {
        await clickButton(likeButton);
        const restaurant = await RestaurantDb.getRestaurant(RESTAURANT_ID);
        expect(restaurant).toEqual(dummyRestaurant);
    });

    it('should not save a restaurant again when its already saved', async () => {
        await RestaurantDb.saveRestaurant(dummyRestaurant);
        await clickButton(likeButton);
        const restaurants = await RestaurantDb.getRestaurants();
        expect(restaurants).toEqual([dummyRestaurant]);
    });

    it('should not add a restaurant when it has no id', async () => {
        const noIdLikeButton = await initiateLikeButton(emptyRestaurant);
        await clickButton(noIdLikeButton);
        const restaurants = await RestaurantDb.getRestaurants();
        expect(restaurants).toEqual([]);
    });
});

describe('Disliking restaurant:', () => {
    let dislikeButton;
    const RESTAURANT_ID = 2;
    const RESTAURANT_NAME = 'another restaurant';
    const dummyRestaurant = {
        id: RESTAURANT_ID,
        name: RESTAURANT_NAME,
    };

    beforeEach(async () => {
        await store.dispatch(saveRestaurant(dummyRestaurant));
        dislikeButton = await initiateLikeButton(dummyRestaurant);
    });

    afterEach(async () => resetState());

    it('should show the dislike button', async () => {
        expect(
            dislikeButton.querySelector('[aria-label="remove from favorite"]'),
        ).toBeTruthy();
    });

    it('should not show the like button', async () => {
        expect(
            dislikeButton.querySelector('[aria-label="add to favorite"]'),
        ).toBeFalsy();
    });

    it('should be able to delete the saved restaurant', async () => {
        await clickButton(dislikeButton);
        const restaurant = await RestaurantDb.getRestaurant(RESTAURANT_ID);
        expect(restaurant).toBe(undefined);
    });

    it('should not thrown error when actually the saved restaurant is not in DB', async () => {
        await RestaurantDb.deleteRestaurant(RESTAURANT_ID);
        await clickButton(dislikeButton);
        const restaurants = await RestaurantDb.getRestaurants();
        expect(restaurants).toEqual([]);
    });
});
