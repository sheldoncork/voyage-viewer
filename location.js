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
}

async function generateCards() {
  let destinations;
  let x = sessionStorage.getItem("locationId");
  try {
    destinations = await getData();
  } catch (e) {
    console.error(e);
  }

  createCards(destinations, x);
}

function createCards(destinations, id) {
  let city = destinations.locations[id]
  let cards = document.getElementById("cards");
  document.getElementById('locationName').innerHTML = 'Welcome to ' + city.location + '!';
  cards.innerHTML = "";

  for (i = 0; i < 4; i++) {
    let addCard = document.createElement("div");
    addCard.classList.add("col");
    addCard.innerHTML = `
        <div class="card shadow-sm">
            <img src=${city.individualImages[i]} class="card-img-top" alt="..."></img>
            <div class="card-body text-center">
                <p ckass="card-text">${city.individualDescriptions[i]}</p>
            </div>
        </div>
    `;
    cards.appendChild(addCard);
    }
  }


