import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';



class MyFavoriteBooks extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    console.log(this.props.auth0);
    return (
      <>
        { isAuthenticated &&
          <Jumbotron>
            <ListGroup variant="flush">
              <ListGroup.Item><h1>My Favorite Books</h1></ListGroup.Item>
              <ListGroup.Item><h1>book number 1</h1></ListGroup.Item>
              <ListGroup.Item><h1>book number 2</h1></ListGroup.Item>
              <ListGroup.Item><h1>book number 3</h1></ListGroup.Item>

            </ListGroup>
          </Jumbotron>
  }
      </>
    )
  }
}

export default withAuth0 (MyFavoriteBooks);
