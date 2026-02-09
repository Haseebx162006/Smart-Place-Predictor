const axios = require('axios');

const placesToTags = {
  happy: ['park', 'cafe', 'ice_cream'],
  sad: ['park', 'library', 'place_of_worship'],
  angry: ['gym', 'fitness_centre', 'sports_centre'],
  neutral: ['restaurant', 'cafe', 'library']
};

// Mirror instances for redundancy
const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://lz4.overpass-api.de/api/interpreter"
];

// Fallback places in case of API failure
const getFallbackPlaces = (emotion, lat, lng) => {
  const fallbackData = {
    happy: [
      { name: "Sunshine Park", category: "park" },
      { name: "Joyful Cafe", category: "cafe" }
    ],
    sad: [
      { name: "Serenity Garden", category: "park" },
      { name: "Quiet Library", category: "library" }
    ],
    angry: [
      { name: "Power Gym", category: "gym" },
      { name: "Active Center", category: "sports_centre" }
    ],
    neutral: [
      { name: "Central Restaurant", category: "restaurant" },
      { name: "City Library", category: "library" }
    ]
  };

  const generic = fallbackData[emotion] || fallbackData.neutral;
  return generic.map(p => ({
    ...p,
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    mapLink: `https://www.google.com/maps/search/${p.name}/@${lat},${lng},15z`
  }));
};

exports.recommendPlaces = async (emotion, lat, lng) => {
  console.log(`Recommending places for: ${emotion} at ${lat}, ${lng}`);
  const tags = placesToTags[emotion];
  if (!tags) return [];

  const radius = 5000; // Reduced to 5km for better performance

  // Combine all tags into one query for efficiency
  const tagQuery = tags.map(tag => `node["amenity"="${tag}"](around:${radius},${lat},${lng});way["amenity"="${tag}"](around:${radius},${lat},${lng});`).join('');

  const query = `
    [out:json][timeout:25];
    (
      ${tagQuery}
    );
    out center tags 5;
  `;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      console.log(`Attempting Overpass query on ${endpoint}...`);
      const response = await axios.post(
        endpoint,
        query,
        {
          headers: { "Content-Type": "text/plain" },
          timeout: 10000 // 10 second timeout per endpoint
        }
      );

      if (response.data && response.data.elements && response.data.elements.length > 0) {
        const places = response.data.elements.map(place => ({
          name: place.tags?.name || "Unnamed sanctuary",
          category: place.tags?.amenity || "point of interest",
          lat: place.lat || place.center?.lat,
          lng: place.lon || place.center?.lon,
          mapLink: `https://www.google.com/maps/search/?api=1&query=${place.lat || place.center?.lat},${place.lon || place.center?.lon}`
        }));
        console.log(`Successfully found ${places.length} places from ${endpoint}`);
        return places;
      }
    } catch (error) {
      console.warn(`Overpass error on ${endpoint}: ${error.message}`);
      // Continue to next endpoint
    }
  }

  console.log("All Overpass instances failed. Returning fallback recommendations.");
  return getFallbackPlaces(emotion, lat, lng);
};