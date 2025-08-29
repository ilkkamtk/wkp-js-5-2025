'use strict';

// eslint-disable-next-line no-unused-vars
async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    if (json.error) {
      throw new Error(json.message);
    } else {
      throw new Error('HTTP error: ' + response.status);
    }
  }
  return json;
}
