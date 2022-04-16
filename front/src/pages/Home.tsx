import { Center, VStack, Text, Image, Button } from '@chakra-ui/react';

import { PantoufleIcon } from 'assets/Pantoufle';
import DropZone from 'components/DropZone';
import { useState } from 'react';

export const Home = (): JSX.Element => {
	const [file, setFile] = useState<File>();

	return (
		<Center m="8px">
			<VStack>
				<PantoufleIcon w={400} h={181} fill="pantoufle.primary" m="16px" />

				<Text fontSize="50px" color="pantoufle.primary" fontWeight={800}>
					Pantoufle
				</Text>
				<Text fontSize="20px" color="pantoufle.primary" fontWeight={600}>
					Post pictures and discuss about them
				</Text>
				<DropZone fileUploaded={file} onDrop={(files) => setFile(files[0])} />
				{file && <Image maxW="200px" maxH="200px" src={URL.createObjectURL(file)} />}
				{/* <Button onClick>
				<Text
				upload
				</Button> */}
			</VStack>
		</Center>
	);
};
