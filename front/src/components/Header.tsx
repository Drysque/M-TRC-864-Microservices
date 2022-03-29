import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { PantoufleIcon } from 'assets/Pantoufle';
import { useGetUserQuery } from 'services/requests/user';

export const Header = (): JSX.Element => {
	const { data: user } = useGetUserQuery();

	return (
		<VStack w="100%" align="start">
			<HStack w="100%" justify="space-between" bg="pantoufle.secondary" p="8px 16px">
				<Box bg="white" border="base" borderRadius="15px">
					<Link to="/">
						<HStack m="5px 10px">
							<PantoufleIcon w={12} h={10} fill="pantoufle.primary" />
							<Text color="pantoufle.primary" fontSize="18px">
								Pantoufle
							</Text>
						</HStack>
					</Link>
				</Box>
				{user ? (
					<Link to="/profile">
						<HStack>
							<Text color="white">{user.name}</Text>
							<Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
						</HStack>
					</Link>
				) : (
					<Link to="/login">
						<Text color="pantoufle.accent" fontWeight={600}>
							Login
						</Text>
					</Link>
				)}
			</HStack>
		</VStack>
	);
};
