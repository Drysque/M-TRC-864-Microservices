import { Redirect, Route } from 'react-router-dom';

import { useGetUserQuery } from 'services/requests/auth';

interface PrivateRouteProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: (...args: any[]) => JSX.Element;
	[key: string]: unknown;
}

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps): JSX.Element => {
	const { isError } = useGetUserQuery();

	return (
		<Route {...rest} render={(routeProps) => (isError ? <Redirect push to="/" /> : <Component {...routeProps} />)} />
	);
};
