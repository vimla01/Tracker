
    const map = L.map('map').setView([19.076, 72.877], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
}).addTo(map);

    // Clinic coordinates
    const clinicLocations = {
        clinicA: {lat: 18.94, lng: 72.8281 },      // New Life Polyclinic
    clinicB: {lat: 19.0717, lng: 72.8341 },    // SkinLab
    clinicC: {lat: 19.1110, lng: 72.8890 },
    clinicD: {lat: 19.1180, lng: 72.8695 },
    clinicE: {lat: 19.0400, lng: 72.9010 },
    clinicF: {lat: 19.0587, lng: 72.8997 },
    clinicG: {lat: 18.9095, lng: 72.8100 },
    clinicH: {lat: 19.0055, lng: 72.8398 },
    clinicI: {lat: 19.0050, lng: 72.8390 },
    clinicJ: {lat: 19.0180, lng: 72.8410 },
    clinicK: {lat: 18.9820, lng: 72.8330 },
    clinicL: {lat: 19.0060, lng: 72.8340 }
};

    // Optional: Clinic websites
    const clinicWebsites = {
        clinicA: "https://www.newlifepolyclinic.com",
    clinicB: "https://www.skinlab.in",
  // Add more if available
};

    let markers = { };
    for (let id in clinicLocations) {
        let marker = L.marker([clinicLocations[id].lat, clinicLocations[id].lng])
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

            // Zoom map to clinic location
            if (clinicLocations[id]) {
                map.setView([clinicLocations[id].lat, clinicLocations[id].lng], 14);
                markers[id].openPopup();
            }

            // Highlight card
            card.classList.add("highlight");
            setTimeout(() => card.classList.remove("highlight"), 2000);

            // Open official website if available
            if (clinicWebsites[id]) {
                window.open(clinicWebsites[id], "_blank");
            }
        });
});

    // Dropdown filtering
    document.getElementById("clinicSelect").addEventListener("change", function() {
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
        map.setView([clinicLocations[value].lat, clinicLocations[value].lng], 14);
    markers[value].openPopup();}
    else {
        map.setView([19.076, 72.877], 11);}

     });
