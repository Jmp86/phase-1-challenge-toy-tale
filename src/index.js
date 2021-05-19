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
  const likeBtn = toyCollection.getElementsByClassName('like-btn')
    
  // console.log(likeBtn)

function likedAmount(likes) {
  likeBtn.forEach(like => console.log(like))
}
//   likeBtn.addEventListener('click', (e) => {
//     e.forEach((id) => { 
//       console.log(id)
//     }) 
likedAmount()
});

  
  

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then((toy) => {
    toy.forEach((card) => {
      createCard(card)
    })
  })


function createCard(card) {
  const newCard = document.createElement("div")
  newCard.classList.add('card')
  newCard.innerHTML = `<h2>${card.name}</h2>
   <img class = "toy-avatar" src=${card.image}></img>
   <p>${card.likes}</p>
   <button class= "like-btn" id= "${card.id}">like</button>`
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
  .then(function(res) {
    return res.json();
})
  .then(function(object) {
    createCard(object)
})
})



  // fetch(`http://localhost:3000/toys/${button.id}`) 
  
    // method: "PATCH",
    // headers: {
    //   "Content-Type": "application/json",
    //   "Accept": "application/json"
    // },
    // body: JSON.stringify({
    //   "id": e.target.value
    // })

//   .then(function(object) {
//     createCard(object)
// })
// })

// fetch("http://localhost:3000/toys/10 ", {
//   method: 'DELETE',
// })
// .then(res => res.json())
// .then(console.log)

