window.addEventListener("DOMContentLoaded", pageLoaded);

function pageLoaded() {
  let display = document.getElementById("loc");
  let x = sessionStorage.getItem("locationId");
  display.innerHTML = x;
}
