function generateUrl(id) {
  return `https://api.jikan.moe/v3/anime/${id}`;
}

function printRecsImages(img, id) {
  const container = document.querySelector('.img-recs__container');
  const pic = document.createElement('img');
  const aElement = document.createElement('a');
  pic.src = img;
  pic.classList.add('random-pic');
  aElement.href = generateUrl(id);
  aElement.appendChild(pic);
  container.appendChild(aElement);
}

// randomizer
