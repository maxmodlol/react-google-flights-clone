import { FlightSearchParams, FlightDataResponse, FlightItinerary } from "./types";

const API_BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1/flights";


export async function getNearbyAirports() {
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const apiHost = process.env.REACT_APP_RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    throw new Error("API key or host is missing. Check your .env file.");
  }

  const locations = [
    { lat: 25.276987, lng: 55.296249 }, // Dubai, Middle East
    { lat: 40.712776, lng: -74.005974 }, // New York, USA
    { lat: 48.856613, lng: 2.352222 }, // Paris, Europe
    { lat: 51.507351, lng: -0.127758 }, // London, Europe
    { lat: 35.689487, lng: 139.691711 }, // Tokyo, Asia
  ];

  let allAirports: { skyId: string; entityId: string; name: string; country: string }[] = [];

  try {
    for (const location of locations) {
      const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${location.lat}&lng=${location.lng}&locale=en-US`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
      });

      const data = await response.json();

      if (data.status && data.data?.nearby?.length > 0) {
        const regionAirports = data.data.nearby.map((airport: any) => ({
          skyId: airport.navigation.relevantFlightParams.skyId,
          entityId: airport.navigation.relevantFlightParams.entityId,
          name: airport.presentation.suggestionTitle,
          country: airport.presentation.subtitle,
        }));

        allAirports = [...allAirports, ...regionAirports];
      }
    }

    return allAirports; 
  } catch (error) {
    console.error("Error fetching airports:", error);
    return [];
  }
}


export const searchFlights = async (params: FlightSearchParams): Promise<FlightItinerary[]> => {
  if (!params.originEntityId || !params.destinationEntityId) {
    throw new Error("Missing origin or destination entity ID.");
  }

  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const apiHost = process.env.REACT_APP_RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    throw new Error("API key or host is missing. Check your .env file.");
  }

  const url = new URL(`${API_BASE_URL}/searchFlights`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value.toString());
  });

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText} (Status: ${response.status})`);
    }

    const data: FlightDataResponse = await response.json();
    console.log("Flight Search Response:", data);

    if (!data.data || !data.data.itineraries) {
      throw new Error("Invalid API response structure.");
    }

    return data.data.itineraries;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};
