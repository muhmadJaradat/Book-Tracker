import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login'
import LoginButton from './LoginButton';
import MyFavoriteBooks from './BestBooks'
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { render } from '@testing-library/react';



export class App extends Component {
  render(){
  const { isAuthenticated } = this.props.auth0;

    console.log(isAuthenticated);
    
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */
                !isAuthenticated? <MyFavoriteBooks/>:<Login/>}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );}
  
}

export default withAuth0(App);
