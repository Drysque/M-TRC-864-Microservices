import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import { store } from 'services/store';
import { Routes } from 'Routing';
import theme from 'theme';

export const App = () => (
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<Routes />
		</ChakraProvider>
	</Provider>
);
