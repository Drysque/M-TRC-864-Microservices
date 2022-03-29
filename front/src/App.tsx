import { ChakraProvider, theme } from '@chakra-ui/react';

import { Routes } from './Routing';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes />
  </ChakraProvider>
);
