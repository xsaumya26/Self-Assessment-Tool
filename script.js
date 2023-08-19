const sections = document.querySelectorAll('.form-section');
const nextButton = document.getElementById('next-button');
let currentSectionIndex = 0;


document.getElementById('auto-fill-location').addEventListener('click', function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationString = `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`;
            document.getElementById("location").value = locationString;
            var d ;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5b016e3e52990f25fb04a61471b22ecd`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    
            const simulatedWindSpeed = data.wind.speed;
            const simulatedHumidity = data.main.humidity + "%";
            const simulatedMaxTemp = data.main.temp_max - 273;
            const simulatedMinTemp = data.main.temp_min - 273;

            document.getElementById("wind-speed").value = simulatedWindSpeed;
            document.getElementById("humidity").value = simulatedHumidity;
            document.getElementById("max-temp").value = simulatedMaxTemp;
            document.getElementById("min-temp").value = simulatedMinTemp;
                })

        });
    } else {
        console.log("Geolocation is not available.");
    }
});

const diseaseOptions = document.querySelectorAll('.disease-option');
const dynamicQuestions = document.getElementById('dynamic-questions');

function displayasthma() {
    event.preventDefault();
    var element = document.getElementById("asthma-quest");
    element.classList.remove("hide");
}
function displayobesity() {
    event.preventDefault();
    var element = document.getElementById("obesity-quest");
    element.classList.remove("hide");
}
function displayhypertension() {
    event.preventDefault();
    var element = document.getElementById("hypertension-quest");
    element.classList.remove("hide");
}
function displayfibrosis() {
    event.preventDefault();
    var element = document.getElementById("fibrosis-quest");
    element.classList.remove("hide");
}
var height = 0
var weight = 0
function storedata() {

    height = document.getElementById("height").value / 100
    weight = document.getElementById("weight").value
    var bmi = weight / (height * height);
    localStorage.setItem('bmi', bmi)
    console.log(bmi)
}

function calculatebmi() {
    var bmi = localStorage.getItem('bmi')
    var bmipred
    if (bmi <= 18.4)
        bmipred = "underweight"
    else if (18.4 < bmi && bmi < 24.9)
        bmipred = "normal"
    else if (25.0 < bmi && bmi < 39.9)
        bmipred = "overweight"
    else
        bmipred = "obese"


    document.getElementById("bmi-disp").innerHTML = bmipred
}
