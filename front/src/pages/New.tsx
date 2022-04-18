import { useCallback, useState } from 'react';
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
	Input,
	VStack,
	Textarea,
	FormErrorMessage,
} from '@chakra-ui/react';

import DropZone from 'components/DropZone';
import { AddIcon } from '@chakra-ui/icons';

export const New = (): JSX.Element => {
	const { isOpen, onClose: onModalClose, onOpen } = useDisclosure();
	const [submitted, setSubmitted] = useState(false);

	const [title, setTitle] = useState('');
	const isTitleError = title.length === 0;

	const [description, setDescription] = useState('');
	const isDescriptionError = description.length === 0;

	const [file, setFile] = useState<File>();
	const isFileError = file == null;

	const onClose = useCallback(() => {
		onModalClose();
		setSubmitted(false);
	}, [onModalClose]);

	const onSubmit = useCallback(
		(e) => {
			setSubmitted(true);
			e.preventDefault();
			if (!(isTitleError || isDescriptionError || isFileError)) alert(title);
		},
		[isDescriptionError, isFileError, isTitleError, title],
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
								<FormControl isInvalid={submitted && isTitleError}>
									<FormLabel htmlFor="title">Title</FormLabel>
									<Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
									{!(submitted && isTitleError) && <FormHelperText>How is your post titled</FormHelperText>}
									<FormErrorMessage>A title is required</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={submitted && isDescriptionError}>
									<FormLabel htmlFor="description">Description</FormLabel>
									<Textarea
										size="lg"
										id="description"
										resize="vertical"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
									{!(submitted && isDescriptionError) && <FormHelperText>What do you have to say</FormHelperText>}
									<FormErrorMessage>A title is required</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={submitted && isFileError}>
									<FormLabel htmlFor="image">Picture</FormLabel>
									<DropZone fileUploaded={file} onDrop={(files) => setFile(files[0])} />
									{!(submitted && isFileError) && <FormHelperText>Let's see what you've got</FormHelperText>}
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
