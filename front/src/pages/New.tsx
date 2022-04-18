import { useCallback, useEffect, useState } from 'react';
import {
	Modal,
	Image,
	Button,
	useDisclosure,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	HStack,
	FormControl,
	FormHelperText,
	FormLabel,
	VStack,
	Textarea,
	FormErrorMessage,
	useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import DropZone from 'components/DropZone';
import { useCreateNewPostMutation } from 'services/requests/posts';

export const New = (): JSX.Element => {
	const [createPost, { isSuccess, isError }] = useCreateNewPostMutation();
	const toast = useToast();

	// useEffect(() => console.dir(toto), [toto]);

	const { isOpen, onClose: onModalClose, onOpen } = useDisclosure();
	const [submitted, setSubmitted] = useState(false);

	const [description, setDescription] = useState('');
	const isDescriptionError = description.length === 0;

	const [file, setFile] = useState<File>();
	const isFileError = file == null;

	const onClose = useCallback(() => {
		onModalClose();
		setSubmitted(false);
	}, [onModalClose]);

	useEffect(() => {
		setDescription('');
		setFile(undefined);
		setSubmitted(false);
		onModalClose();
	}, [isSuccess, onModalClose]);

	useEffect(() => {
		isError && toast({ title: 'An error occured', status: 'error' });
	}, [toast, isError]);

	const onSubmit = useCallback(
		(e) => {
			setSubmitted(true);
			e.preventDefault();
			if (!(isDescriptionError || isFileError)) {
				const formData = new FormData();

				formData.append('description', description);
				formData.append('files', file);

				createPost(formData);
			}
		},
		[createPost, description, file, isDescriptionError, isFileError],
	);

	return (
		<>
			<Button leftIcon={<AddIcon />} onClick={onOpen}>
				Create a new post
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={onSubmit}>
						<ModalHeader>Create a post</ModalHeader>
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

								<FormControl isInvalid={submitted && isFileError}>
									<FormLabel htmlFor="image">Picture</FormLabel>
									<DropZone fileUploaded={file} onDrop={(files) => setFile(files[0])} />
									<FormHelperText>Let's see what you've got</FormHelperText>
									<FormErrorMessage>A picture is required</FormErrorMessage>
								</FormControl>
								{file && <Image maxW="200px" maxH="200px" src={URL.createObjectURL(file)} />}
							</VStack>
						</ModalBody>

						<ModalFooter>
							<HStack>
								<Button bg="red.400" onClick={onClose}>
									Close
								</Button>
								<Button type="submit" bg="pantoufle.accent">
									Upload
								</Button>
							</HStack>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};
