let lat;
let long;
const apiKey = "33c3e4f2046a16061f713bfa7686852f";

function startApp()
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) =>{
                lat = position.coords.latitude;
                long = position.coords.longitude;
                console.log("lat: " + lat +" long: " + long);
                getWeatherData();
            }
        )
    }
}

function getWeatherData(){
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data=>updateWeatherData(data))    
}

function updateWeatherData(data){
    document.getElementById("img").setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML = data.main.temp + "&#x2103;";
    document.getElementById("wilgotnosc").innerHTML = data.main.humidity+ " %";
    document.getElementById("cisnienie").innerHTML = data.main.pressure +" hPa";
    document.getElementById("clouds").innerHTML = data.clouds.all + " %";
    document.getElementById("windSpeed").innerHTML = data.wind.speed+ " m/s";
    document.getElementById("sunRise").innerHTML = new Date(data.sys.sunrise * 1000).getHours()+":"+ new Date(data.sys.sunrise * 1000).getMinutes();
    document.getElementById("sunSet").innerHTML = new Date(data.sys.sunset * 1000).getHours()+":"+ new Date(data.sys.sunset * 1000).getMinutes();
}