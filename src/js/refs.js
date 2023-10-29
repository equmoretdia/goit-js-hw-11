export default function getRefs() {
  return {
    body: document.querySelector('body'),
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-form input'),
    searchButton: document.querySelector('.search-form button'),
    galleryWrapper: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
  };
}
