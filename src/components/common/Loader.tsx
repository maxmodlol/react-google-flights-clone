import { Spinner, Box } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Spinner size="xl" />
    </Box>
  );
}
