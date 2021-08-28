let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => json.forEach( toy => createToy(toy)));

  const toyCollection = document.getElementById('toy-collection')
  
  createToy = (toy) => {
      const div = document.createElement('div');
        div.classList.add('card');
      const h2 = document.createElement('h2');
        h2.textContent = toy.name;
      const img = document.createElement('img');
        img.classList.add('toy-avatar');
        img.src = toy.image;
      const p = document.createElement('p');
        p.textContent = toy.likes;
      const button = document.createElement('button');
        button.classList.add('like-btn')
        button.textContent = 'like <3';
      const toyAttributes = [h2, img, p, button];
      toyAttributes.forEach( element => div.appendChild(element));
      toyCollection.appendChild(div);
  };

  const addToyForm = document.querySelector('.add-toy-form')
  
  addToyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget; 
    const data = new FormData(form);
    data.append('likes', 0)
    form.reset();
    const entries = Object.fromEntries(data);
    const entriesToJson = JSON.stringify(entries);
    addToyToDb(entriesToJson)
      .then(response => response.json())
      .then(toy => createToy(toy));
    console.log(entriesToJson);
  });

  addToyToDb = (newToy) => {
    return fetch('http://localhost:3000/toys', {
	    method: 'POST',
	    body: newToy,
	    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
  };

});