const timeStamp = '1640717903935';
const apiKey = 'fbaa46b0c09a2703c7e247764cda66f6';
const hash = 'cd07a618bf10905245ca5217773722a2';
let main = document.querySelector('#favorite');
const loader = document.querySelector('.spinner-border');

// Fetch superhero list
const getFavList = async () => {
  let favs = getFavs();
  main.style.display = 'none';
  loader.style.display = 'block';
  for (let i = 0; i < favs.length; i++) {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${favs[i]}?ts=1640717903935&apikey=fbaa46b0c09a2703c7e247764cda66f6&hash=cd07a618bf10905245ca5217773722a2`
    );
    const superheroList = await response.json();
    superheroList.data.results.forEach((superhero) => {
      const superheroImg =
        superhero.thumbnail.path + '.' + superhero.thumbnail.extension;

      const superheroName = superhero.name;

      appendSuperheroFavList(superheroImg, superheroName, superhero.id);
    });
  }
  loader.style.display = 'none';
  main.style.display = 'flex';
};
getFavList();
function appendSuperheroFavList(superheroImg, superheroName, id) {
  main.innerHTML += `
  <div  class="card" style="width: 15rem;margin:0.5rem ">
  <img src=${superheroImg} class="card-img-top" alt="..." />
  <div class="card-body" id=${id}>
  <h5 class="card-title">${superheroName}</h5>
  <a onclick="removeFromFavourites(event);" class="btn btn-info favorite">Remove From Favorites</a>
  </div>
</div>
`;
}

// get a list of favs
function getFavs() {
  let favs;
  if (localStorage.getItem('favHeros') === null) {
    favs = [];
  } else {
    favs = JSON.parse(localStorage.getItem('favHeros'));
  }
  return favs;
}

// remove a hero from favourites
function removeFromFavourites(e) {
  let id = e.target.parentElement.id;
  let favs = getFavs();

  let updatedFavs = favs.filter(function (val) {
    return val != id;
  });
  localStorage.setItem('favHeros', JSON.stringify(updatedFavs));
  e.target.removeEventListener('click', removeFromFavourites);
  location.reload();
}
