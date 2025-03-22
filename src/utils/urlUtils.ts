export function getCityFromUrl(): string {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const cityParam = urlParams.get('utm_city');
      console.log('cityParam:', cityParam);
      
      if (!cityParam) return '';
      
      // Handle multi-word city names (e.g., "san francisco" -> "San Francisco")
      return cityParam
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    } catch (error) {
      console.error('Error parsing city from URL:', error);
      return '';
    }
  }