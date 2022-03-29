import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { PantoufleIcon } from 'assets/Pantoufle';
import api from 'utils/api';

export const Header = (): JSX.Element => {
  const me = api.getUser();

  return (
    <VStack w="100%" align="start">
      <HStack w="100%" justify="space-between" bg="blue.300" p="8px 16px">
        <Box bg="white" border="base" borderRadius="15px">
          <HStack m="5px 10px">
            <PantoufleIcon w={12} h={10} />
            <Link to="/">
              <Text fontSize="18px">Pantoufle</Text>
            </Link>
          </HStack>
        </Box>
        <Link to="/profile">
          <HStack>
            <Text>{me.name}</Text>
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          </HStack>
        </Link>
      </HStack>
    </VStack>
  );
};
