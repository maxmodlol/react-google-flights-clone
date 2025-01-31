import { VStack, Text, Box } from "@chakra-ui/react";
import FlightCard from "./FlightCard";
import { FlightItinerary } from "../../api/types";

interface FlightListProps {
  flights: FlightItinerary[];
}

export default function FlightList({ flights }: FlightListProps) {
  if (!flights || flights.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Text fontSize="xl" fontWeight="bold" color="gray.600">
          No flights found. Try a different search.
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} align="stretch" width="100%">
      {flights.map((flight, index) => (
        <FlightCard key={index} flight={flight} />
      ))}
    </VStack>
  );
}
