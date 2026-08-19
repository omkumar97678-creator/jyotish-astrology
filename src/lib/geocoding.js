// Free geocoding using OpenStreetMap Nominatim
export async function getCityCoordinates(cityName) {
  if (!cityName || !cityName.trim()) {
    return {
      lat: 28.6139,
      lng: 77.2090,
      displayName: 'New Delhi, Delhi, India',
    };
  }

  const cleanName = cityName.trim();

  try {
    const encoded = encodeURIComponent(`${cleanName}, India`);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'JyotishApp/1.0',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          displayName: data[0].display_name,
        };
      }
    }

    // Try without ", India" for international cities
    const url2 = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanName)}&format=json&limit=1`;
    const res2 = await fetch(url2, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'JyotishApp/1.0',
      },
    });

    if (res2.ok) {
      const data2 = await res2.json();
      if (data2 && data2.length > 0) {
        return {
          lat: parseFloat(data2[0].lat),
          lng: parseFloat(data2[0].lon),
          displayName: data2[0].display_name,
        };
      }
    }
  } catch (e) {
    console.warn('Geocoding fetch failed, using standard fallback coordinates:', e);
  }

  // Graceful fallback coordinates
  return {
    lat: 28.6139,
    lng: 77.2090,
    displayName: `${cleanName}, India`,
  };
}

// Get timezone from coordinates
export async function getTimezone(lat, lng) {
  try {
    const url = `https://timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lng}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.timeZone || 'Asia/Kolkata';
    }
  } catch {
    // default
  }
  return 'Asia/Kolkata'; // Standard India timezone
}
