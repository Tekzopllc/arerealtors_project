const stateCache = new Map<string, string>();

async function getStateFromCity(city: string): Promise<string> {
  try {
    // Check cache first
    if (stateCache.has(city)) {
      return stateCache.get(city)!;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const encodedCity = encodeURIComponent(city);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedCity}&key=${apiKey}`;

    console.log('Fetching state information for:', city);
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Google Maps API response:', data);

    if (data.status === 'OK' && data.results[0]) {
      const addressComponents = data.results[0].address_components;
      const stateComponent = addressComponents.find(
        (component: any) => component.types.includes('administrative_area_level_1')
      );

      if (stateComponent) {
        const state = stateComponent.short_name; // Gets abbreviation like 'FL'
        stateCache.set(city, state); // Cache the result
        return state;
      }
    }
    return '';
  } catch (error) {
    console.error('Error fetching state information:', error);
    return '';
  }
}

export async function getCityFromUrl(): Promise<string> {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('utm_city');
    console.log('cityParam:', cityParam);
    
    if (!cityParam) return '';
    
    // Handle multi-word city names (e.g., "san francisco" -> "San Francisco")
    const formattedCity = cityParam
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    // Get state information
    const state = await getStateFromCity(formattedCity);
    return state ? `${formattedCity}, ${state}` : formattedCity;
  } catch (error) {
    console.error('Error parsing city from URL:', error);
    return '';
  }
}