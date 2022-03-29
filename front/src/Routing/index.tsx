import { Center, Spinner, useToast } from '@chakra-ui/react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Home } from 'pages/Home';
import { Profile } from 'pages/Profile';
import { Login } from 'pages/auth/Login';
import { Register } from 'pages/auth/Register';
import { useGetUserQuery } from 'services/requests/user';

import { PrivateRoute } from './PrivateRoute';

export const Routes = (): JSX.Element => {
	const { isLoading, isError } = useGetUserQuery();
	const toast = useToast();

	if (isLoading)
		return (
			<Center h="100vh">
				<Spinner size="xl" color="pantoufle.secondary" />
			</Center>
		);
	if (isError) {
		toast({ title: 'Your session expired', status: 'error' });
		return <Redirect push to="/" />;
	}

	return (
		<Router>
			<Header />
			<Switch>
				<PrivateRoute exact path="/profile" component={Profile} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/" component={Home} />
				<Redirect push to="/" />
			</Switch>
		</Router>
	);
};
