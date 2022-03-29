import { Redirect, Route } from 'react-router-dom';

interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (...args: any[]) => JSX.Element;
  [propName: string]: unknown;
}

export const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  const { component: Component, ...rest } = props;
  const isAuth = true;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuth ? <Component {...routeProps} /> : <Redirect push to="/" />
      }
    />
  );
};
