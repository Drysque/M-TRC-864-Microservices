import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Home } from 'pages/Home';
import { Profile } from 'pages/auth/Profile';
import { Login } from 'pages/auth/Login';
import { Register } from 'pages/auth/Register';
import { Post } from 'pages/Post';

import { PrivateRoute } from './PrivateRoute';

export const Routes = (): JSX.Element => (
	<Router>
		<Header />
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />

			<Route exact path="/" component={Home} />
			<Route exact path="/post/:id" component={Post} />

			{/* {isError && <Redirect push to="/" />} */}

			<PrivateRoute exact path="/profile" component={Profile} />
			<Redirect push to="/" />
		</Switch>
	</Router>
);
