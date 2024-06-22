const apikey = "5de4a3ce3f4fd99973a1d94de42dd632";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");

async function checkweather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        document.querySelector(".weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not retrieve weather data for the specified city.');
    }
}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});

// Optionally, trigger the search when pressing the Enter key
searchbox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkweather(searchbox.value);
    }
});
