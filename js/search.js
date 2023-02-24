const search = document.getElementById('searchItem');
const mainDiv = document.getElementById('main');
const searchDiv = document.getElementById('searchDiv');
search.addEventListener('keyup', filterhero);

// Filter superhero
function filterhero() {
  mainDiv.style.display = 'none';
  loader.style.display = 'block';
  const searchItem = document.getElementById('searchItem').value;

  var str = searchItem.toLowerCase().substring(0, 3);
  const foundHero = JSON.parse(localStorage.getItem('superheros')).filter(
    (hero) => {
      return hero.name.toLowerCase().includes(str);
    }
  );
  if (searchItem.length == 0) {
    mainDiv.style.display = 'flex';
    searchDiv.innerHTML = '';
  }
  if (foundHero.length > 0) {
    loader.style.display = 'none';

    showSearchList(foundHero);
  } else {
    console.log('no results');
    loader.style.display = 'none';
    searchDiv.innerHTML = '';
  }
}

// Show Search result of super hero
const showSearchList = (data) => {
  let favs = getFavs();

  searchDiv.innerHTML = '';
  data.forEach((dataItem) => {
    const superheroImg =
      dataItem.thumbnail.path + '.' + dataItem.thumbnail.extension;
    const superheroName = dataItem.name;
    let id = dataItem.id;
    searchDiv.innerHTML += `
    <div   class="card"  style="width: 15rem;margin:0.5rem ">
    <div class="card-body" id=${id}>
    <img  id="imghero" src=${superheroImg}  onclick="superhero(event);" class="card-img-top" alt="..." />

    </div>
  </div>
  `;
    let option = document.getElementById(id);
    if (favs.includes(id.toString())) {
      option.innerHTML += ` <h5  class="heroname" class="card-title">${superheroName}</h5>
    <a onclick="removeFromFavourites(event);" class="btn btn-info favorite">Remove From Favorites</a>`;
    } else {
      option.innerHTML += ` <h5  class="heroname" class="card-title">${superheroName}</h5>
    <a onclick="addToFavourites(event);" class="btn btn-info favorite">Add to Favorites</a>`;
    }
  });
};

// Add to favorite superhero list
function addToFavourites(e) {
  let id = e.target.parentElement.id;
  let favs = getFavs();
  if (!favs.includes(id)) {
    favs.push(id);
  }
  localStorage.setItem('favHeros', JSON.stringify(favs));
  e.target.innerHTML = 'Remove from favourites';
  e.target.removeEventListener('click', addToFavourites);
  e.target.addEventListener('click', removeFromFavourites);
}

// remove a hero from favourites
function removeFromFavourites(e) {
  let id = e.target.parentElement.id;
  let favs = getFavs();

  let updatedFavs = favs.filter(function (val) {
    return val != id;
  });
  localStorage.setItem('favHeros', JSON.stringify(updatedFavs));
  e.target.innerHTML = 'Add to favourites';
  e.target.removeEventListener('click', removeFromFavourites);
  e.target.addEventListener('click', addToFavourites);
}

// retrieve a list of favourite hero id's from local storage
function getFavs() {
  let favs;
  if (localStorage.getItem('favHeros') === null) {
    favs = [];
  } else {
    favs = JSON.parse(localStorage.getItem('favHeros'));
  }
  return favs;
}

// go to superhero page on click
function superhero(e) {
  let id = e.target.parentElement.id;

  location.href = 'superhero.html?id=' + id;
}
