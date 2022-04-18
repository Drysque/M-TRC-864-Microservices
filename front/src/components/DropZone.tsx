import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { Box, VStack, Text, Center } from '@chakra-ui/react';
import { CheckIcon, DownloadIcon } from '@chakra-ui/icons';

type DropZoneProps = {
	fileUploaded?: File;
};

const DropZone = ({ fileUploaded, ...options }: DropZoneProps & DropzoneOptions): JSX.Element => {
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*', // https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/accept
		multiple: false, // prevent drag and drop of multiple files
		...options,
		maxFiles: 1, // one file only
	});

	return (
		<Box {...getRootProps()} cursor="pointer" w="70%">
			<input type="file" {...getInputProps()} />
			<Box h="228px" borderRadius="10px" bgColor="#F1F1F1" p="10px" minW="200px">
				<Box borderRadius="10px" border="1px dashed black" h="100%" p="30px">
					<Center h="100%">
						<VStack align="center" spacing="27px">
							{fileUploaded ? <CheckIcon /> : <DownloadIcon />}
							<Text fontSize="12px" fontWeight={600} align="center">
								{fileUploaded ? fileUploaded.name : 'Drag your picture here'}
							</Text>
							{!fileUploaded && (
								<Text fontSize="12px" opacity="0.5" align="center">
									or browse your pictures
								</Text>
							)}
						</VStack>
					</Center>
				</Box>
			</Box>
		</Box>
	);
};

export default DropZone;
