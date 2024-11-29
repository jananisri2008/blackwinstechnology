let API_KEY = "98fb32226a456bac8cf103b6a6bb8e97";

let getWeatherData = (city) => {
    let URL = 'https://api.openweathermap.org/data/2.5/weather';

    // Correct the URL query parameter
    let Full_Url = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;

    // Fetch weather data
    let weatherPromise = fetch(Full_Url);

    // Handle the fetch response
    return weatherPromise.then((response) => {
        if (!response.ok) {
            // Check if response is not OK (non-200 status)
            throw new Error('City not found or API error');
        }
        return response.json();
    });
};

function searchCity() {
    let city = document.getElementById("city-input").value;

    getWeatherData(city)
        .then((response) => {
            // Success: log the weather data
            //console.log(response);
            document.getElementById("city-name").textContent = response.name; // City name
            document.getElementById("temperature").textContent = `Temperature: ${response.main.temp}°F`; // Temperature in Fahrenheit
            document.getElementById("min-temp").textContent = `Min Temperature: ${response.main.temp_min}°F`; // Min temperature
            document.getElementById("max-temp").textContent = `Max Temperature: ${response.main.temp_max}°F`; // Max temperature
            document.getElementById("humidity").textContent = `Humidity: ${response.main.humidity}%`; // Humidity percentage
        })
        .catch((err) => {
            // Error: handle the error
            console.error(err);
            alert("City not found or there was an error with the request.");
        });
}
