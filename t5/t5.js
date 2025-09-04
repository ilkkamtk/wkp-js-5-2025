'use strict';

import {restaurantModal, restaurantRow} from './components.js';
import fetchData from './utils/fetchData.js';
import {apiURL} from './utils/variables.js';

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const closeButtons = document.querySelectorAll('.close-button');
const resetButton = document.querySelector('#reset');
const sodexoButton = document.querySelector('#sodexo');
const compassButton = document.querySelector('#compass');
const target = document.querySelector('#target');

const highlight = (evt) => {
  document.querySelector('.highlight')?.classList.remove('highlight');
  evt.currentTarget.classList.add('highlight');
};

const openModal = (restaurant, dailyMenu) => {
  modal.showModal();
  modalContent.innerHTML = '';
  const html = restaurantModal(restaurant, dailyMenu);
  modalContent.insertAdjacentHTML('beforeend', html);
};

// modaalien sulkeminen
for (const closeButton of closeButtons) {
  closeButton.addEventListener('click', (evt) => {
    evt.currentTarget.parentElement.parentElement.close();
  });
}

const haeRavintolat = async () => {
  return await fetchData(apiURL + '/restaurants');
};

const teeRavintolaLista = async (restaurants) => {
  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  target.innerHTML = '';

  restaurants.forEach((restaurant) => {
    const rivi = restaurantRow(restaurant);
    rivi.addEventListener('click', highlight);
    rivi.addEventListener('click', async () => {
      const dailyMenu = await fetchData(
        `${apiURL}/restaurants/daily/${restaurant._id}/fi`
      );
      openModal(restaurant, dailyMenu);
    });
    target.appendChild(rivi);
  });
};

const restaurants = await haeRavintolat();
teeRavintolaLista(restaurants);

sodexoButton.addEventListener('click', () => {
  const filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.company === 'Sodexo'
  );
  teeRavintolaLista(filteredRestaurants);
});
