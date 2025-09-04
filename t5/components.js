'use strict';

const restaurantRow = (restaurant) => {
  const {name, address, city, company} = restaurant;

  const rivi = document.createElement('tr');

  const nimiSolu = document.createElement('td');
  nimiSolu.innerText = name;

  const osoiteSolu = document.createElement('td');
  osoiteSolu.innerText = `${address} ${city}`;

  const firmaSolu = document.createElement('td');
  firmaSolu.innerText = company;

  rivi.append(nimiSolu, osoiteSolu, firmaSolu);

  return rivi;
};

const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, city, phone, company} = restaurant;
  let html = `
      <h3>${name}</h3>
      <address>
        ${address}<br>
        ${postalCode} ${city} <br>
        ${phone} <br>
        ${company}
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
  // silmukalla menu läpi, lisää html stringiin
  console.log(menu.courses);
  menu.courses.forEach((course) => {
    if (typeof course.diets === 'string') {
      course.diets = course.diets.split(',');
    }

    const filteredDiets = course.diets?.filter(
      (diet) => diet !== '*' && diet !== 'A'
    );
    console.log(filteredDiets);

    const dietsWithEmojis = filteredDiets?.map((diet) => {
      switch (diet) {
        case 'Veg':
          return '&#129382;';
        case 'G':
          return '&#127806;';
        case 'A':
          return '🐻';
        default:
          return '&#128286;';
      }
    });

    const dietString = dietsWithEmojis?.reduce(
      (accString, diet) => accString + diet + '&nbsp;',
      ''
    );

    html += `
      <tr>
        <td>${course.name}</td>
        <td>${course.price}</td>
        <td>${dietString}</td>
      </tr>
    `;
  });

  html += `
    </tbody>
  </table>
  `;
  return html;
};

export {restaurantRow, restaurantModal};
