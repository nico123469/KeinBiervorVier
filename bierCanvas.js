const canvas = document.getElementById("bierCanvas");
const ctx = canvas.getContext("2d");

// Setze die Canvas-Größe
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Erstelle eine einfache Flüssigkeitswellen-Animation
let waveHeight = 20; // Höhe der Welle
let waveSpeed = 0.1; // Geschwindigkeit der Welle
let waveOffset = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Löscht den Canvas

  // Setze den Hintergrund mit einer Farbe oder einem Bild
  ctx.fillStyle = "#FFD700"; // Goldene Farbe für das Bier
  ctx.fillRect(0, canvas.height / 2 - waveHeight, canvas.width, waveHeight * 2); // Simuliere die Flüssigkeit

  // Animierte Wellen
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let x = 0; x < canvas.width; x++) {
    let y = Math.sin(x * 0.05 + waveOffset) * waveHeight + canvas.height / 2;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.fillStyle = "#FFD700"; // Bierfarbe
  ctx.fill();

  waveOffset += waveSpeed; // Bewegt die Wellen

  requestAnimationFrame(draw); // Startet die nächste Frame-Animation
}

draw(); // Startet die Animation
