/* ═══════════════════════════════════════════════
   VotePath — Google Maps / Polling Locator
   ═══════════════════════════════════════════════ */

let map = null;
let markers = [];
let geocoder = null;
let placesService = null;
let infoWindow = null;

// ─── INIT MAP ──────────────────────────────────
window.initMap = function () {
    window.mapsReady = true;
    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    // Remove placeholder
    mapEl.innerHTML = '';

    map = new google.maps.Map(mapEl, {
        center: { lat: 38.897957, lng: -77.036560 }, // Washington DC default
        zoom: 11,
        styles: mapStyles(),
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
    });
    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow();

    // Set up Places Autocomplete on the input
    const input = document.getElementById('pollingAddress');
    if (input && google.maps.places) {
        const autocomplete = new google.maps.places.Autocomplete(input, {
            componentRestrictions: { country: 'us' },
            types: ['address'],
        });
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                searchNearbyPolling(place.geometry.location);
            }
        });
        placesService = new google.maps.places.PlacesService(map);
    }
};

// ─── FIND POLLING BUTTON ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('findPollingBtn');
    const input = document.getElementById('pollingAddress');

    if (!btn || !input) return;

    btn.addEventListener('click', () => {
        const address = input.value.trim();
        if (!address) {
            showPollingMsg('Please enter an address.');
            return;
        }
        if (!window.mapsReady || !geocoder) {
            showDemoPolling(address);
            return;
        }
        geocodeAndSearch(address);
    });

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') btn.click();
    });

    // Show placeholder in map until user searches
    showMapPlaceholder();
});

// ─── GEOCODE → SEARCH ──────────────────────────
function geocodeAndSearch(address) {
    showPollingMsg('📍 Finding your location…', true);
    geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
            const loc = results[0].geometry.location;
            map.setCenter(loc);
            map.setZoom(13);
            addUserMarker(loc, results[0].formatted_address);
            searchNearbyPolling(loc);
        } else {
            showDemoPolling(address);
        }
    });
}

// ─── SEARCH NEARBY POLLING PLACES ──────────────
function searchNearbyPolling(location) {
    if (!placesService) {
        showDemoPolling();
        return;
    }
    clearMarkers();
    showPollingMsg('🔍 Searching for polling locations…', true);

    const request = {
        location,
        radius: 8000,
        keyword: 'polling place voting location election office government',
        type: ['local_government_office', 'establishment'],
    };

    placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            displayPollingResults(results.slice(0, 6), location);
        } else {
            // Fallback: search for government buildings / community centers
            placesService.nearbySearch({
                location,
                radius: 5000,
                type: ['local_government_office'],
            }, (r2, s2) => {
                if (s2 === google.maps.places.PlacesServiceStatus.OK && r2.length > 0) {
                    displayPollingResults(r2.slice(0, 6), location);
                } else {
                    showDemoPolling();
                }
            });
        }
    });
}

