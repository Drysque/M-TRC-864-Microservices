import { Image, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
// import { useGetAllPostsQuery } from 'services/requests/posts';

export const Feed = (): JSX.Element => {
	const posts = [
		{ id: '1', url: 'https://via.placeholder.com/300x200' },
		{ id: '2', url: 'https://via.placeholder.com/150x600' },
		{ id: '3', url: 'https://via.placeholder.com/30x20' },
		{ id: '4', url: 'https://via.placeholder.com/50x60' },
		{ id: '5', url: 'https://via.placeholder.com/100x30' },
		{ id: '6', url: 'https://via.placeholder.com/560' },
		{ id: '7', url: 'https://via.placeholder.com/300' },
		{ id: '8', url: 'https://via.placeholder.com/500' },
		{ id: '9', url: 'https://via.placeholder.com/50' },
		{ id: '10', url: 'https://via.placeholder.com/50x70' },
		{ id: '11', url: 'https://via.placeholder.com/400x1000' },
	];
	const history = useHistory();
	// const { data: qposts } = useGetAllPostsQuery();

	// console.log(qposts); // sort by time

	return (
		<VStack>
			<Wrap align="center" justify="center">
				{posts.map((p) => (
					<WrapItem key={p.id}>
						<Image h="200px" src={p.url} onClick={() => history.push(`/post/${p.id}`)} cursor="pointer" />
					</WrapItem>
				))}
			</Wrap>
		</VStack>
	);
};
