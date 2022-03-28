import { Text, VStack, HStack, Avatar } from '@chakra-ui/react';

import api from 'utils/api';

export const Profile = (): JSX.Element => {
  const me = api.getUser();
  const mine = api.getMyPosts();

  return (
    <VStack>
      <Text>{me.name}</Text>
      <VStack>
        {mine.map((post) => (
          <HStack key={post.id} p="4px 8px" borderRadius="6px">
            <HStack bg="blue.500" p="2px 4px" borderRadius="6px">
              <Avatar size="sm" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Text color="white">{post.by.name}</Text>
            </HStack>
            <Text>{post.text}</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
