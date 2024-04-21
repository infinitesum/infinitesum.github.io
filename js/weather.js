const canvas = document.getElementById('canvas');

let weatherActive = localStorage.getItem('weatherActive') === 'true';
let weatherInterval;
let currentEffect = localStorage.getItem('currentEffect') || null;

const rainConfig = {
    color: '#9dbcd4',
    speed: 1,
    interval: 100,
    angle: 20
};

const snowConfig = {
    snow: ['❄', '※', '❅', '❆', '🎉', '❈', '❉', '❊', '❋'],
    color: '#d9e2e7',
    speed: 10,
    interval: 800
};

function startRain() {
    clearInterval(weatherInterval);
    weatherInterval = setInterval(() => {
        const rain = document.createElement('div');
        const rainWidth = Math.random() * (1.5 - 0.5) + 0.5;
        const rainHeight = Math.random() * (80 - 10) + 10;
        Object.assign(rain.style, {
            width: `${rainWidth}px`,
            height: `${rainHeight}px`,
            backgroundColor: rainConfig.color,
            position: 'absolute',
            top: '-20px',
            left: `${Math.floor(Math.random() * window.innerWidth)}px`,
            opacity: Math.random() + 0.2,
            transform: `rotate(${rainConfig.angle}deg)`,
            transition: `transform ${rainConfig.speed}s linear, opacity ${rainConfig.speed}s linear`
        });
        setTimeout(() => {
            rain.style.transform = `translateX(${Math.tan(-rainConfig.angle * Math.PI / 180) * window.innerHeight}px) translateY(${window.innerHeight}px) rotate(${rainConfig.angle}deg)`;
            rain.style.opacity = 0;
            rain.addEventListener('transitionend', () => rain.remove());
        }, 100);
        canvas.appendChild(rain);
    }, rainConfig.interval);
}

function startSnow() {
    clearInterval(weatherInterval);
    weatherInterval = setInterval(() => {
        const snow = document.createElement('div');
        snow.innerText = snowConfig.snow[Math.floor(Math.random() * snowConfig.snow.length)];
        Object.assign(snow.style, {
            display: 'inline-block',
            color: snowConfig.color,
            fontSize: `${Math.floor(Math.random() * (25 - 14 + 1) + 14)}px`,
            position: 'absolute',
            top: '0',
            left: `${Math.floor(Math.random() * 100)}%`,
            transition: `transform ${snowConfig.speed}s linear, opacity ${snowConfig.speed}s linear`,
            transform: 'translateY(-100%)',
            opacity: Math.random() + 0.3
        });
        setTimeout(() => {
            snow.style.transform = `translate(0, ${window.innerHeight}px) rotate(480deg)`;
            snow.style.opacity = 0;
            snow.addEventListener('transitionend', () => snow.remove());
        }, 100);
        canvas.appendChild(snow);
    }, snowConfig.interval);
}

function stopWeather() {
    clearInterval(weatherInterval);
    weatherActive = false;
    localStorage.removeItem('currentEffect');
    localStorage.setItem('weatherActive', weatherActive);
}

const toggleWeather = document.getElementById('toggleWeather');
toggleWeather.addEventListener('click', () => {
    if (weatherActive) {
        stopWeather();
        toggleWeather.textContent = 'Start Weather';
    } else {
        weatherActive = true;
        if (Math.random() < 0.5) {
            currentEffect = 'rain';
            startRain();
        } else {
            currentEffect = 'snow';
            startSnow();
        }
        localStorage.setItem('currentEffect', currentEffect);
        localStorage.setItem('weatherActive', weatherActive);
        toggleWeather.textContent = 'Stop ' + currentEffect.charAt(0).toUpperCase() + currentEffect.slice(1);
    }
});

// Initialize weather effect based on saved state
document.addEventListener('DOMContentLoaded', () => {
    if (weatherActive) {
        if (currentEffect === 'rain') {
            startRain();
        } else if (currentEffect === 'snow') {
            startSnow();
        }
        toggleWeather.textContent = 'Stop ' + currentEffect.charAt(0).toUpperCase() + currentEffect.slice(1);
    }
});
