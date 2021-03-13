// DOM elements
const city = document.querySelector('.card-title');
const temp = document.querySelector('.card-text');
const wind = document.querySelector('.card-wind')
const description = document.querySelector('.card-description');

const input = document.querySelector('.form-control');
const btn = document.querySelector('.btn');

// get data from server
class Weather {
    constructor(name) {
        this.apiKey = '062529547601e1a8ae9e5217cda96f94';
        this.name = name;
    }

   async getData() {

        return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.name}&appid=${this.apiKey}`)
                .then(response => response.json())

    }
}

function getWeather() {
    const weather = new Weather(input.value);

    weather.getData().then(data => {

        console.log(input.value)
        console.log(data)

        if (data.message === 'city not found') {
            document.querySelector('.form-control').classList.add('is-invalid');
            city.innerHTML = data.message;
            temp.innerHTML = '';
            wind.innerHTML = '';
            description.innerHTML = '';
        } else if (input.value === '') {
            document.querySelector('.form-control').classList.add('is-invalid');
            temp.innerHTML = 'error';
            wind.innerHTML = '';
            temp.innerHTML = '';
            description.innerHTML = '';
        }
        else {
            document.querySelector('.form-control').classList.remove('is-invalid');
            document.querySelector('.form-control').classList.add('is-valid');
            city.innerHTML = `city: ${data.name}`;
            wind.innerHTML = `wind: ${data.wind.speed}`;
            temp.innerHTML = `temp: ${Math.round(data.main.temp - 273.15)  + ' &deg'}`;
            description.innerHTML = `description: ${data.weather[0].description}`;
        }  
        
    })
}

btn.addEventListener('click', getWeather);


