import React, { Suspense, lazy, Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './containers/Home/Home';
import Loading from './components/UI/Loading/Loading';
import * as actions from './store/action/index';
import './iziToast.min.css';

const UserLogin = lazy(() => import('./containers/UserLogin/UserLogin'));
const UserRegister = lazy(() => import('./containers/UserRegister/UserRegister'));
const Menu = lazy(() => import('./containers/Menu/Menu'));
const OrderHistory = lazy(() => import('./containers/OrderHistory/OrderHistory'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const UserLogout = lazy(() => import('./containers/UserLogout/UserLogout'));
const CatererHome = lazy(() => import('./containers/Caterer/CatererHome/CatererHome'));
const CatererLogin = lazy(() => import('./containers/Caterer/CatererLogin/CatererLogin'));
const CatererRegister = lazy(() => import('./containers/Caterer/CatererRegister/CatererRegister'));
const CatererLogout = lazy(() => import('./containers/Caterer/CatererLogout/CatererLogout'));
const CatererMealOptions = lazy(() =>
  import('./containers/Caterer/CatererMealOptions/CatererMealOptions')
);
const CatererOrderHistory = lazy(() =>
  import('./containers/Caterer/CatererOrderHistory/CatererOrderHistory')
);
const CatererTodaysOrders = lazy(() =>
  import('./containers/Caterer/CatererTodaysOrders/CatererTodaysOrders')
);
const CatererManageMenu = lazy(() =>
  import('./containers/Caterer/CatererManageMenu/CatererMangeMenu')
);
const NotFound = lazy(() => import('./components/UI/NotFound/Notfound'));

class App extends Component {
  state = {
    loginType: 'user'
  };
  componentWillMount() {
    if (window.location.pathname.includes('admin')) {
      this.setState({ loginType: 'caterer' });
    }
  }
  componentDidMount() {
    this.autoLogin();
  }

  autoLogin = () => {
    if (this.state.loginType === 'user' && !this.props.userAuthenticated) {
      this.props.onTryAutoLogin();
    } else if (this.state.loginType === 'caterer' && !this.props.catererAuthenticated) {
      this.props.onCatererAutoLogin();
    } else {
      return null;
    }
  };
  render() {
    const ProtectedUserRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.userAuthenticated ? (
            <Suspense fallback={<Loading />}>
              <Component {...props} />
            </Suspense>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );

    const ProtectedCatererRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.catererAuthenticated ? (
            <Suspense fallback={<Loading />}>
              <Component {...props} />
            </Suspense>
          ) : (
            <Redirect to="/admin/login" />
          )
        }
      />
    );

    const LazyRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => (
          <Suspense fallback={<Loading />}>
            <Component {...props} />
          </Suspense>
        )}
      />
    );
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <LazyRoute path="/login" component={UserLogin} />
        <LazyRoute path="/register" component={UserRegister} />
        <ProtectedUserRoute path="/menu" component={Menu} />
        <ProtectedUserRoute path="/order-history" component={OrderHistory} />
        <ProtectedUserRoute path="/orders" component={Orders} />
        <LazyRoute path="/logout" component={UserLogout} />
        <ProtectedCatererRoute exact path="/admin/" component={CatererHome} />
        <LazyRoute path="/admin/login" component={CatererLogin} />
        <LazyRoute path="/admin/register" component={CatererRegister} />
        <ProtectedCatererRoute path="/admin/meals" component={CatererMealOptions} />
        <ProtectedCatererRoute path="/admin/order-history" component={CatererOrderHistory} />
        <ProtectedCatererRoute path="/admin/todays-orders" component={CatererTodaysOrders} />
        <ProtectedCatererRoute path="/admin/menu" component={CatererManageMenu} />
        <LazyRoute path="/admin/logout" component={CatererLogout} />
        <LazyRoute component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthenticated: state.auth.userAuthenticated,
    catererAuthenticated: state.auth.catererAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.userAuthCheckState()),
    onCatererAutoLogin: () => dispatch(actions.catererAuthCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
