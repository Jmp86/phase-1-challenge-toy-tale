let addToy = false;
const toyCollection = document.getElementById("toy-collection")
const newToyForm = document.querySelector('.add-toy-form')
const inputText = document.querySelectorAll('input')


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
 
})
  


 function renderCards () {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then((toy) => {
      toy.forEach((card) => {
        createCard(card)
      })      
  })
 }

 renderCards()
  
function createCard(card) {
  const newCard = document.createElement("div")
  const hTag = document.createElement('h2')
  let pTag = document.createElement('p')
  const btnTag = document.createElement('button')
  const imgTag = document.createElement('img')
  btnTag.classList.add('like-btn')
  imgTag.classList.add('toy-avatar')
  newCard.classList.add('card')
  btnTag.id = card.id
  imgTag.src = card.image
  pTag.innerText = card.likes
  btnTag.innerText = 'like'
  hTag.innerText = card.name
  const toyId = card.id
  let toyLikes = card.likes
  // console.log(toyLikes)
  btnTag.addEventListener('click', (e) => {
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": ++toyLikes
      })
      
    })
    .then(res => res.json())
    .then((like) => {
      pTag.innerText = toyLikes
    })
  })
  newCard.append(hTag, imgTag, pTag, btnTag)
  toyCollection.appendChild(newCard)

}


const addNewToy = newToyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": inputText[0].value,
      "image": inputText[1].value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(function(object) {
    createCard(object)
})
})
  
  


