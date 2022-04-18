import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	VStack,
	FormControl,
	FormLabel,
	Textarea,
	FormHelperText,
	FormErrorMessage,
	ModalFooter,
	HStack,
	Button,
	useToast,
} from '@chakra-ui/react';
import { useState, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDeletePostMutation, useGetPostQuery, useUpdatePostMutation } from 'services/requests/posts';

export type UpdatePostProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const UpdatePost = ({ isOpen, onClose: onModalClose }: UpdatePostProps): JSX.Element => {
	const [submitted, setSubmitted] = useState(false);
	const toast = useToast();
	const { id } = useParams<{ id: string }>();
	const history = useHistory();

	const [description, setDescription] = useState('');
	const isDescriptionError = description.length === 0;

	const [updatePost, { isError: isUpdateError, isSuccess: isUpdateSuccess }] = useUpdatePostMutation();
	const [deletePost, { isError: isDeleteError, isSuccess: isDeleteSuccess }] = useDeletePostMutation();
	const { data: post, isError: isGetPostError, isSuccess: isGetPostSuccess } = useGetPostQuery({ id });

	useEffect(() => {
		if (isGetPostError) {
			toast({ status: 'error', title: 'This post does not exist' });
		}
	}, [isGetPostError, toast]);

	useEffect(() => {
		if (isGetPostSuccess) {
			setDescription(post!.post.description);
		}
	}, [isGetPostSuccess, post, toast]);

	const onClose = useCallback(() => {
		onModalClose();
		setSubmitted(false);
	}, [onModalClose]);

	useEffect(() => {
		if (isDeleteSuccess) {
			toast({ title: 'Success', description: 'Post deleted', status: 'success' });
			onClose();
			history.push('/');
		}
	}, [history, isDeleteSuccess, onClose, toast]);

	useEffect(() => {
		if (isUpdateSuccess) {
			toast({ title: 'Success', description: 'Post updated', status: 'success' });
			setDescription('');
			onClose();
		}
	}, [isUpdateSuccess, onClose, toast]);

	useEffect(() => {
		if (isDeleteError) {
			toast({ status: 'error', title: 'An error occured', description: 'Post could not be deleted' });
		}
	}, [isDeleteError, toast]);

	useEffect(() => {
		if (isUpdateError) {
			toast({ status: 'error', title: 'An error occured', description: 'Post could not be updated' });
		}
	}, [isUpdateError, toast]);

	const onUpdate = useCallback(
		(e) => {
			setSubmitted(true);
			e.preventDefault();
			if (!isDescriptionError) {
				updatePost({ id, description });
			}
		},
		[description, id, isDescriptionError, updatePost],
	);

	const onDelete = useCallback(
		(e) => {
			e.preventDefault();
			deletePost({ id });
		},
		[deletePost, id],
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="xl">
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={onUpdate}>
					<ModalHeader>Edit your post</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing="12px">
							<FormControl isInvalid={submitted && isDescriptionError}>
								<FormLabel htmlFor="description">Description</FormLabel>
								<Textarea
									size="lg"
									id="description"
									resize="vertical"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<FormHelperText>What do you have to say</FormHelperText>
								<FormErrorMessage>A description is required</FormErrorMessage>
							</FormControl>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<HStack>
							<Button bg="red.600" onClick={onDelete}>
								Delete
							</Button>
							<Button bg="red.400" onClick={onClose}>
								Close
							</Button>
							<Button type="submit" bg="pantoufle.accent">
								Update
							</Button>
						</HStack>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};
