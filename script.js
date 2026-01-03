const apikey = "78980c3833e21f1455c93ec7ee905aba";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(
            apiUrl + encodeURIComponent(city) + `&appid=${apikey}`
        );

        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
        document.querySelector(".wind").innerHTML =
            data.wind.speed + " km/h";

        const condition = data.weather[0].main;

        if (condition === "Clouds") weathericon.src = "images/clouds.png";
        else if (condition === "Clear") weathericon.src = "images/clear.png";
        else if (condition === "Rain") weathericon.src = "images/rain.png";
        else if (condition === "Drizzle") weathericon.src = "images/drizzle.png";
        else if (condition === "Mist") weathericon.src = "images/mist.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value.trim());
});
