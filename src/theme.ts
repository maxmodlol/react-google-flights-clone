import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
      brand: {
        50: "#ebf5ff",
        100: "#cee0ff",
        200: "#a6c8ff",
        300: "#78a9ff",
        400: "#4589ff",
        500: "#0f62fe",
        600: "#00539a",
        700: "#003a6d",
        800: "#00254c",
        900: "#00122d",
      },
    },
    fonts: {
      heading: "Poppins, sans-serif",
      body: "Inter, sans-serif",
    },
  });
  

export default theme;
