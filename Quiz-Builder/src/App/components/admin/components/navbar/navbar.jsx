import React, { Component } from 'react';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import '../../../../assets/styles/navbar.css';
import AddQuestion from '../AddQuestion/AddQuestion';

class navbar extends Component {
    state = {
        addQuestionModalShow: false
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Navbar.Brand href="/admin" className="nav-brand">Quiz Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={ () => this.setState({ addQuestionModalShow: true }) }>Add Question</Nav.Link>
                    <Nav.Link href="/admin/viewQuestions">View Questions</Nav.Link>
                    <Nav.Link href="/admin/createTest">Create Test</Nav.Link>
                    <Nav.Link href="/admin/viewTests">View Tests</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-light" onClick={ () => { sessionStorage.clear() }} href="/">Logout</Button>
                </Form>
                </Navbar.Collapse>
                <AddQuestion 
                    addQuestionModalState={ this.state.addQuestionModalShow } 
                    hideAddQuestionModal= { () => this.setState({ addQuestionModalShow: false })} 
                />
            </Navbar>
        )
    }
}

export default navbar;