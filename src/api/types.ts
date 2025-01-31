export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: "economy" | "premium_economy" | "business" | "first";
  adults?: number;
  childrens?: number;
  infants?: number;
  sortBy?: "best" | "price_high" | "fastest" | "outbound_take_off_time" | "outbound_landing_time";
  currency?: string; 
  market?: string; 
  countryCode?: string; 
}

export interface FlightLeg {
  id: string;
  origin: {
    id: string;
    name: string;
    displayCode: string;
    city: string;
  };
  destination: {
    id: string;
    name: string;
    displayCode: string;
    city: string;
  };
  departure: string; 
  arrival: string; 
  durationInMinutes: number;
  stopCount: number;
  carriers: {
    marketing: {
      id: number;
      name: string;
      logoUrl?: string;
    }[];
  };
}

export interface FlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: FlightLeg[];
  tags?: string[]; 
  score?: number;
}

export interface FlightDataResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: string;
      totalResults: number;
    };
    itineraries: FlightItinerary[];
    filterStats: {
      duration: { min: number; max: number };
      airports: {
        city: string;
        airports: { id: string; name: string }[];
      }[];
      carriers: {
        id: number;
        logoUrl: string;
        name: string;
      }[];
      stopPrices: {
        direct: { isPresent: boolean; formattedPrice?: string };
        one: { isPresent: boolean; formattedPrice?: string };
        twoOrMore: { isPresent: boolean };
      };
    };
  };
}
