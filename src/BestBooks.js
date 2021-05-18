import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';
import './BestBooks.css';
import FormModal from './FormModal'
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';



class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      books: [],
      loading: false,
      showModalForm: false,
      bookName:'',
      bookDescription:'',
    };
  }
  handleShow = () => this.setState({ showModalForm: true })
  handleClose = () => this.setState({ showModalForm: false });

  updateBookName = (e)=> this.setState({bookName: e.target.value});
  updateBookDescription = (e)=> this.setState({bookDescription: e.target.value});
  getBooks = async () => {
    const { user } = this.props.auth0;
    try {

      const url = `${process.env.REACT_APP_MY_SERVER_URL}/books?email=${user.email}`;
      const bookRequest = await axios.get(url);

      this.setState({
        books: bookRequest.data[0].books,
        loading: true,
        error: '',
      });
      console.log(this.state.books);

    } catch (err) {
      this.setState({
        loading: false,
        error: err
      });
    }
  }

  componentDidMount() {

    this.getBooks();
  }


  render() {
    const { isAuthenticated } = this.props.auth0;
    // console.log(this.props.auth0);
    return (
      <>
        { isAuthenticated &&
          <Jumbotron>
            <ListGroup variant="flush">
              <ListGroup.Item><h1>My Favorite Books</h1></ListGroup.Item>

              <Button style={{ width: '10%', margin: '0 auto' }} onClick={this.handleShow}>Add new book</Button>
              {
                this.state.books.map(data => {
                  return <ListGroup style={{ width: '18rem', margin: '20px' }}> <Card style={{ width: '18rem', }} >
                    <Card.Body>
                      <Card.Title>{data.name}</Card.Title>

                      <Card.Text>
                        {data.description}
                      </Card.Text>

                    </Card.Body>
                  </Card>
                  </ListGroup>
                }
                )
              }




            </ListGroup>
          </Jumbotron>
        }
        <FormModal showModalForm={this.state.showModalForm} handleClose={this.handleClose} />
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
