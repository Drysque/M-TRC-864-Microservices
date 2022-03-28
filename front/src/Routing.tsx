import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import { Home } from './pages/Home';

export const Routes = (): JSX.Element => (
  <Router>
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

      {/* <PrivateRoute path="/immobilier" component={Iroko} /> */}
      <Route exact path="/" component={Home} />
      <Redirect push to="/" />
    </Switch>
  </Router>
);
