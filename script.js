const capitals = [
  { name: "Berlin", country: "Germany", timezoneOffset: 1, lat: 52.52, lon: 13.405, code: "de" },
  { name: "Tokyo", country: "Japan", timezoneOffset: 9, lat: 35.6895, lon: 139.6917, code: "jp" },
  { name: "Canberra", country: "Australia", timezoneOffset: 10, lat: -35.2809, lon: 149.13, code: "au" },
  { name: "Moscow", country: "Russia", timezoneOffset: 3, lat: 55.7558, lon: 37.6173, code: "ru" },
  { name: "New York", country: "USA", timezoneOffset: -5, lat: 40.7128, lon: -74.0060, code: "us" },
  { name: "London", country: "United Kingdom", timezoneOffset: 0, lat: 51.5074, lon: -0.1278, code: "gb" },
  { name: "Paris", country: "France", timezoneOffset: 1, lat: 48.8566, lon: 2.3522, code: "fr" },
  { name: "Beijing", country: "China", timezoneOffset: 8, lat: 39.9042, lon: 116.4074, code: "cn" },
  { name: "New Delhi", country: "India", timezoneOffset: 5.5, lat: 28.6139, lon: 77.2090, code: "in" },
  { name: "Cairo", country: "Egypt", timezoneOffset: 2, lat: 30.0444, lon: 31.2357, code: "eg" },
  { name: "Brasília", country: "Brazil", timezoneOffset: -3, lat: -15.7801, lon: -47.9292, code: "br" },
  { name: "Buenos Aires", country: "Argentina", timezoneOffset: -3, lat: -34.6037, lon: -58.3816, code: "ar" },
  { name: "Ottawa", country: "Canada", timezoneOffset: -5, lat: 45.4215, lon: -75.6972, code: "ca" },
  { name: "Seoul", country: "South Korea", timezoneOffset: 9, lat: 37.5665, lon: 126.9780, code: "kr" },
  { name: "Mexico City", country: "Mexico", timezoneOffset: -6, lat: 19.4326, lon: -99.1332, code: "mx" },
  { name: "Singapore", country: "Singapore", timezoneOffset: 8, lat: 1.3521, lon: 103.8198, code: "sg" },
  { name: "Jakarta", country: "Indonesia", timezoneOffset: 7, lat: -6.2088, lon: 106.8456, code: "id" },
  { name: "Kuala Lumpur", country: "Malaysia", timezoneOffset: 8, lat: 3.1390, lon: 101.6869, code: "my" }
];

const clockElement = document.getElementById("clock");
const capitalNameElement = document.getElementById("capital-name");
const countryNameElement = document.getElementById("country-name");
const mapImageElement = document.getElementById("map-image");
const mapsLinkElement = document.getElementById("maps-link");
const reloadButton = document.getElementById("reload-btn");

let clockInterval;

function updateClock(timezoneOffset) {
  const utcNow = new Date();  // Aktuelle UTC-Zeit
  const localTime = new Date(utcNow.getTime() + timezoneOffset * 60 * 60 * 1000);  // Berechnung der lokalen Zeit
  
  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");
  const seconds = String(localTime.getSeconds()).padStart(2, "0");
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

async function loadRandomCapital() {
  let foundCapital = false;
  
  while (!foundCapital) {
    const randomCapital = capitals[Math.floor(Math.random() * capitals.length)];
    const { name, country, lat, lon, code, timezoneOffset } = randomCapital;

    const utcNow = new Date();  // Aktuelle UTC-Zeit
    const localTime = new Date(utcNow.getTime() + timezoneOffset * 60 * 60 * 1000);  // Berechnung der lokalen Zeit für die Hauptstadt
    
    const localHours = localTime.getHours();
    
    // Nur Städte zwischen 16:00 und 17:00 Uhr lokalzeit anzeigen
    if (localHours >= 16 && localHours < 17) {
      capitalNameElement.textContent = name;
      countryNameElement.textContent = country;
      mapImageElement.src = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&z=12&size=600,300&l=map`;
      mapsLinkElement.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=12/${lat}/${lon}`;
      mapsLinkElement.textContent = `Zur interaktiven Karte von ${name}`;

      // Uhrzeit aktualisieren
      if (clockInterval) clearInterval(clockInterval); // Vorheriges Intervall stoppen
      clockInterval = setInterval(() => updateClock(timezoneOffset), 1000);
      
      foundCapital = true;  // Passende Stadt gefunden
    }
  }
}

// Event listener für den Button
reloadButton.addEventListener("click", loadRandomCapital);

// Initiale Hauptstadt laden
loadRandomCapital();
