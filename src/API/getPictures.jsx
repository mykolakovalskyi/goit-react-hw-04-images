import axios from 'axios';

async function getPictures(searchQuery, page) {
  const API_KEY = '34679609-800cb3ce66b97456154e1ce44';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });
  return await axios.get(`https://pixabay.com/api/?${searchParams}`);
}

export default getPictures;
