const place = document.querySelector(".place");
const summary = document.querySelector(".summary");
const temperature = document.querySelector(".temperature");
const measure = document.querySelector("#measure");
const unit = document.querySelector(".unit");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const weatherIcon = document.querySelector("#weather-icon");
// set lat lng for the first one staticly it's for tunisia
const tunisLat = 36.800108;
const tunisLng = 10.184794;
const input = document.querySelector("#search-input");
input.value = "Tunis";

// sent a request to the darsky api for the weather with lat and lng
weatherData(tunisLat, tunisLng);

// the automatic api search for the input
window.onload = function () {
  let placesAutocomplete = placeSearch({
    key: "lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24",
    // the container attribute is for the element who's responsible for the event
    container: input,
    // collection attribute is for places to search for aeroport,adress,adminArea,cities....
    collection: ["address", "adminArea", "poi"],
    // the limit is the max showing results in the result div below the input
    limit: 6,
  });
  //  this is for the slection event ,if anything selected you take it with this event
  // and you have an object with all the data
  placesAutocomplete.on("change", function (e) {
    let lat = e.result.latlng.lat;
    let lng = e.result.latlng.lng;
    weatherData(lat, lng);
    place.innerText = e.result.value;
  });
};

// this is for changing from Celsius to frenheit and vice-versa
measure.addEventListener("click", () => {
  if (unit.innerText === "F") {
    unit.innerText = "C ْ";
    temperature.innerText = ((+temperature.innerText - 32) * (5 / 9)).toFixed(
      2
    );
  } else {
    unit.innerText = "F";
    temperature.innerText = (+temperature.innerText * (9 / 5) + 32).toFixed(2);
  }
});

function weatherData(lat, lng) {
  fetch("/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ lat: lat, lng: lng }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      summary.innerText = res.summary;
      humidity.innerText = res.humidity + " %";
      temperature.innerText = res.temperature;
      pressure.innerText = res.pressure + " Pa";
      weatherIcon.src = res.icon;
    });
}
