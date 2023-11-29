import React, { useState, useEffect, Component } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';



export default class NavbarComp extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  */
  state = { term: ''};

  /*
  toggleClass() {
   
  };
  */

  onInputChange = (event) => {
    this.setState({term:event.target.value})
  };

  render() {
    return (
      <Navbar expand="lg" className="body-tertiary" style={{borderRadius:"50%"}}>
      <Container fluid>
          <Form className="d-flex">
            <Form.Control style={{width:"400px"}}
              //type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" onClick={this.onInputChange} value={this.state.term} style={{backgroundColor:"#0000FF", color:"white", borderColor:"#0000FF"}}>Search</Button>
          </Form>
      </Container>
    </Navbar>
    )
  }
}