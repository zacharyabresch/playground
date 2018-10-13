import fetch from 'node-fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default async id => {
  const response = await fetch(`${BASE_URL}/posts${id ? `/${id}` : ''}`);
  return await response.json();
};
