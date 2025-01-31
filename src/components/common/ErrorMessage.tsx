import { Box, Text } from "@chakra-ui/react";
import { ErrorMessageProps } from "./types";



export default function ErrorMessage({ message, details }: ErrorMessageProps) {
  return (
    <Box bg="red.500" color="white" p={4} borderRadius="md">
      <Text fontWeight="bold">{message}</Text>
      {details && <Text mt={2}>{details}</Text>}
    </Box>
  );
}
