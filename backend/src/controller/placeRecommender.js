const axios = require('axios');


const placesToTags = {
  happy: ['park', 'cafe'],
  sad: ['park', 'place_of_worship'],
  angry: ['gym', 'fitness_centre'],
  neutral: ['restaurant']
}

exports.recommendPlaces = async (emotion, lat, lng) => {


  const tags = placesToTags[emotion]
  const radius = 10000
  const results = []
  for (const tag of tags) {
    const query = `
      [out:json];
      (
        node["amenity"="${tag}"](around:${radius},${lat},${lng});
        way["amenity"="${tag}"](around:${radius},${lat},${lng});
      );
      out center tags;
    `

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "text/plain" } }
    )

    results.push(...response.data.elements)
  }
  const places = results.slice(0, 5).map(place => ({
    name: place.tags?.name || "Unnamed place",
    category: place.tags?.amenity || "unknown",
    lat: place.lat || place.center?.lat,
    lng: place.lon || place.center?.lon,
    mapLink: `https://www.openstreetmap.org/?mlat=${place.lat || place.center?.lat}&mlon=${place.lon || place.center?.lon}`
  }))



  return places;
}