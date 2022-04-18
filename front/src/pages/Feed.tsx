import { Image, Wrap, WrapItem } from '@chakra-ui/react';

export const Feed = (): JSX.Element => {
	const posts = ['https://via.placeholder.com/150', 'https://via.placeholder.com/300'];
	return (
		<Wrap>
			{posts.map((p) => (
				<WrapItem>
					<Image src={p} />
				</WrapItem>
			))}
		</Wrap>
	);
};
