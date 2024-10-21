window.addEventListener("DOMContentLoaded", initializePage);

function getData(path = "./data.json") {
  return new Promise((resolve, reject) => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function initializePage() {
  let destinations;
  try {
    destinations = await getData();
    createRandomDestinations(destinations);
    setupRandomLocationButton(destinations);
  } catch (e) {
    console.error(e);
  }
}

function createRandomDestinations(destinations) {
  let cards = document.getElementById("col");
  for (let i = 0; i < 2; i++) {
    let index = getRandomIndex(0, destinations.locations.length - 1);
    let location = destinations.locations[index];
    destinations.locations.splice(index, 1);

    let addCard = document.createElement("div");
    addCard.classList.add("col");
    addCard.innerHTML = `
          <div class="card shadow-sm">
              <img src=${location.image} class="card-img-top" alt="..."></img>
              <div class="card-body text-center">
                  <p class="card-text"> <strong>${location.location}</strong></p>
                  <p class="card-text">${location.description}</p>
                  <button class="learn btn btn-secondary" id="${location.id}">Learn more</button>
              </div>
          </div>
      `;
    cards.appendChild(addCard);
  }

  addButtonListeners();
}

function addButtonListeners() {
  let buttons = document.querySelectorAll(".learn");
  buttons.forEach((element) => {
    element.addEventListener("click", () => {
      sessionStorage.setItem("locationId", `${element.id}`);
      window.location.replace("./location.html");
    });
  });
}

function setupRandomLocationButton(destinations) {
  let randomButton = document.getElementById("randomCityButton");
  if (randomButton) {
    randomButton.addEventListener("click", () => {
      const randomIndex = getRandomIndex(0, destinations.locations.length - 1);
      const randomLocation = destinations.locations[randomIndex];
      sessionStorage.setItem("locationId", randomLocation.id);
      window.location.href = "./location.html";
    });
  }
}
