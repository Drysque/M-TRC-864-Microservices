import { Redirect, Route } from 'react-router-dom';

import { useGetUserQuery } from 'services/requests/user';

interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (...args: any[]) => JSX.Element;
  [key: string]: unknown;
}

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps): JSX.Element => {
	const { data: user } = useGetUserQuery();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user ? <Component {...routeProps} /> : <Redirect push to="/" />
      }
    />
  );
};
