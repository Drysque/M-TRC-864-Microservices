import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	CloseButton,
	HStack,
	IconButton,
	Image,
	Spinner,
	Text,
	VStack,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useGetAllPostsQuery } from 'services/requests/posts';

export const Feed = (): JSX.Element => {
	const history = useHistory();
	const { data: posts, isError, refetch: retry } = useGetAllPostsQuery();

	if (isError)
		return (
			<Alert status="error">
				<AlertIcon />
				<AlertTitle mr={2}>An error occured</AlertTitle>
				<AlertDescription>
					<HStack>
						<Text>Could not get posts</Text>
						<Button
							variant="link"
							textDecoration="underline"
							color="pantoufle.secondary"
							rightIcon={<RepeatIcon />}
							onClick={retry}
						>
							Retry
						</Button>
					</HStack>
				</AlertDescription>
			</Alert>
		);

	if (!posts) return <Spinner />;

	return (
		<VStack>
			<Wrap align="center" justify="center">
				{posts.map((p) => (
					<WrapItem key={p.id}>
						<Image h="200px" src={`http://${p.file}`} onClick={() => history.push(`/post/${p.id}`)} cursor="pointer" />
					</WrapItem>
				))}
			</Wrap>
		</VStack>
	);
};
