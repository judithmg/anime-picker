/* eslint-disable camelcase */
const CATEGORIES = {
  1: "Action",
  2: "Adventure",
  3: "Cars",
  4: "Comedy",
  5: "Dementia",
  6: "Demons",
  7: "Mystery",
  8: "Drama",
  9: "Ecchi",
  10: "Fantasy",
  11: "Game",
  35: "Harem",
  12: "Hentai",
  13: "Historical",
  14: "Horror",
  15: "Kids",
  16: "Magic",
  42: "Josei",
  17: "Martial Arts",
  18: "Mecha",
  38: "Military",
  19: "Music",
  20: "Parody",
  39: "Police",
  40: "Psychological",
  21: "Samurai",
  41: "Seinen",
  22: "Romance",
  23: "School",
  24: "Sci",
  25: "Shoujo",
  26: "Shoujo Ai",
  27: "Shounen",
  28: "Shounen Ai",
  36: "Slice of Life",
  29: "Space",
  30: "Sports",
  31: "Super Power",
  37: "Supernatural",
  32: "Vampire",
  33: "Yaoi",
  34: "Yuri",
};

const URLS = {
  base: "https://api.jikan.moe/v3/search/anime?q=",
  category: "&genre=",
  limit: "&limit=10",
  page: "&page=",
};

const searchArr = [];
const selectedCategories = [];
const page = {
  next: 1,
  popular: 1,
  airing: 1,
};

function fetchSingleAnime(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {});
}

// searchAnimeByCategory('https://api.jikan.moe/v3/search/anime?q=&genre=1,10')

function getAnimeLink(link) {
  const { self } = link;
  return self;
}

function printImages(img, id, title) {
  const body = document.querySelector(".main__results");
  const container = document.createElement("div");
  const pic = document.createElement("img");
  const text = document.createElement("p");
  const aElement = document.createElement("a");
  text.innerText = title;
  pic.src = img;
  pic.classList.add("fetched-pics");
  container.classList.add("fetched-container");
  text.classList.add("fetched-title");
  aElement.href = generateUrl(id);
  const url = generateUrl(id);
  aElement.appendChild(pic);
  container.appendChild(aElement);
  container.appendChild(text);
  body.appendChild(container);
}

function printButtons(list) {
  const btnContainer = document.createElement("div");
  const catContainer = document.createElement("div");
  btnContainer.classList.add("button__container");
  catContainer.classList.add("category__container");
  const body = document.querySelector("body");
  body.appendChild(btnContainer);
  btnContainer.appendChild(catContainer);
  Object.entries(list)
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map((el) => {
      const btn = document.createElement("button");
      btn.classList.add("btn-cat");
      btn.addEventListener("click", getBtnCategory);
      btn.addEventListener("click", printCategories);
      btn.addEventListener("click", changeBtnClass);
      btn.value = el[0];
      btn.innerText = el[1];
      catContainer.append(btn);
    });
}

function printSearchButton() {
  const btnContainer = document.createElement("div");
  const body = document.querySelector(".button__container");
  const btn = document.createElement("button");
  btn.classList.add("btn-picker");
  btnContainer.classList.add("btn-picker__container");
  btn.innerText = "PICK SOME ANIME 4ME";
  btn.addEventListener("click", () => {
    searchAnimeByCategory(buildSearchUrl(1));
  });

  body.appendChild(btnContainer);
  btnContainer.appendChild(btn);
}

function getBtnCategory() {
  const category = this.value;
  const index = searchArr.indexOf(category);
  if (index > -1) {
    searchArr.splice(index, 1);
  } else {
    searchArr.push(category);
  }
  return searchArr;
}

function printCategories() {
  const category = this.innerText;
  const index = selectedCategories.indexOf(category);
  if (index > -1) {
    selectedCategories.splice(index, 1);
  } else {
    selectedCategories.push(category);
  }
  return selectedCategories;
}

function changeBtnClass() {
  if (this.classList.contains("btn-active")) {
    this.classList.remove("btn-active");
  } else {
    this.classList.add("btn-active");
  }
}

function buildSearchUrl(page) {
  const searchStr = searchArr.reduce((acc, cat) => `${acc},${cat}`);
  return URLS.base + URLS.category + searchStr + URLS.limit + URLS.page + page;
}

function printPageButtons() {
  const btnContainer = document.createElement("div");
  const body = document.querySelector(".main__results");
  body.appendChild(btnContainer);
  const next = document.createElement("button");
  next.addEventListener("click", () => nextPage(page));
  next.innerText = "SHOW MORE";
  next.classList.add("btn-next");
  btnContainer.appendChild(next);
}

