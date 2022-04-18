import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
	Image,
	Center,
	VStack,
	Text,
	Divider,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	HStack,
	IconButton,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// import { Post as PostType } from 'services/requests/posts';

export const Post = (): JSX.Element => {
	const post /* : PostType */ = { id: '1', url: 'https://via.placeholder.com/300x200' };

	// const params = useParams();

	// useEffect(() => {
	// 	console.log(params);
	// }, [params]);

	const messages = [
		'hello',
		'this is a nice pic',
		'blablabla long text blablabla long text blablabla long text blablabla long text blablabla long text blablabla long text blablabla long textblablabla long text blablabla long textblablabla long text blablabla long text',
	];

	const [submitted, setSubmitted] = useState(false);

	const [comment, setComment] = useState('');
	const isCommentError = comment.length === 0;

	const onSubmit = useCallback(
		(e) => {
			setSubmitted(true);
			e.preventDefault();
			if (!isCommentError) alert(comment);
		},
		[comment, isCommentError],
	);

	return (
		<Center m="8px">
			<VStack maxW="50%">
				<Image h="500px" src={post.url} />
				<form onSubmit={onSubmit}>
					<VStack
						align="start"
						divider={<Divider borderColor="pantoufle.primary" />}
						w="100%"
						bg="pantoufle.bg"
						p="16px 32px"
					>
						{messages.map((m) => (
							<Text
								key={m}
								p="4px 8px"
								border="1px solid"
								borderRadius="base"
								borderColor="pantoufle.secondary"
								borderBottomLeftRadius="0px"
							>
								{m}
							</Text>
						))}

						<FormControl isInvalid={submitted && isCommentError}>
							<FormLabel htmlFor="comment">Your Comment</FormLabel>
							<HStack>
								<Input
									borderColor="pantoufle.secondary"
									id="comment"
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									borderRightRadius="0px"
								/>
								<IconButton
									variant="outline"
									borderColor="pantoufle.secondary"
									aria-label="Send comment"
									_hover={{ bg: 'pantoufle.accent' }}
									borderLeftRadius="0"
									icon={<ArrowForwardIcon color="pantoufle.secondary" />}
								/>
							</HStack>
							<FormHelperText>What do you have to say</FormHelperText>
							<FormErrorMessage>A title is required</FormErrorMessage>
						</FormControl>
					</VStack>
				</form>
			</VStack>
		</Center>
	);
};
