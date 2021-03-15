/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable camelcase */
function parseIdFromLocation(currentLocation) {
  const idFromLocation = currentLocation.search;
  const idWithoutQuestionMark = idFromLocation.replace("?", "");
  const searchMatrix = idWithoutQuestionMark.split("&");
  const idQuery = searchMatrix.find((item) => item.includes("id"));

  const id = idQuery && idQuery.split("=")[1];
  return +id;
}

function printAnimePics(pictures) {
  const container = document.querySelector(".img__container");
  let counter = 0;
  if (pictures) {
    pictures.forEach((pic) => {
      if (counter < 3) {
        const img = document.createElement("img");
        img.src = pic.large;
        img.classList.add("anime-pic");
        counter += 1;
        container.appendChild(img);
      }
    });
  }
}
function generatePicsUrl(id) {
  return `https://api.jikan.moe/v3/anime/${id}/pictures`;
}

function fetchPics(id) {
  fetch(generatePicsUrl(id))
    .then((response) => response.json())
    .then((pics) => {
      console.log(pics);
      const { pictures } = pics;
      printAnimePics(pictures);
    });
}

function generateAnimeUrl(id) {
  return `https://api.jikan.moe/v3/anime/${id}`;
}

function printTitle(title) {
  const main = document.querySelector("main");
  const info = document.createElement("div");
  info.classList.add("info__container");
  const titles = document.createElement("div");
  titles.classList.add("title__container");
  main.appendChild(info);
  info.appendChild(titles);
  const p = document.createElement("p");
  p.innerText = title;
  p.classList.add("title");

  titles.appendChild(p);
}
function printTitleJap(title_japanese) {
  const titles = document.querySelector(".title__container");
  const p = document.createElement("p");
  p.innerText = title_japanese;
  p.classList.add("title-jap");
  titles.appendChild(p);
}

function printSynopsis(synopsis) {
  const main = document.querySelector(".info__container");
  const info = document.createElement("div");
  info.classList.add("syn__container");
  main.appendChild(info);
  const p = document.createElement("p");
  p.innerText = synopsis;
  p.classList.add("synopsis");
  info.appendChild(p);
}
function printStatus(status) {
  const info = document.querySelector(".numbers__container");
  const p = document.createElement("p");
  p.innerText = status;
  p.classList.add("status");

  info.appendChild(p);
}

function printRating(rating) {
  const main = document.querySelector(".info__container");
  const info = document.createElement("div");
  info.classList.add("numbers__container");
  main.appendChild(info);

  const p = document.createElement("p");
  p.innerText = rating;
  p.classList.add("rating");

  info.appendChild(p);
}
function printEpisodes(episodes) {
  const info = document.querySelector(".numbers__container");
  const p = document.createElement("p");
  p.innerText = `${episodes} episodes`;
  p.classList.add("episodes");

  info.appendChild(p);
}
function printScore(score) {
  const info = document.querySelector(".numbers__container");
  const p = document.createElement("p");
  p.innerText = `Score: ${score}`;
  p.classList.add("score");

  info.appendChild(p);
}

function printGenres(genres) {
  const main = document.querySelector(".info__container");
  const info = document.createElement("div");
  info.classList.add("genres__container");
  const h2 = document.createElement("h2");
  h2.innerText = "Genres:";
  main.appendChild(info);
  info.appendChild(h2);
  genres.forEach((el) => {
    const p = document.createElement("p");
    p.innerText = el.name;
    p.classList.add("genre");

    info.appendChild(p);
  });
}
function generateUrl(id) {
  return `./details/anime_details.html?id=${id}`;
}

function printRecsImages(img, id) {
  const container = document.querySelector(".img-recs__slider");
  const pic = document.createElement("img");
  const aElement = document.createElement("a");
  pic.src = img;
  pic.classList.add("random-pic");
  aElement.href = generateUrl(id);
  aElement.appendChild(pic);
  container.appendChild(aElement);
}

function selectRandomFromArray(array) {
  return Math.floor(Math.random() * array.length);
}

function randomizer(min, max) {
  return Math.random() * (max - min) + min;
}

function moreLikeThis(genres) {
  const randomNumber = selectRandomFromArray(genres);
  console.log(genres);
  const genre = genres[randomNumber].mal_id;
  fetch(
    `https://api.jikan.moe/v3/search/anime?q=&genre=${genre}&order_by=members&sort=desc&limit=15&page=${randomizer(
      1,
      5
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      const { results } = data;
      console.log(results);
      const info = document.querySelector(".info__container");
      const container = document.createElement("div");
      container.classList.add("img-recs__container");
      const slider = document.createElement("div");
      slider.classList.add("img-recs__slider");
      const h2 = document.createElement("h2");
      h2.innerText = "MORE LIKE THIS ONE";
      info.appendChild(container);
      container.appendChild(h2);
      container.appendChild(slider);
      results.forEach((anime) => {
        const { image_url, mal_id } = anime;
        printRecsImages(image_url, mal_id);
      });
    });
}

function animeDetail(url) {
  fetch(url)
    .then((response) => response.json())
    .then((anime) => {
      const {
        status,
        episodes,
        score,
        synopsis,
        title,
        title_japanese,
        trailer_url,
        rating,
        genres,
      } = anime;
      console.log(anime);
      console.log(
        status,
        episodes,
        score,
        synopsis,
        title,
        title_japanese,
        trailer_url,
        rating,
        genres
      );

      printTitle(title);
      printTitleJap(title_japanese);
      printRating(rating);
      printScore(score);
      printStatus(status);
      printEpisodes(episodes);
      printSynopsis(synopsis);
      if (genres) {
        printGenres(genres);
        moreLikeThis(genres);
      }
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

const THISID = parseIdFromLocation(location);
fetchPics(THISID);
animeDetail(generateAnimeUrl(parseIdFromLocation(location)));
