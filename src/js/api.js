import getRefs from './refs';
import markup from './markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '40252258-b27561441daedadb4fc814a5c';
const search = {
  query: null,
  type: 'photo',
  orientation: 'horizontal',
  page: 1,
  onPage: 40,
  safe: true,
  previous: true,
};

async function fetchPictures() {
  try {
    const response = await fetch(
      `${BASE_URL}/?key=${API_KEY}&q=${search.query}&image_type=${search.type}&orientation=${search.orientation}&safesearch=${search.safe}&page=${search.page}&per_page=${search.onPage}`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    search.previous = true;
    const pictures = await response.json();
    return pictures;
  } catch (error) {
    search.previous = false;
    if (error.message === 'Failed to fetch') {
      Notify.failure(
        'Internet connection is lost. Please try again as soon as your connection is restored'
      );
      console.log(
        'Internet connection is lost. Please try again as soon as your connection is restored'
      );
    }
    // else if (error.message === '400') {
    //   Notify.failure(
    //     "We're sorry, but you've reached the end of search results."
    //   );
    //   console.log("We're sorry, but you've reached the end of search results.");
    //   markup.hideButton();
    //   refs.searchForm.reset();
    // }
    else {
      Notify.failure(`An error occurred: ${error.message}`);
      console.log('An error occurred: ', error.message);
      markup.hideButton();
      refs.searchForm.reset();
    }
  }
}

export default { fetchPictures, search };
