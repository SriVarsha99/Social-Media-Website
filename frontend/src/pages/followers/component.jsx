import React from 'react';
import styles from './followers.scss';
import Button from 'react-bootstrap/Button';
import { FaSearch } from "react-icons/fa";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


const data = [
  { name: "Anom", age: 19, gender: "Male" },
  { name: "Megha", age: 19, gender: "Female" },
  { name: "Subham", age: 25, gender: "Male" },
]

const Followers = () => (
  <div className="followers">
      <div className="container text-center">
          <div className="header">
            <br/>
                <InputGroup className="mb-3 search">
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
          </div>
          <div className="header">
          <h2> Requests</h2><br/>
          </div>
          <div className='container-body'>
            
        <Table hover>
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td><Button >Accept</Button>{' '}<Button variant="outline-danger">Decline</Button></td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td><Button variant="outline-success">Accept</Button>{' '}<Button variant="outline-danger">Decline</Button></td>
              </tr>
              <tr>
                <td>John</td>
                <td><Button variant="outline-success">Accept</Button>{' '}<Button variant="outline-danger">Decline</Button></td>
              </tr>
              <tr>
                <td>Matt</td>
                <td><Button variant="outline-success">Accept</Button>{' '}<Button variant="outline-danger">Decline</Button></td>
              </tr>
            </tbody>
           </Table>
           </div>
        </div>
  </div>
);

export default Followers;
