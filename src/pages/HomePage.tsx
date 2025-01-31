import { useState } from "react";
import { 
  Box, Spinner, Text, Heading, Container, VStack, Image 
} from "@chakra-ui/react";
import SearchBar from "../components/flights/SearchBar";
import FlightList from "../components/flights/FlightList";
import { useFlights } from "../hooks/useFlights";
import { FlightSearchParams } from "../api/types"; 

export default function HomePage() {
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null); 

  const { data: flights, isLoading, isError } = useFlights(searchParams);

  return (
    <Box bg="gray.50" minH="100vh">
      
      <Box 
        position="relative"
        w="100%"
        h={{ base: "250px", md: "350px" }}
        bgGradient="linear(to-r, blue.500, purple.600)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        textAlign="center"
      >
        <VStack spacing={3}>
          <Heading size={{ base: "lg", md: "2xl" }} fontWeight="bold">
            ✈️ Find Your Perfect Flight
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} opacity={0.9}>
            Explore the world with ease – search, compare, and book flights instantly.
          </Text>
        </VStack>
      </Box>

      <Container maxW="container.md" py={8}>
        <SearchBar onSearch={setSearchParams} />

        {isLoading && (
          <Box display="flex" justifyContent="center" mt={6}>
            <Spinner size="xl" color="blue.500" />
          </Box>
        )}

        {isError && (
          <Text color="red.500" textAlign="center" fontWeight="bold" mt={6}>
            🚨 Error fetching flights. Please try again.
          </Text>
        )}

        {flights && flights.length > 0 ? (
          <FlightList flights={flights} />
        ) : (
          !isLoading &&
          !isError && (
            <Box textAlign="center" mt={6} fontSize="lg" color="gray.600">
              📭 No flights found. Try a different search.
            </Box>
          )
        )}
      </Container>

    </Box>
  );
}
