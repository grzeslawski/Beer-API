let numberOfPage = 0;
const numbersOfBeers = 4;

const container = document.querySelector(".container");
const loadMoreButton = document.querySelector("#load-more");

const render = (data) => {
  if (!data.length) return;
  const fragment = document.createDocumentFragment();
  data.forEach(({ name, tagline, description, image_url: imageURL }) => {
    const div = document.createElement("div");
    div.classList.add("beer");
    div.innerHTML = `
    <div class="beer__image">
    <img src="${imageURL}">
    </div>
    <div class="beer__content">
        <h1 class="beer__title">${name}</h1>
        <p class="beer__tagline">${tagline}</p>
        <p class="beer__description">${description}</p>
    </div>
    `;
    fragment.appendChild(div);
  });

  container.appendChild(fragment);
};

const success = (response) => response.json();

const error = (err) => {
  console.log(err);
};

function loadMoreBeers() {
  numberOfPage++;
  const API_URL = `https://api.punkapi.com/v2/beers?page=${numberOfPage}&per_page=${numbersOfBeers}`;
  fetch(API_URL).then(success).then(render).catch(error);
}

loadMoreBeers();
loadMoreButton.addEventListener("click", loadMoreBeers);
