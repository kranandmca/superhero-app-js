const search = document.getElementById('searchItem');
const mainDiv = document.getElementById('main');
const searchDiv = document.getElementById('searchDiv');
search.addEventListener('keyup', filterhero);

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

const showSearchList = (data) => {
  searchDiv.innerHTML = '';
  data.forEach((dataItem) => {
    const superheroImg =
      dataItem.thumbnail.path + '.' + dataItem.thumbnail.extension;
    const superheroName = dataItem.name;
    searchDiv.innerHTML += `
    <div class="card" style="width: 10rem;margin:0.5rem ">
    <img src=${superheroImg} class="card-img-top" alt="..." />
    <div class="card-body" id="output">
    <h5 class="card-title">${superheroName}</h5>
    <a href="#" class="btn btn-info"><i class="fa-regular fa-eye"></i></a>
    <a id="favorite"   href="#" class="btn btn-info"><i class="fa-regular fa-heart"></i></a>
    </div>
  </div>
  `;
  });
};
