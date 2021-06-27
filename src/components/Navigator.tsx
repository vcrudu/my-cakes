import React, { Component } from 'react';
import { Navbar, Nav, Button, Container, Dropdown, } from 'react-bootstrap';
import logo from '../assets/logo.png';

function Navigator() {
  return (
    <Navbar expand='lg' style={{ backgroundColor: '#F8F8F8' }}>
      <Navbar.Brand href="/">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src={logo} alt='' style={{ width: '50px', height: '50px' }} />
          <div style={{ alignSelf: "center", marginLeft: '10px' }}>MY CAKES</div>
        </div>
      </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/new">New cake</Nav.Link>
        </Nav>
    </Navbar>
  );
}

export default Navigator