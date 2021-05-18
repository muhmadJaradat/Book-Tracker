import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
//bootstrap components
import Card from 'react-bootstrap/Card';

class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        console.log(this.props.auth0);
        console.log(user.picture);
        return (
            <>
                { isAuthenticated &&
                    <>
                      <Card style={{width:'20rem' , marginTop:'3rem'}}>
                      <Card.Img variant="top" src={user.picture} />
                      <Card.Body>
                        <Card.Text>Name: {user.name}</Card.Text>
                        <Card.Text>Email: {user.email}</Card.Text>
                        <Card.Footer>User Information</Card.Footer>
                      </Card.Body>
                      </Card>                       
                    </>

                }
            </>
        );
    }
}

export default withAuth0(Profile);