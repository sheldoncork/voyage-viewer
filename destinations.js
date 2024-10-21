window.addEventListener("DOMContentLoaded", pageLoaded);

function getData(location = "./data.json") {
  return new Promise((resolve, reject) => {
    fetch(location)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function pageLoaded() {
  generateCards();
  document.getElementById("search-btn").addEventListener("click", search);
}

async function generateCards() {
  let destinations;
  try {
    destinations = await getData();
  } catch (e) {
    console.error(e);
  }

  createCards(destinations);
}

function createCards(array) {
  let cards = document.getElementById("cards");
  cards.innerHTML = "";

  array.locations.forEach((location) => {
    let addCard = document.createElement("div");
    addCard.classList.add("col");
    addCard.innerHTML = `
        <div class="card shadow-sm">
            <img src=${location.image} class="card-img-top" alt="..."></img>
            <div class="card-body text-center">
                <p class="card-text"> <strong>${location.location}</strong></p>
                <p ckass="card-text">${location.description}</p>
                <button class="learn btn btn-secondary" id="${location.id}">Learn more!</button>
            </div>
        </div>
    `;
    cards.appendChild(addCard);
  });

  //add button listeners
  let buttons = document.getElementsByClassName("learn");
  for (let element of buttons) {
    element.addEventListener("click", () => {
      sessionStorage.setItem("locationId", `${element.id}`);
      window.location.replace("./location.html");
    });
  }
}

async function search() {
  let sorted = await getData();
  let beach = document.getElementById("btncheck1").checked; //beach
  let mountain = document.getElementById("btncheck2").checked; //mountain
  let city = document.getElementById("btncheck3").checked; //city

  sorted.locations = sorted.locations.filter((element) => {
    if (beach === false && element.type === "Beach") {
      return false;
    }
    if (mountain === false && element.type === "Mountain") {
      return false;
    }
    if (city === false && element.type === "City") {
      return false;
    }
    return true; // Keep locations that match the checked options
  });

  createCards(sorted);
}
