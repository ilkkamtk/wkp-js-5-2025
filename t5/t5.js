'use strict';

const apiURL = 'https://media1.edu.metropolia.fi/restaurant/api/v1';

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const closeButtons = document.querySelectorAll('.close-button');

function highlight(evt) {
  document.querySelector('.highlight')?.classList.remove('highlight');
  evt.currentTarget.classList.add('highlight');
}

function openModal(restaurant, dailyMenu) {
  modal.showModal();
  modalContent.innerHTML = '';
  let html = `
    <h3>${restaurant.name}</h3>
    <address>
      ${restaurant.address}<br>
      ${restaurant.postalCode} ${restaurant.city} <br>
      ${restaurant.phone} <br>
      ${restaurant.company}
    </address>
  `;
  html += `
  <table>
    <thead>
      <tr>
        <th>Nimi</th>
        <th>Hinta</th>
        <th>Allergeenit</th>
      </tr>
    </thead>
    <tbody>`;
  // silmukalla dailyMenu läpi, lisää html stringiin
  modalContent.insertAdjacentHTML('beforeend', html);
}

// modaalien sulkeminen
for (const closeButton of closeButtons) {
  closeButton.addEventListener('click', function (evt) {
    evt.currentTarget.parentElement.parentElement.close();
  });
}

async function teeRavintolaLista() {
  // eslint-disable-next-line no-undef
  const restaurants = await fetchData(apiURL + '/restaurants');

  restaurants.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  for (const restaurant of restaurants) {
    const rivi = document.createElement('tr');
    rivi.addEventListener('click', highlight);
    rivi.addEventListener('click', async function () {
      // eslint-disable-next-line no-undef
      const dailyMenu = await fetchData(
        `${apiURL}/restaurants/daily/${restaurant._id}/fi`
      );
      console.log(dailyMenu);
      openModal(restaurant, dailyMenu);
    });

    const nimiSolu = document.createElement('td');
    nimiSolu.innerText = restaurant.name;

    const osoiteSolu = document.createElement('td');
    osoiteSolu.innerText = `${restaurant.address} ${restaurant.city}`;

    rivi.append(nimiSolu, osoiteSolu);
    document.querySelector('#target').appendChild(rivi);
  }
}

teeRavintolaLista();
