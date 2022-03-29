import { useState, useEffect } from 'react';
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	Center,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useBoolean,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';

import { useLoginMutation } from 'services/requests/auth';

export const Login = (): JSX.Element => {
	const toast = useToast();
	const history = useHistory();
	const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();

	const [email, setEmail] = useState<string>('aa@aa.aaa');
	const [password, setPassword] = useState<string>('aaaaaaaa1');
	const [showPassword, { toggle: toggleShowPassword }] = useBoolean();

	useEffect(() => {
		if (isLoading) return;
		if (isSuccess && data) {
			localStorage.setItem('token', data.tokens.access.token);
			history.push('/profile'); // force reload
		} else if (error) {
			if ('status' in error) {
				toast({
					title: 'Invalid credentials.',
					description: (error.data as { message: string })?.message,
					status: 'error',
				});
			}
		}
	}, [isSuccess, isLoading, data, error, toast, history]);

	const submit = () => login({ email, password });

	return (
		<Center>
			<VStack m="64px" align="start">
				<VStack minW="50vh" bg="pantoufle.bg" p="16px 32px" border="base" borderRadius="32px">
					<Text fontSize="20px" fontWeight={700} color="pantoufle.primary">
						Log into Pantoufle
					</Text>
					<VStack align="end" w="100%">
						<Input
							_placeholder={{ color: 'pantoufle.primary' }}
							borderColor="pantoufle.primary"
							placeholder="Enter email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<InputGroup size="md">
							<Input
								_placeholder={{ color: 'pantoufle.primary' }}
								borderColor="pantoufle.primary"
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<InputRightElement>
								<IconButton
									h="1.75rem"
									size="sm"
									onClick={toggleShowPassword}
									bg="pantoufle.accent"
									colorScheme="yellow"
									aria-label="Search database"
									icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
								/>
							</InputRightElement>
						</InputGroup>
						<IconButton
							onClick={submit}
							bg="pantoufle.secondary"
							colorScheme="green"
							aria-label="Search database"
							icon={<ArrowForwardIcon />}
						/>
					</VStack>
				</VStack>
				<HStack>
					<Text color="pantoufle.primary">You don't have an account ? </Text>
					<Link to="/register">
						<Text color="pantoufle.primary" fontWeight={600} textDecoration="underline">
							Register
						</Text>
					</Link>
				</HStack>
			</VStack>
		</Center>
	);
};
