const capitals = [
  { name: "Berlin", country: "Germany", timezoneOffset: 1, lat: 52.52, lon: 13.405, code: "de", image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Berlin_Pariser_Platz_Tourist_Attraction.jpg" },
  { name: "Tokyo", country: "Japan", timezoneOffset: 9, lat: 35.6895, lon: 139.6917, code: "jp", image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Tokyo_Montage_2015.jpg" },
  { name: "Canberra", country: "Australia", timezoneOffset: 10, lat: -35.2809, lon: 149.13, code: "au", image: "https://upload.wikimedia.org/wikipedia/commons/1/10/Parliament_House%2C_Canberra.jpg" },
  { name: "Moscow", country: "Russia", timezoneOffset: 3, lat: 55.7558, lon: 37.6173, code: "ru", image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Moscow_Collage_2017.jpg" },
  { name: "New York", country: "USA", timezoneOffset: -5, lat: 40.7128, lon: -74.0060, code: "us", image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/New_York_City_-_Empire_State_Building_view.jpg" },
  { name: "London", country: "United Kingdom", timezoneOffset: 0, lat: 51.5074, lon: -0.1278, code: "gb", image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Westminster_Abbey,_London_-_April_2007.jpg" },
  { name: "Paris", country: "France", timezoneOffset: 1, lat: 48.8566, lon: 2.3522, code: "fr", image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Tour_Eiffel_Wikimedia_Commons.jpg" },
  { name: "Beijing", country: "China", timezoneOffset: 8, lat: 39.9042, lon: 116.4074, code: "cn", image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Beijing_Montage_2017.jpg" },
  { name: "New Delhi", country: "India", timezoneOffset: 5.5, lat: 28.6139, lon: 77.2090, code: "in", image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/India_Gate%2C_New_Delhi.jpg" },
  { name: "Cairo", country: "Egypt", timezoneOffset: 2, lat: 30.0444, lon: 31.2357, code: "eg", image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Giza_Pyramids_Cairo.jpg" },
  { name: "Brasília", country: "Brazil", timezoneOffset: -3, lat: -15.7801, lon: -47.9292, code: "br", image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Palácio_do_Itamaraty_%28Brasília%29.jpg" },
  { name: "Buenos Aires", country: "Argentina", timezoneOffset: -3, lat: -34.6037, lon: -58.3816, code: "ar", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Ciudad_de_Buenos_Aires.jpg" },
  { name: "Ottawa", country: "Canada", timezoneOffset: -5, lat: 45.4215, lon: -75.6972, code: "ca", image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Parliament_Hill%2C_Ottawa.jpg" },
  { name: "Seoul", country: "South Korea", timezoneOffset: 9, lat: 37.5665, lon: 126.9780, code: "kr", image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Seoul_Montage.jpg" },
  { name: "Mexico City", country: "Mexico", timezoneOffset: -6, lat: 19.4326, lon: -99.1332, code: "mx", image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Mexico_City_-_Palacio_de_Bellas_Artes.jpg" },
  { name: "Singapore", country: "Singapore", timezoneOffset: 8, lat: 1.3521, lon: 103.8198, code: "sg", image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Marina_Bay_Sands_Singapore.jpg" },
  { name: "Jakarta", country: "Indonesia", timezoneOffset: 7, lat: -6.2088, lon: 106.8456, code: "id", image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Monas_Jakarta.jpg" },
  { name: "Kuala Lumpur", country: "Malaysia", timezoneOffset: 8, lat: 3.1390, lon: 101.6869, code: "my", image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Kuala_Lumpur_Montage.jpg" }
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
    const { name, country, lat, lon, code, image, timezoneOffset } = randomCapital;

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
