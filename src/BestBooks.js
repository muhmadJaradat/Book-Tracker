import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';



class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      books: [],
    };
  }
  componentDidMount() {

    this.getBooks();
  }
  getBooks = async () => {
    const { user } = this.props.auth0;
    try {

      const url = `${process.env.REACT_APP_MY_SERVER_URL}/books?email=${user.email}`;
      const bookRequest = await axios.get(url);
      this.setState({
        bookData: bookRequest.data[0].books,
        loading: false,
        error: '',
      });

    } catch (err) {
      this.setState({
        loading: false,
        error: err
      });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth0;
    console.log(this.props.auth0);
    return (
      <>
        { isAuthenticated &&
          <Jumbotron>
            <ListGroup variant="flush">
              <ListGroup.Item><h1>My Favorite Books</h1></ListGroup.Item>
              <ListGroup.Item><h1>book number 1:الملهاة الفلسطينية</h1></ListGroup.Item>
              <ListGroup.Item><h1>book number 2:احجار على رقعة الشطرنج</h1></ListGroup.Item>
              <ListGroup.Item><h1>book number 3:مئة عام من العزلة</h1></ListGroup.Item>

            </ListGroup>
          </Jumbotron>
        }
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
