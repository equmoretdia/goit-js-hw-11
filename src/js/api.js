const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '40252258-b27561441daedadb4fc814a5c';
const search = {
  query: null,
  type: 'photo',
  orientation: 'horizontal',
  page: 1,
  onPage: 40,
  safe: true,
};

function processJSON(response) {
  return response.json();
}

function fetchPictures() {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${search.query}&image_type=${search.type}&orientation=${search.orientation}&safesearch=${search.safe}&page=${search.page}&per_page=${search.onPage}`
  ).then(processJSON);
}

export default { fetchPictures, search };
