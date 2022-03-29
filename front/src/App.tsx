import { ChakraProvider } from '@chakra-ui/react';

import { Routes } from './Routing';
import theme from './theme';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes />
  </ChakraProvider>
);
