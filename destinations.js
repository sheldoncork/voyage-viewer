addEventListener("DOMContentLoaded", () => {
  generateCards();
});

function getData(location = "./data.json") {
  return new Promise((resolve, reject) => {
    fetch(location)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

async function generateCards() {
  let destinations;
  try {
    destinations = await getData();
  } catch (e) {
    console.error(e);
  }

  let cards = document.getElementById("cards");

  destinations.locations.forEach((location) => {
    let addCard = document.createElement("div");
    addCard.classList.add("col");
    addCard.innerHTML = `
        <div class="card shadow-sm">
            <img src=${location.image} class="card-img-top" alt="..."></img>
            <div class="card-body">
                <p class="card-text"> <strong>${location.location}</strong></p>
                <p ckass="card-text">${location.description}</p>
                <button>See more</button>
            </div>
        </div>
    `;
    cards.appendChild(addCard);
  });
}
