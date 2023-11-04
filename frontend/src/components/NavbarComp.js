import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class NavbarComp extends Component {
  render() {
    return (
      <Navbar expand="lg" className="body-tertiary" style={{borderRadius:"50%"}}>
      <Container fluid>
          <Form className="d-flex">
            <Form.Control /*style={{width:"250px"}}*/ style={{width:"400px"}}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" style={{backgroundColor:"#0000FF", color:"white", borderColor:"#0000FF"}}>Search</Button>
          </Form>
      </Container>
    </Navbar>
    )
  }
}