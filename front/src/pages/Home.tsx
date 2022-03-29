import { Center, VStack, Text } from '@chakra-ui/react';

import { PantoufleIcon } from 'assets/Pantoufle';

export const Home = (): JSX.Element => {
	return (
		<Center m="8px">
			<VStack>
				<PantoufleIcon w={400} h={181} fill="pantoufle.primary" m="16px" />

				<Text fontSize="50px" color="pantoufle.primary" fontWeight={800}>
					Pantoufle
				</Text>
				<Text fontSize="20px" color="pantoufle.primary" fontWeight={600}>
					Post pictures and discuss about them
				</Text>
			</VStack>
		</Center>
	);
};
