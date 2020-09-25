import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar';
import { Form, Button, Modal } from 'react-bootstrap';
import '../../../assets/styles/testKey.css';
import submitKey from './TestKeyUtil';

function ErrorMessageModal(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Error</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Wrong Test Key!
                </Form>
            </Modal.Body>
        </Modal>
    );
}

class TestKey extends Component {
    state = {
        testKey: "",
        errorMessageModalShow: false
    }

    handleInput = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
          [name]: val
        })
    }

    showErrorModal = () => {
        this.setState({
            errorMessageModalShow: true
        })
    }

    submitKey = () => {
        submitKey(this.state.testKey, this.props, this.showErrorModal)
    }

    render() {
        return (
            <div className="testkey-body">
                <Navbar />
                <Form className="testkey-form">
                    <h1 className="title">Enter Test Key</h1><br/>
                    <Form.Group>
                        <Form.Control name="testKey" type="text" placeholder="Enter Test Key" onChange={this.handleInput} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.submitKey}>
                        Submit
                    </Button>
                </Form>
                <ErrorMessageModal
                        show={this.state.errorMessageModalShow}
                        onHide={() => {
                            this.setState({ errorMessageModalShow: false })
                        }}
                />
            </div>
        );
    }
}

export default TestKey;