import { ArrowForwardIcon, EditIcon } from '@chakra-ui/icons';
import {
	Image,
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
	Spinner,
	useToast,
	useDisclosure,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useGetUserQuery } from 'services/requests/auth';
import { useAddPostMessageMutation, useGetPostQuery } from 'services/requests/posts';
import { UpdatePost } from 'pages/UpdatePost';

export const Post = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const { isOpen: isUpdateModalOpen, onClose: onUpdateModalClose, onOpen: onUpdateModelOpen } = useDisclosure();
	const [addMessage, { isError: isAddMessageError, isSuccess: isAddMessageSuccess }] = useAddPostMessageMutation();

	const { data: user } = useGetUserQuery();
	const { isError: isGetPostError, data: post } = useGetPostQuery({ id });
	const history = useHistory();
	const toast = useToast();

	useEffect(() => {
		const chatStack = document.getElementById('chat');
		if (chatStack) chatStack.scrollTop = chatStack.scrollHeight;
	}, [post?.messages]);

	useEffect(() => {
		if (isGetPostError) {
			toast({ status: 'error', title: 'This post does not exist' });
			history.push('/');
		}
	}, [history, isGetPostError, toast]);

	useEffect(() => {
		if (isAddMessageError) {
			toast({ status: 'error', title: 'Could not post message' });
		}
	}, [isAddMessageError, toast]);

	useEffect(() => {
		if (isAddMessageSuccess) {
			setComment('');
			setSubmitted(false);
		}
	}, [isAddMessageSuccess, toast]);

	const isAuthor = useMemo(() => post?.post?.user?.id === user?.id, [post, user]);

	const [submitted, setSubmitted] = useState(false);

	const [comment, setComment] = useState('');
	const isCommentError = comment.length === 0;

	const onSubmit = useCallback(
		(e) => {
			setSubmitted(true);
			e.preventDefault();
			if (!isCommentError) {
				addMessage({
					id,
					message: comment,
				});
			}
		},
		[addMessage, comment, id, isCommentError],
	);

	if (!post || !post.post) return <Spinner />;

	return (
		<VStack align="start" m="8px 16px">
			<Text>Posted by {isAuthor ? 'You' : post.post.user.name}</Text>
			<HStack>
				<Text fontSize="18px" fontWeight={600}>
					{post.post.description}
				</Text>
				{isAuthor && <EditIcon cursor="pointer" onClick={onUpdateModelOpen} />}
				<UpdatePost isOpen={isUpdateModalOpen} onClose={onUpdateModalClose} />
			</HStack>
			<Wrap>
				<WrapItem>
					<Image h="500px" src={`http://${post.post.file}`} />
				</WrapItem>

				<WrapItem>
					<form onSubmit={onSubmit}>
						<VStack
							align="start"
							divider={<Divider borderColor="pantoufle.primary" />}
							w="100%"
							bg="pantoufle.bg"
							p="16px 32px"
							maxH="500px"
							overflowY="scroll"
							id="chat"
							maxW="400px"
						>
							{post.messages.map((m) => {
								const isCommentAuthor = m.user.id === user?.id;
								return (
									<VStack
										ml={isCommentAuthor ? undefined : 'auto'}
										key={m.id}
										align={isCommentAuthor ? 'start' : 'end'}
									>
										{!isCommentAuthor && (
											<Text fontSize="10px" color="pantoufle.secondary">
												{m.user.name}
											</Text>
										)}

										<VStack
											spacing="0px"
											p="4px 8px"
											border="1px solid"
											borderRadius="base"
											borderColor="pantoufle.secondary"
											borderBottomLeftRadius={isCommentAuthor ? '0px' : 'base'}
											borderBottomRightRadius={isCommentAuthor ? 'base' : '0px'}
											align={isCommentAuthor ? 'start' : 'end'}
										>
											<Text fontSize="10px" color="pantoufle.secondary">
												{new Date(m.addedTimestamp).toLocaleString('fr-FR')}
											</Text>

											<Text wordBreak="break-all">{m.body}</Text>
										</VStack>
									</VStack>
								);
							})}

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
										type="submit"
										icon={<ArrowForwardIcon color="pantoufle.secondary" />}
									/>
								</HStack>
								<FormHelperText>What do you have to say</FormHelperText>
								<FormErrorMessage>A comment is required</FormErrorMessage>
							</FormControl>
						</VStack>
					</form>
				</WrapItem>
			</Wrap>
		</VStack>
	);
};