function buildSearchUrlError(page) {
  const searchStr = searchArr[0];
  return URLS.base + URLS.category + searchStr + URLS.limit + URLS.page + page;
}

function searchAnimeByCategory(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { results } = data;
      results.forEach((anime) => {
        const { image_url, mal_id, title } = anime;
        printImages(image_url, mal_id, title);
      });
      printPageButtons();
    })
    .catch(() => {
      searchAnimeByCategory(buildSearchUrlError(page.next));
    });
}

function generateUrl(id) {
  return `./details/anime_details.html?id=${id}`;
}

function nextPage(counter) {
  counter.next += 1;
  const btn = document.querySelector(".btn-next");
  btn.remove();
  searchAnimeByCategory(buildSearchUrl(counter.next));
}

function randomizer(min, max) {
  return Math.random() * (max - min) + min;
}

function printAiringPics(img, id, title) {
  const body = document.querySelector(".airing-container");
  const container = document.createElement("div");
  const pic = document.createElement("img");
  const text = document.createElement("p");
  const aElement = document.createElement("a");
  text.innerText = title;
  container.classList.add("fixpics-container");
  text.classList.add("fix-title");
  pic.src = img;
  pic.classList.add("airing-pic");
  aElement.href = generateUrl(id);
  aElement.appendChild(pic);
  container.appendChild(aElement);
  container.appendChild(text);
  body.appendChild(container);
}

function printPopularPics(img, id, title) {
  const body = document.querySelector(".popular-container");
  const container = document.createElement("div");
  const pic = document.createElement("img");
  const text = document.createElement("p");
  const aElement = document.createElement("a");
  text.innerText = title;
  container.classList.add("fixpics-container");
  text.classList.add("fix-title");
  pic.src = img;
  pic.classList.add("popular-pic");
  aElement.href = generateUrl(id);
  aElement.appendChild(pic);
  container.appendChild(aElement);
  container.appendChild(text);
  body.appendChild(container);
}

function animesAiring() {
  fetch(
    `https://api.jikan.moe/v3/search/anime?q=&status=airing&order_by=members&sort=desc&limit=20&page=${page.airing}`
  )
    .then((response) => response.json())
    .then((data) => {
      const { results } = data;
      results.forEach((anime) => {
        const { image_url, mal_id, title } = anime;
        printAiringPics(image_url, mal_id, title);
      });
    });
}
function animesPopular() {
  fetch(
    `https://api.jikan.moe/v3/search/anime?q=&status=completed&order_by=members&sort=desc&limit=20&page=${page.popular}`
  )
    .then((response) => response.json())
    .then((data) => {
      const { results } = data;
      results.forEach((anime) => {
        const { image_url, mal_id, title } = anime;
        printPopularPics(image_url, mal_id, title);
      });
    });
}

function printSearchBox() {
  const container = document.querySelector(".nav__search-results");
  const boxResults = document.createElement("ul");
  boxResults.classList.add("search__list");
  container.appendChild(boxResults);
}

function printSearchResults(title, id) {
  const container = document.querySelector(".search__list");
  const anchor = document.createElement("a");
  const li = document.createElement("li");
  li.innerText = title;
  anchor.href = generateUrl(id);
  anchor.appendChild(li);
  container.appendChild(anchor);
}

function searchOption() {
  const searchStr = document.querySelector(".search-value").value;
  fetch(`https://api.jikan.moe/v3/search/anime?q=${searchStr}&limit=10&page=1`)
    .then((response) => response.json())
    .then((data) => {
      printSearchBox();
      const { results } = data;
      results.forEach((anime) => {
        const { title, mal_id } = anime;
        printSearchResults(title, mal_id);
      });
    });
}

printButtons(CATEGORIES);
printSearchButton();
animesPopular();
animesAiring();

window.onload = function () {
  const body = document.querySelector("body");
  body.addEventListener("click", () => {
    const container = document.querySelector(".search__list");
    if (container) {
      container.remove();
    }
  });
};
document.querySelector(".search-value").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchOption();
  }
  if (event.keyCode === 8) {
    const container = document.querySelector(".search__list");
    if (container) {
      container.remove();
    }
  }
});

document.querySelector(".btn-picker").addEventListener("click", () => {
  const body = document.querySelector(".main__results");
  body.innerHTML = "";
});
