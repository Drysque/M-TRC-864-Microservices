import { Button, VStack, Spinner, Center, Table, Tbody, Tr, Td } from '@chakra-ui/react';

import { useGetUserQuery } from 'services/requests/user';

export const Profile = (): JSX.Element => {
	const { data: user } = useGetUserQuery();

	if (!user) return <Spinner />;

	const logout = () => {
		localStorage.removeItem('token');
		window.location.href = '/';
	};

	return (
		<Center>
			<VStack bg="pantoufle.bg" border="base" borderRadius="base" m="32px 64px" p="16px 32px" align="end">
				<Table>
					<Tbody>
						<Tr>
							<Td fontWeight={600}>Name</Td>
							<Td>{user.name}</Td>
						</Tr>
						<Tr>
							<Td fontWeight={600}>Email</Td>
							<Td>{user.email}</Td>
						</Tr>
					</Tbody>
				</Table>
				<Button onClick={logout} bg="red.400">
					Logout
				</Button>
				{/* <VStack>
				<HStack p="4px 8px" borderRadius="6px">
				<HStack bg="blue.500" p="2px 4px" borderRadius="6px">
				<Avatar size="sm" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
				<Text color="white">{user.name}</Text>
				</HStack>
				<Text>Content</Text>
				</HStack>
				<HStack p="4px 8px" borderRadius="6px">
				<HStack bg="blue.500" p="2px 4px" borderRadius="6px">
				<Avatar size="sm" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
				<Text color="white">{user.name}</Text>
					</HStack>
					<Text>Content</Text>
				</HStack>
			</VStack> */}
			</VStack>
		</Center>
	);
};
