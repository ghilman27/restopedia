const assert = require('assert');

/* eslint-disable no-undef */
Feature('Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/favorites');
});

Scenario('liking and disliking a restaurant', async ({ I }) => {
    // initially no favorite found
    I.seeElement('#noFavoriteFound');

    // redirect to home
    I.amOnPage('/');
    I.seeElement('resto-card a');

    // click first resto-card, navigate to detail page
    const firstResto = locate('resto-card a').first();
    const firstRestoTitle = await I.grabAttributeFrom(firstResto, 'title');
    I.click(firstResto);

    // see add to favorite button
    I.seeElement('like-button button');
    I.seeElement('like-button button[aria-label="add to favorite"]');

    // click add to favorite button
    I.click('like-button button[aria-label="add to favorite"]');
    I.seeElement('like-button button[aria-label="remove from favorite"]');

    // navigate to favorites
    I.amOnPage('/favorites');

    // liked resto is displayed
    I.seeElement('resto-card a');
    const likedRestoTitle = await I.grabAttributeFrom('resto-card a', 'title');
    assert.strictEqual(firstRestoTitle, likedRestoTitle);

    // navigate back to detail page
    I.click('resto-card a');
    // pause();

    // see remove from favorite button
    I.seeElement('like-button button');
    I.seeElement('like-button button[aria-label="remove from favorite"]');

    // click remove from favorite button
    I.click('like-button button[aria-label="remove from favorite"]');
    I.seeElement('like-button button[aria-label="add to favorite"]');

    // navigate back to favorites
    I.amOnPage('/favorites');

    // no favorite resto displayed
    I.seeElement('#noFavoriteFound');
});
