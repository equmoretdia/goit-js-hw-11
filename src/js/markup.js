import getRefs from './refs';

const refs = getRefs();

const columnNumber = 4;

function preparePageStyles() {
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
}

function hideButton() {
  refs.loadMoreButton.style.visibility = 'hidden';
}

function showButton() {
  refs.loadMoreButton.style.visibility = 'visible';
}

function markupGalleryCard(element) {
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

function insertGalleryCard(hit) {
  return refs.galleryWrapper.insertAdjacentHTML(
    'beforeend',
    markupGalleryCard(hit)
  );
}

function prepareCardStyles(card) {
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
}

function renderGalleryCards(pictures) {
  pictures.hits.forEach(insertGalleryCard);
  const imageCards = Array.from(refs.galleryWrapper.children);
  imageCards.forEach(prepareCardStyles);
}

function cleanGallery() {
  refs.galleryWrapper.innerHTML = '';
}

export default {
  preparePageStyles,
  hideButton,
  showButton,
  renderGalleryCards,
  cleanGallery,
};