// ─── DISPLAY RESULTS ───────────────────────────
function displayPollingResults(places, userLocation) {
    const resultsEl = document.getElementById('pollingResults');
    if (!resultsEl) return;

    clearMarkers();
    let cards = '';

    places.forEach((place, i) => {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const dist = getDistanceMiles(
            userLocation.lat ? userLocation.lat() : userLocation.lat,
            userLocation.lng ? userLocation.lng() : userLocation.lng,
            lat, lng
        );

        // Add map marker
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            map,
            title: place.name,
            label: {
                text: String(i + 1),
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '12px',
            },
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 18,
                fillColor: '#C8102E',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
            },
        });

        marker.addListener('click', () => {
            infoWindow.setContent(`
        <div style="font-family:DM Sans,sans-serif;padding:4px">
          <strong>${place.name}</strong><br/>
          <small>${place.vicinity || ''}</small>
          ${place.opening_hours ? `<br/><small style="color:${place.opening_hours.isOpen() ? 'green' : 'red'}">${place.opening_hours.isOpen() ? '🟢 Open now' : '🔴 Closed'}</small>` : ''}
        </div>
      `);
            infoWindow.open(map, marker);
        });
        markers.push(marker);

        // Build result card
        cards += `
      <div class="polling-card">
        <h4>${i + 1}. ${place.name}</h4>
        <p>${place.vicinity || 'Address not available'}</p>
        ${place.opening_hours ? `<p style="margin-top:6px;font-size:.82rem">${place.opening_hours.isOpen() ? '🟢 Open now' : '⚫ Hours vary'}</p>` : ''}
        ${place.rating ? `<p style="font-size:.82rem;margin-top:4px">⭐ ${place.rating}</p>` : ''}
        <p class="pc-dist">📍 ~${dist} miles away</p>
      </div>
    `;
    });

    resultsEl.innerHTML = cards + `<p class="polling-demo-notice">Results from Google Maps • Verify official polling places at vote.gov</p>`;
}

// ─── DEMO FALLBACK (no Maps API key) ──────────
function showDemoPolling(address) {
    const mapEl = document.getElementById('map');
    const resultsEl = document.getElementById('pollingResults');

    if (mapEl) {
        mapEl.innerHTML = `
      <div class="map-placeholder">
        <div class="map-icon">🗺️</div>
        <p><strong>Maps Preview</strong><br/>Add your Google Maps API key in index.html to enable live location search.</p>
      </div>
    `;
    }

    const demoLocations = [
        { name: "City Hall Voting Center", addr: "123 Main St — 0.4 miles away", hours: "7 AM – 8 PM" },
        { name: "Central Library Precinct", addr: "456 Oak Avenue — 0.8 miles away", hours: "7 AM – 8 PM" },
        { name: "Community Recreation Center", addr: "789 Park Blvd — 1.2 miles away", hours: "7 AM – 8 PM" },
        { name: "Washington Elementary School", addr: "321 Elm Street — 1.5 miles away", hours: "7 AM – 8 PM" },
    ];

    if (resultsEl) {
        resultsEl.innerHTML = demoLocations.map((loc, i) => `
      <div class="polling-card">
        <h4>${i + 1}. ${loc.name}</h4>
        <p>${loc.addr}</p>
        <p style="font-size:.82rem;margin-top:4px">🕐 ${loc.hours} on Election Day</p>
        <p class="pc-dist">📌 Demo location — add Maps API for real results</p>
      </div>
    `).join('') + `
      <p class="polling-demo-notice">⚠️ Demo data shown. Configure Google Maps API for live results. Always verify at <a href="https://vote.gov" target="_blank" style="color:var(--navy)">vote.gov</a></p>
    `;
    }
}

// ─── HELPERS ───────────────────────────────────
function showMapPlaceholder() {
    const mapEl = document.getElementById('map');
    if (mapEl && !map) {
        mapEl.innerHTML = `
      <div class="map-placeholder">
        <div class="map-icon">📍</div>
        <p>Enter your address above to find polling places near you</p>
      </div>
    `;
    }
}

function showPollingMsg(msg, spinner = false) {
    const el = document.getElementById('pollingResults');
    if (el) el.innerHTML = `<p style="text-align:center;color:var(--gray-4);padding:20px">${spinner ? '<span class="spinner">⏳</span> ' : ''}${msg}</p>`;
}

function clearMarkers() {
    markers.forEach(m => m.setMap(null));
    markers = [];
}

function getDistanceMiles(lat1, lng1, lat2, lng2) {
    const R = 3958.8;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}
function toRad(v) { return v * Math.PI / 180; }

// ─── MAP STYLE ─────────────────────────────────
function mapStyles() {
    return [
        { elementType: 'geometry', stylers: [{ color: '#f5f0e8' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#0a2240' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c5d8f0' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
        { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#d6cfc3' }] },
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
    ];
}