import { Box, Text, Badge, HStack, VStack, Image, Divider } from "@chakra-ui/react";
import { FlightItinerary } from "../../api/types";
import { FaClock, FaPlaneDeparture, FaPlaneArrival, FaStopwatch } from "react-icons/fa";

interface FlightCardProps {
  flight: FlightItinerary;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const leg = flight.legs[0]; 
  const airline = leg?.carriers?.marketing[0] || { name: "Unknown Airline", logoUrl: "" };
  
  return (
    <Box p={5} borderWidth={1} borderRadius="lg" shadow="lg" width="100%" bg="white">
      <HStack justifyContent="space-between">
        {/* 🛫 Airline Info */}
        <HStack>
          {airline.logoUrl && (
            <Image src={airline.logoUrl} alt={airline.name} boxSize="40px" borderRadius="full" />
          )}
          <Text fontWeight="bold" fontSize="lg">
            {airline.name}
          </Text>
        </HStack>
        
        {/* 🎨 Price Badge */}
        <Badge colorScheme="green" fontSize="lg" p={2} borderRadius="md">
          {flight.price.formatted}
        </Badge>
      </HStack>

      <Divider my={3} />

      <VStack spacing={3} align="stretch">
        {/* 🛫 Departure & Arrival Cities */}
        <HStack justifyContent="space-between">
          <HStack>
            <FaPlaneDeparture />
            <Text fontSize="md" fontWeight="medium">
              {leg?.origin.city} ({leg?.origin.displayCode})
            </Text>
          </HStack>
          <HStack>
            <FaPlaneArrival />
            <Text fontSize="md" fontWeight="medium">
              {leg?.destination.city} ({leg?.destination.displayCode})
            </Text>
          </HStack>
        </HStack>

        {/* 📅 Flight Timing */}
        <HStack justifyContent="space-between">
          <HStack>
            <FaClock />
            <Text fontSize="sm">{new Date(leg?.departure).toLocaleString()}</Text>
          </HStack>
          <HStack>
            <FaClock />
            <Text fontSize="sm">{new Date(leg?.arrival).toLocaleString()}</Text>
          </HStack>
        </HStack>

        {/* ⏳ Duration & Stops */}
        <HStack justifyContent="space-between">
          <HStack>
            <FaStopwatch />
            <Text fontSize="sm">{leg?.durationInMinutes} min</Text>
          </HStack>
          <Badge colorScheme={leg?.stopCount === 0 ? "blue" : "yellow"} fontSize="sm">
            {leg?.stopCount === 0 ? "Direct Flight" : `${leg?.stopCount} Stop(s)`}
          </Badge>
        </HStack>
      </VStack>
    </Box>
  );
}
