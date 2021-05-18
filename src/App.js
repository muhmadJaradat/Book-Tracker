import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
// import MyFavoriteBooks from './BestBooks'
import BestBooks from './BestBooks';
import Login from './Login';
import Profile from './profile';
import { withAuth0 } from '@auth0/auth0-react';
// import LoginButton from './LoginButton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
// import { render } from '@testing-library/react';



class App extends React.Component {
  render() {
  
    const { isAuthenticated } = this.props.auth0;

    console.log(isAuthenticated);

    return (
      <>

        <BrowserRouter>
          <Router>
            <IsLoadingAndError>
              <Header />
              <Switch>
                <Route exact path="/">
                  {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                  {isAuthenticated &&
                    <BestBooks />
                  }
                  {!isAuthenticated &&
                    <Login />
                  }
                </Route>
                <Route exact path='/profile'>
                  {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                  <Profile />
                </Route>
              </Switch>
              <Footer />
            </IsLoadingAndError>
          </Router>
        </BrowserRouter>
      </>
    );
  }
}


export default withAuth0(App);
