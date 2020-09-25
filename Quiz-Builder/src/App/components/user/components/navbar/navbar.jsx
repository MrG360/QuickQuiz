import React, { Component } from 'react';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import '../../../../assets/styles/navbar.css';

class navbar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Navbar.Brand className="nav-brand">{`Hi, ${sessionStorage.getItem("username")}`}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/user">Available Tests</Nav.Link>
                    <Nav.Link href="/user/testAttempts">Test Attempts</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-light" onClick={ () => { sessionStorage.clear() } } href="/">Logout</Button>
                </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default navbar;