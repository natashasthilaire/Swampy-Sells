import React from "react";
import { useSearch } from "../context/Search";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:5003/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar expand="lg" className="body-tertiary" style={{borderRadius:"50%"}}>
    <Container fluid>
        <Form className="d-flex" role="search" onSubmit={handleSubmit} >
          <Form.Control style={{width:"400px"}}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <Button variant="outline-success" type="submit" style={{backgroundColor:"#0000FF", color:"white", borderColor:"#0000FF"}}>Search</Button>
        </Form>
    </Container>
  </Navbar>
  );
};

export default SearchInput;