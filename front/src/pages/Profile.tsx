import { Text, VStack, HStack, Avatar, Spinner } from '@chakra-ui/react';

import { useGetUserQuery } from 'services/requests/user';

export const Profile = (): JSX.Element => {
	const { data: user } = useGetUserQuery();

	if (!user) return <Spinner />;

	return (
		<VStack bg="pantoufle.bg" border="base" borderRadius="base">
			<Text>{user.name}</Text>
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
	);
};
