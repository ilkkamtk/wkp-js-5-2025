'use strict';

import {restaurantModal, restaurantRow} from './components.js';
import fetchData from './utils/fetchData.js';
import {apiURL} from './utils/variables.js';

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const closeButtons = document.querySelectorAll('.close-button');

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

const teeRavintolaLista = async () => {
  const restaurants = await fetchData(apiURL + '/restaurants');

  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  restaurants.forEach((restaurant) => {
    const rivi = restaurantRow(restaurant);
    rivi.addEventListener('click', highlight);
    rivi.addEventListener('click', async () => {
      const dailyMenu = await fetchData(
        `${apiURL}/restaurants/daily/${restaurant._id}/fi`
      );
      openModal(restaurant, dailyMenu);
    });

    document.querySelector('#target').appendChild(rivi);
  });
};

teeRavintolaLista();
