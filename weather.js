const API_KEY = "97b0733c51d4d504537dc0c840735650";
const weather = document.querySelector(".weather");

function getWeather(lat, long){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`).then(function(resp){
        return resp.json();
    }).then(function(json){
        const temperture = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperture}℃  ${place}`;
    });
}


function success(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locationsObj = {
        latitude,
        longitude
    };
    localStorage.setItem("location",JSON.stringify(locationsObj));
    getWeather(latitude,longitude);
}

function askLocation(){
  navigator.geolocation.getCurrentPosition(success,function(error){
    alert("좀 해주징 ㅜ3ㅜ");
  });  
}

function loadWeather(){
    const loadLoc = localStorage.getItem("location");

    if(loadLoc === null){
        askLocation();
    }else{
        const parseLoc = JSON.parse(loadLoc);
        getWeather(parseLoc.latitude,parseLoc.longitude);
    }
}

function init(){
    loadWeather();
}
init();