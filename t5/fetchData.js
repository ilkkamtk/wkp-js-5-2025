'use strict';

export default async function fetchData(url, options = {}) {
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
