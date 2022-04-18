import { useEffect, useState } from 'react';
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
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import { useRegisterMutation, useLazyGetUserQuery } from 'services/requests/auth';

export const Register = (): JSX.Element => {
	const toast = useToast();
	const history = useHistory();
	const [register, { data, isLoading, isSuccess, error }] = useRegisterMutation();
	const [fetchUser] = useLazyGetUserQuery();

	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, { toggle: toggleShowPassword }] = useBoolean();

	useEffect(() => {
		if (isLoading) return;
		if (isSuccess && data) {
			localStorage.setItem('token', data.tokens.access.token);
			fetchUser();
			history.push('/feed'); // force reload
		} else if (error) {
			if ('status' in error) {
				toast({
					title: 'Invalid credentials.',
					description: (error.data as { message: string })?.message,
					status: 'error',
				});
			}
		}
	}, [isSuccess, isLoading, data, error, toast, history, fetchUser]);

	const submit = () => register({ email, password, name });

	return (
		<Center>
			<VStack m="64px" align="start">
				<VStack minW="50vh" bg="pantoufle.bg" p="16px 32px" border="base" borderRadius="16px" spacing="32px">
					<Text fontSize="20px" fontWeight={700} color="pantoufle.primary">
						Register to Pantoufle
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
						<Input
							_placeholder={{ color: 'pantoufle.primary' }}
							borderColor="pantoufle.primary"
							placeholder="Enter username"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
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
									aria-label="Hide password"
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
					<Text color="pantoufle.primary">Already have an account ? </Text>
					<Link to="/login">
						<Text color="pantoufle.primary" fontWeight={600} textDecoration="underline">
							Login
						</Text>
					</Link>
				</HStack>
			</VStack>
		</Center>
	);
};
