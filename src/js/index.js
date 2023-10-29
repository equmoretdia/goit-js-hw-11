const refs = {
  body: document.querySelector('body'),
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form input'),
  searchButton: document.querySelector('.search-form button'),
  galleryWrapper: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

refs.body.style.fontFamily = 'Calibri, sans-serif';
refs.body.style.fontSize = '12px';
refs.body.style.margin = '0';
refs.body.style.paddingTop = '60px';
refs.body.style.backgroundColor = '#EAF1FA';
refs.searchForm.style.display = 'flex';
refs.searchForm.style.justifyContent = 'center';
refs.searchForm.style.position = 'fixed';
refs.searchForm.style.top = '0px';
refs.searchForm.style.left = '0px';
refs.searchForm.style.right = '0px';
refs.searchForm.style.padding = '10px 0';

refs.searchForm.style.backgroundColor = '#73A0DB';

refs.searchInput.style.padding = '10px 5px';
refs.searchInput.style.border = '1px solid #255391';
refs.searchInput.style.borderRadius = '5px';

refs.searchButton.style.padding = '10px 15px';
refs.searchButton.style.backgroundColor = '#255391';
refs.searchButton.style.color = '#ffffff';
refs.searchButton.style.border = '1px solid #ffffff';
refs.searchButton.style.borderRadius = '5px';
refs.galleryWrapper.style.display = 'flex';
refs.galleryWrapper.style.alignContent = 'center';
refs.galleryWrapper.style.flexWrap = 'wrap';
refs.galleryWrapper.style.gap = '10px';
refs.galleryWrapper.style.padding = '0 5px 10px';
refs.loadMoreButton.style.display = 'block';
refs.loadMoreButton.style.margin = '0 auto 10px';
refs.loadMoreButton.style.padding = '10px 15px';
refs.loadMoreButton.style.backgroundColor = '#255391';
refs.loadMoreButton.style.color = '#ffffff';
refs.loadMoreButton.style.border = '1px solid #255391';
refs.loadMoreButton.style.borderRadius = '5px';
//

function hideButton() {
  refs.loadMoreButton.style.visibility = 'hidden';
}

function showButton() {
  refs.loadMoreButton.style.visibility = 'visible';
}

const URL = 'https://pixabay.com/api';
const API_KEY = 'key=40252258-b27561441daedadb4fc814a5c';
const search = {
  query: null,
  type: 'photo',
  orientation: 'horizontal',
  page: 1,
  onPage: 40,
  safe: true,
};

let searchMatches = 0;

function fetchPictures() {
  fetch(
    `${URL}/?${API_KEY}&q=${search.query}&image_type=${search.type}&orientation=${search.orientation}&safesearch=${search.safe}&page=${search.page}&per_page=${search.onPage}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then(pictures => {
      if (pictures.hits.length > 0) {
        if (search.page === 1) {
          console.log(`Hooray! We found ${pictures.totalHits} images`);
          console.log(`page number ${search.page} is loaded`);
        }
        renderImageCard(pictures);
        searchMatches += pictures.hits.length;
        console.log(
          `${searchMatches} photos are delivered out of ${pictures.totalHits} allowed per one query.`
        );
        if (searchMatches < pictures.totalHits) {
          setTimeout(showButton, 1500);
        } else {
          hideButton();
          console.log(
            "We're sorry, but you've reached the end of search results."
          );
          refs.searchForm.reset();
        }
      } else {
        console.log('no pictures found!');
        hideButton();
        refs.searchForm.reset();
      }
    })
    .catch(error => {
      if (error.message === 'Request failed with status 400') {
        console.log(
          "We're sorry, but you've reached the end of search results."
        );
        hideButton();
        refs.searchForm.reset();
      } else if (error.message === 'Failed to fetch') {
        console.log(
          'Internet connection is lost. Please try again as soon as your connection is restored'
        );
      } else {
        console.error('An error occurred: ', error.message);
        hideButton();
        refs.searchForm.reset();
      }
    });
}

function renderImageCard(pictures) {
  pictures.hits.forEach(hit =>
    refs.galleryWrapper.insertAdjacentHTML('beforeend', markupImageCard(hit))
  );
  const imageCards = Array.from(refs.galleryWrapper.children);
  const columnNumber = 4;
  imageCards.forEach(card => {
    card.style.width = `calc((100% - ${
      columnNumber - 1
    } * 10px) / ${columnNumber})`;
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'flex-end';
    card.style.boxShadow =
      '0px 2px 1px 0px rgba(46, 47, 66, 0.08),0px 1px 1px 0px rgba(46, 47, 66, 0.16),0px 1px 6px 0px rgba(46, 47, 66, 0.08)';
    card.style.borderRadius = '0 0 5px 5px';
    const infoContainer = card.querySelector('.info');
    const infoItems = card.querySelectorAll('.info-item');
    // console.log(infoItems);
    infoContainer.style.display = 'flex';
    infoContainer.style.justifyContent = 'space-around';
    infoContainer.style.padding = '10px';
    infoItems.forEach(item => {
      item.style.display = 'flex';
      item.style.flexDirection = 'column';
      item.style.alignItems = 'center';
    });
  });
}

function markupImageCard(element) {
  return `<div class="photo-card">
        <img src="${element['webformatURL']}" alt="${element['tags']}" width="100%" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b>${element['likes']}
            </p>
            <p class="info-item">
                <b>Views</b>${element['views']}
            </p>
            <p class="info-item">
                <b>Comments</b>${element['comments']}
            </p>
            <p class="info-item">
                <b>Downloads</b>${element['downloads']}
            </p>
        </div>
    </div>`;
}

function handleSubmit(event) {
  event.preventDefault();
  if (search.query !== refs.searchInput.value) {
    hideButton();
    refs.galleryWrapper.innerHTML = '';
    search.query = refs.searchInput.value;
    if (search.query.trim() !== '') {
      search.page = 1;
      searchMatches = 0;
      fetchPictures();
    } else {
      console.log('Please fill in search field!');
    }
  }
}

function loadMore() {
  search.page += 1;
  console.log(`page number ${search.page} is loaded`);
  fetchPictures();
}

refs.searchForm.addEventListener('submit', handleSubmit);
refs.loadMoreButton.addEventListener('click', loadMore);

hideButton();