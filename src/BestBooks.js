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
import UpdateForm from './UpdateForm'



class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      books: [],
      loading: false,
      showModalForm: false,
      bookName: '',
      bookDescription: '',
      status:'',
      showForTheUpdateForm:false,
    };
  }
  handleShow = () => this.setState({ showModalForm: true })
  handleClose = () => this.setState({ showModalForm: false });
  handleCloseForUpdateForm = () => this.setState({ showForTheUpdateForm: false });

  updateBookName = (e) => {
    this.setState({ bookName: e.target.value })
    console.log(this.state.bookName);
  };
  updateBookDescription = (e) => this.setState({ bookDescription: e.target.value });
  //getting the data from the backend
  


  //adding a new book function
  addBook = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_MY_SERVER_URL}/books`;
    
    const sendedBook={
      email:this.state.email,
      name: this.state.bookName,
      description:this.state.bookDescription,
      status:this.state.status,
    }
    const newBooks = await axios.post(url,sendedBook);
    console.log('newBooks',newBooks);

    this.setState({
     books:newBooks.data
    });
    console.log('newBooks',newBooks);

  } 

  // Deleting book
  removeBook = async (index)=>{

    const booksAfterDeletion = this.state.books.filter((book, idx)=>{
      return idx !== index;
    });

    this.setState({
      books: booksAfterDeletion
    });
    
    const {user} = this.props.auth0
    const query = {
      email: user.email
    }
    await axios.delete(`${process.env.REACT_APP_MY_SERVER_URL}/books/${index}`, {params: query});
  };

  updateForm = (i) => {
    const newBooks = this.state.books.filter((value, index) => {
      return i === index
    });
    // console.log(this.state.books);
    this.setState({
      index: i,
      bookName: newBooks.name,
      bookDescription: newBooks.description,
      bookStatus:newBooks.status,
      showForTheUpdateForm: true,
    });
  }


  //Updating the book data

  updateBooks = async (e) => {
    e.preventDefault();
    const reqBody = {
      name: this.state.bookName,
      description: this.state.bookDescription,
      status: this.state.bookStatus,
      email: this.state.email
  }
  const updatedBooks = await axios.put(`${process.env.REACT_APP_MY_SERVER_URL}/books/${this.state.index}`, reqBody);
  this.setState({
    books: updatedBooks.data
  });
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
      books: bookRequest.data,
      loading: true,
      error: '',
      email:user.email,
    });
    console.log(this.state.books);

  } catch (err) {
    console.log(err);
    this.setState({
      loading: false,
      error: err
    });
  }
}


render() {
  const { isAuthenticated } = this.props.auth0;
  // console.log(this.props.auth0);
  console.log(this.state.books);
  return (
    <>
      { isAuthenticated &&
        <Jumbotron>
          <ListGroup variant="flush">
            <ListGroup.Item><h1>My Favorite Books</h1></ListGroup.Item>

            <Button style={{ width: '10%', margin: '0 auto' }} onClick={this.handleShow}>Add new book</Button>
            {
              this.state.books.map((data,idx) => {
                return <ListGroup style={{ width: '18rem', margin: '20px' }}> <Card style={{ width: '18rem', }} >
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>

                    <Card.Text>
                      {data.description}
                    </Card.Text>

                  </Card.Body>
                  <Button onClick={() => this.removeBook(idx)} variant="danger">Delete!</Button>
                  <Button style={{marginTop:'5px'}} onClick={(i) => this.updateForm(i)} variant="success"> Update!</Button>
                </Card>
                </ListGroup>
              }
              )
            }




          </ListGroup>
        </Jumbotron>
      }
      <FormModal showModalForm={this.state.showModalForm}
        handleClose={this.handleClose}
        updateBookName={this.updateBookName}
        updateBookDescription={this.updateBookDescription}
        addBook={this.addBook}
        bookName={this.bookName}
        email={this.state.email}
      />

      <UpdateForm
      handleClose={this.handleCloseForUpdateForm}
      updateBookName={this.updateBookName}
      email={this.state.email}
      updateBookDescription={this.updateBookDescription}
      addBook={this.addBook}
      bookName={this.state.bookName}
      bookDescription={this.state.bookDescription}
      bookStatus={this.state.bookStatus}
      updateBooks={this.updateBooks}
      showForTheUpdateForm={this.state.showForTheUpdateForm}
      />

    </>
  )
}
}

export default withAuth0(MyFavoriteBooks);
