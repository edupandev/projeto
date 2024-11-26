
    const apiKey = "8b3d7726c0f72959ae51d89150bde1f8";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const weatherIcon = document.querySelector(".weather-icon");
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error("Cidade não encontrada");
            }
            const data = await response.json();
            console.log(data);

            // Atualiza os elementos HTML
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

            // Atualiza o ícone do clima com base na condição
            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "assets/clouds.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "assets/clear.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "assets/rain.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "assets/drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "assets/mist.png";
            } else {
                // Caso não haja um ícone específico
                weatherIcon.src = "assets/default.png";
            }
        } catch (error) {
            alert("Erro ao buscar os dados. Verifique o nome da cidade.");
            console.error(error);
        }
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });

