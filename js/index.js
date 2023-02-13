const timeStamp = '1640717903935';
const apiKey = 'fbaa46b0c09a2703c7e247764cda66f6';
const hash = 'cd07a618bf10905245ca5217773722a2';
let main = document.querySelector('#main');
const loader = document.querySelector('.spinner-border');

// Fetch superhero list
const getSuperheroList = async () => {
  main.style.display = 'none';
  const response = await fetch(
    'https://gateway.marvel.com/v1/public/characters?ts=1640717903935&apikey=fbaa46b0c09a2703c7e247764cda66f6&hash=cd07a618bf10905245ca5217773722a2'
  );
  const superheroList = await response.json();
  localStorage.setItem(
    'superheros',
    JSON.stringify(superheroList.data.results)
  );
  superheroList.data.results.forEach((superhero) => {
    const superheroImg =
      superhero.thumbnail.path + '.' + superhero.thumbnail.extension;
    const superheroName = superhero.name;

    appendSuperheroToList(superheroImg, superheroName);
    loader.style.display = 'none';
    main.style.display = 'flex';
  });
};
getSuperheroList();
function appendSuperheroToList(superheroImg, superheroName) {
  main.innerHTML += `
  <div class="card" style="width: 10rem;margin:0.5rem ">
  <img src=${superheroImg} class="card-img-top" alt="..." />
  <div class="card-body" id="output">
  <h5 class="card-title">${superheroName}</h5>
  <a href="#" class="btn btn-info"><i class="fa-regular fa-eye"></i></a>
  <a id="favorite" style="display:none"  href="#" class="btn btn-info"><i class="fa-regular fa-heart"></i></a>
  </div>
</div>
`;
}
