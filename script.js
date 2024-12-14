import { capitals } from './capitals.js'; // Import der Hauptstadt-Daten

const clockElement = document.getElementById("clock");
const capitalNameElement = document.getElementById("capital-name");
const countryNameElement = document.getElementById("country-name");
const mapImageElement = document.getElementById("map-image");
const mapsLinkElement = document.getElementById("maps-link");
const reloadButton = document.getElementById("reload-btn");

let clockInterval;

function updateClock(timezoneOffset) {
  const utcNow = new Date();

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: `Etc/GMT${timezoneOffset > 0 ? `-${timezoneOffset}` : `+${Math.abs(timezoneOffset)}`}`,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(utcNow);
  const timeParts = {
    hours: parts.find(part => part.type === "hour").value,
    minutes: parts.find(part => part.type === "minute").value,
    seconds: parts.find(part => part.type === "second").value,
  };

  clockElement.textContent = `${timeParts.hours}:${timeParts.minutes}:${timeParts.seconds}`;
}

async function loadRandomCapital() {
  let foundCapital = false;

  while (!foundCapital) {
    const randomCapital = capitals[Math.floor(Math.random() * capitals.length)];
    const { name, country, lat, lon, code, timezoneOffset } = randomCapital;

    const utcNow = new Date();

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: `Etc/GMT${timezoneOffset > 0 ? `-${timezoneOffset}` : `+${Math.abs(timezoneOffset)}`}`,
      hour: "2-digit",
      hour12: false,
    });
    const localHours = parseInt(formatter.formatToParts(utcNow).find(part => part.type === "hour").value, 10);

    if (localHours >= 16 && localHours < 17) {
      capitalNameElement.textContent = name;
      countryNameElement.textContent = country;
      mapImageElement.src = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&z=12&size=600,300&l=map`;
      mapsLinkElement.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=12/${lat}/${lon}`;
      mapsLinkElement.textContent = `Zur interaktiven Karte von ${name}`;

      if (clockInterval) clearInterval(clockInterval);
      clockInterval = setInterval(() => updateClock(timezoneOffset), 1000);

      foundCapital = true;
    }
  }
}

reloadButton.addEventListener("click", loadRandomCapital);
loadRandomCapital();
