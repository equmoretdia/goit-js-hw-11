const e={body:document.querySelector("body"),searchForm:document.querySelector(".search-form"),searchInput:document.querySelector(".search-form input"),searchButton:document.querySelector(".search-form button"),galleryWrapper:document.querySelector(".gallery"),loadMoreButton:document.querySelector(".load-more")};function o(){e.loadMoreButton.style.visibility="hidden"}function t(){e.loadMoreButton.style.visibility="visible"}e.body.style.fontFamily="Calibri, sans-serif",e.body.style.fontSize="12px",e.body.style.margin="0",e.body.style.paddingTop="60px",e.body.style.backgroundColor="#EAF1FA",e.searchForm.style.display="flex",e.searchForm.style.justifyContent="center",e.searchForm.style.position="fixed",e.searchForm.style.top="0px",e.searchForm.style.left="0px",e.searchForm.style.right="0px",e.searchForm.style.padding="10px 0",e.searchForm.style.backgroundColor="#73A0DB",e.searchInput.style.padding="10px 5px",e.searchInput.style.border="1px solid #255391",e.searchInput.style.borderRadius="5px",e.searchButton.style.padding="10px 15px",e.searchButton.style.backgroundColor="#255391",e.searchButton.style.color="#ffffff",e.searchButton.style.border="1px solid #ffffff",e.searchButton.style.borderRadius="5px",e.galleryWrapper.style.display="flex",e.galleryWrapper.style.alignContent="center",e.galleryWrapper.style.flexWrap="wrap",e.galleryWrapper.style.gap="10px",e.galleryWrapper.style.padding="0 5px 10px",e.loadMoreButton.style.display="block",e.loadMoreButton.style.margin="0 auto 10px",e.loadMoreButton.style.padding="10px 15px",e.loadMoreButton.style.backgroundColor="#255391",e.loadMoreButton.style.color="#ffffff",e.loadMoreButton.style.border="1px solid #255391",e.loadMoreButton.style.borderRadius="5px";const r={query:null,type:"photo",orientation:"horizontal",page:1,onPage:40,safe:!0};let s=0;function l(){fetch(`https://pixabay.com/api/?key=40252258-b27561441daedadb4fc814a5c&q=${r.query}&image_type=${r.type}&orientation=${r.orientation}&safesearch=${r.safe}&page=${r.page}&per_page=${r.onPage}`).then((e=>{if(!e.ok)throw new Error(`Request failed with status ${e.status}`);return e.json()})).then((l=>{l.hits.length>0?(1===r.page&&(console.log(`Hooray! We found ${l.totalHits} images`),console.log(`page number ${r.page} is loaded`)),function(o){o.hits.forEach((o=>{return e.galleryWrapper.insertAdjacentHTML("beforeend",`<div class="photo-card">\n        <img src="${(t=o).webformatURL}" alt="${t.tags}" width="100%" loading="lazy" />\n        <div class="info">\n            <p class="info-item">\n                <b>Likes</b>${t.likes}\n            </p>\n            <p class="info-item">\n                <b>Views</b>${t.views}\n            </p>\n            <p class="info-item">\n                <b>Comments</b>${t.comments}\n            </p>\n            <p class="info-item">\n                <b>Downloads</b>${t.downloads}\n            </p>\n        </div>\n    </div>`);var t}));const t=Array.from(e.galleryWrapper.children),r=4;t.forEach((e=>{e.style.width=`calc((100% - ${r-1} * 10px) / ${r})`,e.style.display="flex",e.style.flexDirection="column",e.style.justifyContent="flex-end",e.style.boxShadow="0px 2px 1px 0px rgba(46, 47, 66, 0.08),0px 1px 1px 0px rgba(46, 47, 66, 0.16),0px 1px 6px 0px rgba(46, 47, 66, 0.08)",e.style.borderRadius="0 0 5px 5px";const o=e.querySelector(".info"),t=e.querySelectorAll(".info-item");o.style.display="flex",o.style.justifyContent="space-around",o.style.padding="10px",t.forEach((e=>{e.style.display="flex",e.style.flexDirection="column",e.style.alignItems="center"}))}))}(l),s+=l.hits.length,console.log(`${s} photos are delivered out of ${l.totalHits} allowed per one query.`),s<l.totalHits?setTimeout(t,1500):(o(),console.log("We're sorry, but you've reached the end of search results."),e.searchForm.reset())):(console.log("no pictures found!"),o(),e.searchForm.reset())})).catch((t=>{"Request failed with status 400"===t.message?(console.log("We're sorry, but you've reached the end of search results."),o(),e.searchForm.reset()):"Failed to fetch"===t.message?console.log("Internet connection is lost. Please try again as soon as your connection is restored"):(console.error("An error occurred: ",t.message),o(),e.searchForm.reset())}))}e.searchForm.addEventListener("submit",(function(t){t.preventDefault(),r.query!==e.searchInput.value&&(o(),e.galleryWrapper.innerHTML="",r.query=e.searchInput.value,""!==r.query.trim()?(r.page=1,s=0,l()):console.log("Please fill in search field!"))})),e.loadMoreButton.addEventListener("click",(function(){r.page+=1,console.log(`page number ${r.page} is loaded`),l()})),o();
//# sourceMappingURL=index.f83a7f68.js.map
