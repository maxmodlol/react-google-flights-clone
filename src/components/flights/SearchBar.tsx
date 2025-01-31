import { useState, useEffect } from "react";
import { 
  Box, Select, Button, VStack, HStack, Input, Icon, FormControl, FormLabel 
} from "@chakra-ui/react";
import { 
  FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUser, FaChild, FaBaby 
} from "react-icons/fa";
import { FlightSearchParams } from "../../api/types";
import { getNearbyAirports } from "../../api/flightApi";

interface SearchBarProps {
  onSearch: (params: FlightSearchParams) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [form, setForm] = useState<FlightSearchParams>({
    originSkyId: "",
    destinationSkyId: "",
    originEntityId: "",
    destinationEntityId: "",
    date: "",
    returnDate: "",
    cabinClass: "economy",
    adults: 1,
    childrens: 0,
    infants: 0,
    sortBy: "best",
    currency: "USD",
    market: "en-US",
    countryCode: "US",
  });

  const [airports, setAirports] = useState<{ skyId: string; entityId: string; name: string; country: string }[]>([]);

  useEffect(() => {
    async function loadAirports() {
      const nearbyAirports = await getNearbyAirports(); 
      setAirports(nearbyAirports);
    }
    loadAirports();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAirportSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAirport = airports.find((airport) => airport.skyId === e.target.value);
    if (!selectedAirport) return;

    setForm({
      ...form,
      [e.target.name]: selectedAirport.skyId,
      [`${e.target.name.replace("SkyId", "EntityId")}`]: selectedAirport.entityId,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.originSkyId || !form.destinationSkyId || !form.date) {
      alert("Please enter all required fields.");
      return;
    }

    onSearch(form);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} bg="white" p={8} borderRadius="lg" shadow="lg" maxW="800px" mx="auto" mb={10}>
      <VStack spacing={6} align="stretch">
        
        <HStack spacing={4} width="100%" flexWrap="wrap">
          <FormControl flex="1">
            <FormLabel>From</FormLabel>
            <Box position="relative">
              <Icon as={FaPlaneDeparture} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" />
              <Select name="originSkyId" value={form.originSkyId} onChange={handleAirportSelect} required pl={10}>
                <option value="">Select Origin</option>
                {airports.map((airport) => (
                  <option key={airport.skyId} value={airport.skyId}>
                    {airport.name} ({airport.country})
                  </option>
                ))}
              </Select>
            </Box>
          </FormControl>

          <FormControl flex="1">
            <FormLabel>To</FormLabel>
            <Box position="relative">
              <Icon as={FaPlaneArrival} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" />
              <Select name="destinationSkyId" value={form.destinationSkyId} onChange={handleAirportSelect} required pl={10}>
                <option value="">Select Destination</option>
                {airports.map((airport) => (
                  <option key={airport.skyId} value={airport.skyId}>
                    {airport.name} ({airport.country})
                  </option>
                ))}
              </Select>
            </Box>
          </FormControl>
        </HStack>

        <HStack spacing={4} width="100%" flexWrap="wrap">
          <FormControl flex="1">
            <FormLabel>Departure Date</FormLabel>
            <Box position="relative">
              <Icon as={FaCalendarAlt} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" />
              <Input name="date" type="date" value={form.date} onChange={handleChange} required pl={10} />
            </Box>
          </FormControl>
          <FormControl flex="1">
            <FormLabel>Return Date</FormLabel>
            <Box position="relative">
              <Icon as={FaCalendarAlt} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" />
              <Input name="returnDate" type="date" value={form.returnDate} onChange={handleChange} placeholder="Optional" pl={10} />
            </Box>
          </FormControl>
        </HStack>

        <HStack spacing={4} width="100%">
          <FormControl flex="1">
            <FormLabel>Cabin Class</FormLabel>
            <Select name="cabinClass" value={form.cabinClass} onChange={handleChange}>
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </Select>
          </FormControl>

          <FormControl flex="1">
            <FormLabel>Sort By</FormLabel>
            <Select name="sortBy" value={form.sortBy} onChange={handleChange}>
              <option value="best">Best</option>
              <option value="price_high">Cheapest</option>
              <option value="fastest">Fastest</option>
              <option value="outbound_take_off_time">Takeoff Time</option>
            </Select>
          </FormControl>
        </HStack>

        <HStack spacing={4} width="100%">
          <FormControl>
            <FormLabel>Adults</FormLabel>
            <Box position="relative">
              <Icon as={FaUser} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" />
              <Input name="adults" type="number" min={1} value={form.adults} onChange={(e) => setForm({ ...form, adults: parseInt(e.target.value) || 1 })} pl={10} />
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>Children</FormLabel>
            <Box position="relative">
              <Icon as={FaChild} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" />
              <Input name="childrens" type="number" min={0} value={form.childrens} onChange={(e) => setForm({ ...form, childrens: parseInt(e.target.value) || 0 })} pl={10} />
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>Infants</FormLabel>
            <Box position="relative">
              <Icon as={FaBaby} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" />
              <Input name="infants" type="number" min={0} value={form.infants} onChange={(e) => setForm({ ...form, infants: parseInt(e.target.value) || 0 })} pl={10} />
            </Box>
          </FormControl>
        </HStack>

        <Button type="submit" colorScheme="blue" width="100%" size="lg" _hover={{ bg: "blue.600" }} transition="0.3s">
          ✈️ Search Flights
        </Button>
      </VStack>
    </Box>
  );
}
