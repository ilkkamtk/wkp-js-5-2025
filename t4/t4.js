'use strict';
async function register() {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const url = 'https://reqres.in/api/users';
    const options = {
      method: 'POST',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    // eslint-disable-next-line no-undef
    const userData = await fetchData(url, options);
    console.log(userData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

register();
