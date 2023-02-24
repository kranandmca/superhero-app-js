const timeStamp = '1640717903935';
const apiKey = 'fbaa46b0c09a2703c7e247764cda66f6';
const hash = 'cd07a618bf10905245ca5217773722a2';
let main = document.querySelector('#hero');
let info = document.querySelector('#info');
const loader = document.querySelector('.spinner-border');

// Fetch  superhero list
const getSuperhero = async () => {
  main.style.display = 'none';
  loader.style.display = 'block';
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}?ts=1640717903935&apikey=fbaa46b0c09a2703c7e247764cda66f6&hash=cd07a618bf10905245ca5217773722a2`
  );
  const superheroList = await response.json();
  superheroList.data.results.forEach((superhero) => {
    const superheroImg =
      superhero.thumbnail.path + '.' + superhero.thumbnail.extension;

    const superheroName = superhero.name;

    appendSuperheroFavList(
      superheroImg,
      superheroName,
      superhero.id,
      superhero
    );
  });

  loader.style.display = 'none';
  main.style.display = 'flex';
};
getSuperhero();
// Append html content for superhero
function appendSuperheroFavList(superheroImg, superheroName, id, superhero) {
  main.innerHTML += `
  <div  class="card" style="width: 15rem;margin:0.5rem;height:400px; ">
  <img src=${superheroImg} style="height:400px;" class="card-img-top" alt="..." />
  <div class="card-body" id=${id}>
  <h5 class="card-title">${superheroName}</h5>
  </div>
</div>
`;

  info.innerHTML += `
  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       Biography
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <div id="bio"></div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
       Comics
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse " aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body" >
      <ol id="comics"></ol>
       
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
       Series
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse " aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body" >
      <ol id="series"></ol>
       
      </div>
    </div>
  </div>

 

  <div class="accordion-item">
    <h2 class="accordion-header" id="headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
       Stories
      </button>
    </h2>
    <div id="collapseFour" class="accordion-collapse collapse " aria-labelledby="headingFour" data-bs-parent="#accordionExample">
      <div class="accordion-body" >
      <ol id="stories"></ol>
       
      </div>
    </div>
  </div>
  
    
   
  </div>
</div>
`;

  let bioList = document.getElementById('bio');
  bioList.innerHTML += `<h3>${superheroName}</h3><p>Comics: ${superhero.comics.available}</p><p>Series: ${superhero.series.available}</p><p>Stories: ${superhero.stories.available}</p><p>Events: ${superhero.events.available}</p>`;

  superhero.comics.items.forEach((comic) => {
    let comicList = document.getElementById('comics');
    comicList.innerHTML += `<li><p>${comic.name}</p></li>`;
  });
  superhero.series.items.forEach((series) => {
    let seriesList = document.getElementById('series');
    seriesList.innerHTML += `<li><p>${series.name}</p></li>`;
  });

  superhero.stories.items.forEach((stories) => {
    let storiesList = document.getElementById('stories');
    storiesList.innerHTML += `<li><p>${stories.name}</p></li>`;
  });
}
