import getRefs from './refs';
import api from './api';
import markup from './markup';

const refs = getRefs();

markup.preparePageStyles();

let searchMatches = 0;

function createGallery(pictures) {
  if (pictures.hits.length > 0) {
    if (api.search.page === 1) {
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
      console.log("We're sorry, but you've reached the end of search results.");
      refs.searchForm.reset();
    }
  } else {
    console.log('no pictures found!');
    markup.hideButton();
    refs.searchForm.reset();
  }
}

function processError(error) {
  if (error.message === 'Request failed with status 400') {
    console.log("We're sorry, but you've reached the end of search results.");
    markup.hideButton();
    refs.searchForm.reset();
  } else if (error.message === 'Failed to fetch') {
    console.log(
      'Internet connection is lost. Please try again as soon as your connection is restored'
    );
  } else {
    console.log('An error occurred: ', error.message);
    markup.hideButton();
    refs.searchForm.reset();
  }
}

function startSearch(event) {
  event.preventDefault();
  if (api.search.query !== refs.searchInput.value) {
    // console.log(refs.searchInput);
    // console.log(refs.searchForm.elements.searchQuery);
    // console.log(event.currentTarget.elements.searchQuery);
    // console.log(refs.searchForm.elements[1]);
    markup.hideButton();
    markup.cleanGallery();
    api.search.query = refs.searchInput.value;
    if (api.search.query.trim() !== '') {
      api.search.page = 1;
      searchMatches = 0;
      api.fetchPictures().then(createGallery).catch(processError);
    } else {
      console.log('Please fill in search field!');
    }
  }
}

function loadMore() {
  api.search.page += 1;
  console.log(`page number ${api.search.page} is loaded`);
  api.fetchPictures().then(createGallery).catch(processError);
}

refs.searchForm.addEventListener('submit', startSearch);
refs.loadMoreButton.addEventListener('click', loadMore);

markup.hideButton();
