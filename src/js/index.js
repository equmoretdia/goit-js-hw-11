import getRefs from './refs';
import api from './api';
import markup from './markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();

markup.preparePageStyles();

let searchMatches = 0;

function createGallery(pictures) {
  if (pictures.hits.length > 0) {
    if (api.search.page === 1) {
      Notify.success(`Hooray! We found ${pictures.totalHits} images`);
      console.log(`Hooray! We found ${pictures.totalHits} images`);
      console.log(`page number ${api.search.page} is loaded`);
    }
    markup.renderGalleryCards(pictures);
    searchMatches += pictures.hits.length;
    console.log(
      `${searchMatches} photos are delivered out of ${pictures.totalHits} allowed per one query.`
    );
    if (searchMatches < pictures.totalHits) {
      setTimeout(markup.showButton, 1500);
    } else {
      markup.hideButton();
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      console.log("We're sorry, but you've reached the end of search results.");
      refs.searchForm.reset();
    }
  } else {
    Notify.failure('no pictures found!');
    console.log('no pictures found!');
    markup.hideButton();
    refs.searchForm.reset();
  }
}

function startSearch(event) {
  event.preventDefault();
  if (api.search.query !== refs.searchInput.value) {
    markup.hideButton();
    markup.cleanGallery();
    api.search.query = refs.searchInput.value;
    if (api.search.query.trim() !== '') {
      api.search.page = 1;
      searchMatches = 0;
      api.fetchPictures().then(createGallery);
    } else {
      Notify.failure('Please fill in search field!');
      console.log('Please fill in search field!');
    }
  }
}

function loadMore() {
  if (api.search.previous) {
    api.search.page += 1;
    console.log(`page number ${api.search.page} is loaded`);
  }
  api.fetchPictures().then(createGallery);
}

refs.searchForm.addEventListener('submit', startSearch);
refs.loadMoreButton.addEventListener('click', loadMore);

markup.hideButton();
