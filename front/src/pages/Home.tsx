import { Box, Center, VStack, Text } from '@chakra-ui/react';

import { PantoufleIcon } from 'assets/Pantoufle';

export const Home = (): JSX.Element => {
  return (
    <Center m="8px">
      <VStack>
        <Box bg="blue.700">
          <PantoufleIcon w={400} h={181} fill="white" m="16px" />
        </Box>

        <Text fontSize="50px" color="blue.700" fontWeight={800}>
          Pantoufle
        </Text>
        <Text fontSize="20px" color="blue.700" fontWeight={600}>
          Post pictures and discuss about them
        </Text>
      </VStack>
    </Center>
  );
};
