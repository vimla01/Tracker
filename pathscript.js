// Pathlabs coordinates
const pathlabsLocations = {
  aspira: { lat: 19.1444, lng: 72.9097 },
  lalpathlabs: { lat: 19.0729, lng: 72.9003 },
  starpolyclinic: { lat: 19.0683, lng: 72.8400 },
  paraspathology: { lat: 19.0811, lng: 72.8747 },
  exceldiagnostic: { lat: 19.0680, lng: 72.8477 },
  suburban: { lat: 19.0691, lng: 72.8475 },
  redcliffelabs: { lat: 19.0894, lng: 72.8657 },
  agilus: { lat: 19.0680, lng: 72.8400 },
  rexa: { lat: 19.0521, lng: 72.8871 },
  aarthi: { lat: 19.1183, lng: 72.9110 },
  metropolis: { lat: 19.0667, lng: 72.8464 }
};

const pathlabsWebsites = {
  aspira: "https://www.aspiradiagnostics.com/",
  lalpathlabs: "https://labs.lalpathlabs.com/dr-lal-pathlabs-patient-service-centre-diagnostic-centre-chembur-mumbai-288898/Home",
  starpolyclinic: "https://stardiagnostics.co.in/",
  paraspathology: "http://www.paraspathology.com/",
  exceldiagnostic: "http://exceldiagnosticcentre.in/",
  suburban: "https://www.suburbandiagnostics.com/location/maharashtra/mumbai/santacruz-east",
  redcliffelabs: "https://redcliffelabs.com/centre/redcliffe-labs-collection-center-sahani-diagnostic-diagnostic-centre-santacruz-east-mumbai-289396/Home",
  agilus: "https://agilusdiagnostics.com/",
  rexa: "http://www.rexalabs.com/",
  aarthi: "http://www.aarthiscan.com/",
  metropolis: "https://www.metropolisindia.com/lab/diagnostic-centre-in-kurla-west-new-mill-road-mumbai"
};

// Mumbai  restrict map panning
const mumbaiBounds = [
  [18.8920, 72.7750],  // Southwest corner
  [19.2710, 72.9860]   // Northeast corner
];


const map = L.map('map', {
  maxBounds: mumbaiBounds,
  maxBoundsViscosity: 1.0,
  minZoom: 11,
  maxZoom: 18
}).setView([19.076, 72.877], 12);

// Add OpenStreetMap 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);



let markers = {};

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 40],   
  iconAnchor: [15, 40], 
  popupAnchor: [0, -38], 
});



for (let id in pathlabsLocations) {
    let marker = L.marker(
  [pathlabsLocations[id].lat, pathlabsLocations[id].lng],
  { icon: customIcon }
)
.addTo(map)
.bindPopup(`<b>${id.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}</b>`);


  markers[id] = marker;

 // marker click then scrol n match card
  marker.on('click', () => {
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("highlight");
      setTimeout(() => card.classList.remove("highlight"), 2000);
    }
  });
}

// When card click ed : zoom to marker, open popup, highlight card, open website
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.id;
    if (pathlabsLocations[id]) {
      map.setView([pathlabsLocations[id].lat, pathlabsLocations[id].lng], 14);
      markers[id].openPopup();
    }
    card.classList.add("highlight");
    setTimeout(() => card.classList.remove("highlight"), 2000);

    if (pathlabsWebsites[id]) {
      window.open(pathlabsWebsites[id], "_blank");
    }
  });
});

// Search filter for cards & map markers
const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.cards-section a.card');

searchInput.addEventListener('input', function () {
  const filter = this.value.toLowerCase().trim();

  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    if (name.includes(filter)) {
      card.style.display = 'block';
      // Show marker on map
      if (!map.hasLayer(markers[card.dataset.id])) {
        markers[card.dataset.id].addTo(map);
      }
    } else {
      card.style.display = 'none';
      // Remove marker from map
      if (map.hasLayer(markers[card.dataset.id])) {
        map.removeLayer(markers[card.dataset.id]);
      }
    }
  });
});
