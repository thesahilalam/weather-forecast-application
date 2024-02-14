function searchWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) {
        document.getElementById('error-message').innerText = 'Please enter a city name.';
        document.getElementById('weather-result').innerText = '';
        return;
    }

    searchCity(city);
}

function searchCity(city) {
    const apiKey = 'b36599338472a99ab1a0a3bea42051d5';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please enter a valid city name.');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const result = `Current temperature in ${city}: ${temperature}°C, ${description}<br>Humidity: ${humidity}%, Wind Speed: ${windSpeed} m/s`;
            document.getElementById('weather-result').innerHTML = result;
            document.getElementById('error-message').innerText = '';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-result').innerText = '';
            document.getElementById('error-message').innerText = error.message;
        });
}
