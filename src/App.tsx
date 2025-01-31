import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme";
import HomePage from "./pages/HomePage";

// Create a Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <HomePage />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
