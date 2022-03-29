import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Home } from 'pages/Home';
import { Profile } from 'pages/Profile';

import { PrivateRoute } from './PrivateRoute';

export const Routes = (): JSX.Element => (
  <Router>
    <Header />

    <Switch>
      {/* <Route path="/auth">
            <AuthLayout>
                <Switch>
                    <Route path="/auth/cgp" component={CgpAuth} />
                    <Redirect push to="/auth/login" />
                </Switch>
            </AuthLayout>
        </Route> */}

      {/* <Route path="/validate-email/:token">
            <AuthLayout>
                <ApplyValidate />
            </AuthLayout>
        </Route> */}

      <PrivateRoute path="/profile" component={Profile} />
      <Route exact path="/" component={Home} />
      <Redirect push to="/" />
    </Switch>
  </Router>
);
