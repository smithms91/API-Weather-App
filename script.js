$(document).ready(() => {

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log(":(");
    }
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude; 
    $.get(`http://api.wunderground.com/api/296d02426388fc32/conditions/q/${lat},${long}.json`).then((data) => {
      let fullLocation = data.current_observation.display_location.full;
      let temp = data.current_observation.temp_f;
      let logo = data.current_observation.local_time_rfc822;
      let tag = ["Go outside! It's a beautiful day!", "It's a little chilly, grab a jacket!", "It's freezing stay inside!"];
      let logos = ["img/rain.png","img/rainy_sunny.png","img/sunny.png","img/thunderstorms.png","img/windy-weather.png", "img/partly_sunny.svg"];

      if (temp >= 75) {
        weather(fullLocation, temp, logos[2], tag[0]);
      } else if (temp >= 50) {
        weather(fullLocation, temp, logos[5], tag[1]);
      } else {
        weather(fullLocation, temp, logos[0], tag[2]);
      }
      console.log(data);
    })
  }

  function weather(fullLocation, temp, logos, tag) {
    $("#weather").html(`
        <h2 class="header">${fullLocation}</h2>
        <h1 class="temp">${temp}&#8457;</h1>
        <img src="${logos}" class="logo">
        <p class="tag">${tag}</p>
    `)
  }
  
  getLocation();
  

})

