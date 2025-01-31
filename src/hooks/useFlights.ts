import { useQuery } from "@tanstack/react-query";
import { searchFlights } from "../api/flightApi";
import { FlightItinerary, FlightSearchParams } from "../api/types";

export const useFlights = (params: FlightSearchParams | null) => {
  return useQuery<FlightItinerary[], Error>({
    queryKey: ["flights", params], 
    queryFn: () => searchFlights(params!), 
    enabled: !!params, 
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
};
