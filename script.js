const hospitalLocations = {
  kokilaben: {lat: 19.129, lng: 72.837},
  tata: {lat: 19.004, lng: 72.843},
  lilavati: {lat: 19.054, lng: 72.829},
  hinduja: {lat: 19.034, lng: 72.840},
  bombay: {lat: 18.943, lng: 72.827},
  nanavati: {lat: 19.096, lng: 72.841},
  breach_candy: {lat: 18.971, lng: 72.808},
  jaslok: {lat: 18.971, lng: 72.808},
  hiranandani: {lat: 19.117, lng: 72.910},
  fortis: {lat: 19.172, lng: 72.948},
  reliance: {lat: 18.956, lng: 72.818},
  saifee: {lat: 18.952, lng: 72.817},
  kem: {lat: 19.004, lng: 72.843},
  jj: {lat: 18.962, lng: 72.832},
  prince_aly_khan: {lat: 18.971, lng: 72.836}
};

const hospitalWebsites = {
  kokilaben: "https://www.kokilabenhospital.com",
  tata: "https://tmc.gov.in",
  lilavati: "https://www.lilavatihospital.com",
  hinduja: "https://www.hindujahospital.com",
  bombay: "https://www.bombayhospital.com",
  nanavati: "https://www.nanavatimaxhospital.org",
  breach_candy: "https://www.breachcandyhospital.org",
  jaslok: "https://www.jaslokhospital.net",
  hiranandani: "https://www.hiranandanihospital.org",
  fortis: "https://www.fortishealthcare.com/india/hospitals-in-maharashtra/fortis-hospital-mulund",
  reliance: "https://www.hnhospital.com",
  saifee: "https://www.saifeehospital.com",
  kem: "https://www.kem.edu",
  jj: "https://www.gmcjjh.org",
  prince_aly_khan: "https://www.pakh.in"
};

const map = L.map('map').setView([19.076, 72.877], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markers = {};
for (let id in hospitalLocations) {
  let marker = L.marker([hospitalLocations[id].lat, hospitalLocations[id].lng])
    .addTo(map)
    .bindPopup(`<b>${id.replace(/_/g, ' ').toUpperCase()}</b>`);

  markers[id] = marker;

  // Marker click → scroll to card & highlight
  marker.on('click', () => {
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("highlight");
      setTimeout(() => card.classList.remove("highlight"), 2000);
    }
  });
}

// Card click → zoom map, highlight & open website
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.id;

    // Zoom map to hospital location
    if (hospitalLocations[id]) {
      map.setView([hospitalLocations[id].lat, hospitalLocations[id].lng], 14);
      markers[id].openPopup();
    }

    // Highlight card
    card.classList.add("highlight");
    setTimeout(() => card.classList.remove("highlight"), 2000);

    // Open official website
    if (hospitalWebsites[id]) {
      window.open(hospitalWebsites[id], "_blank");
    }
  });
});

// Dropdown filtering
document.getElementById("hospitalSelect").addEventListener("change", function() {
  const value = this.value;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (value === "all" || card.dataset.id === value) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  if (value !== "all") {
    map.setView([hospitalLocations[value].lat, hospitalLocations[value].lng], 14);
    markers[value].openPopup();
  } else {
    map.setView([19.076, 72.877], 11);
  }
});

