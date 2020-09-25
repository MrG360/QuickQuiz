import React, { Component } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';
import '../../../assets/styles/createTest.css';
import { FetchQuestions, createTest } from './CreateTestUtil';

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
                    Make sure you entered all fields and added atleast one question.
                </Form>
            </Modal.Body>
        </Modal>
    );
}

function TestMessageModal(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Test Created</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    Test Key: {props.testkey}
                </Form>
            </Modal.Body>
        </Modal>
    );
}

class CreateTest extends Component {
    tableBodyDataArray = []
    state = {
        bodyData: this.tableBodyDataArray,
        testMessageModalShow: false,
        errorMessageModalShow: false,
        Title: "",
        Time: "",
        testKey: "",
        Branch: "CSE"
    }

    handleFormInputs = async(event) => {
        let name = event.target.name;
        let val = event.target.value;
        await this.setState({
            [name]: val
        })
        if(name === "Branch") {
            this.tableBodyDataArray= []
            FetchQuestions(this.tableBodyDataArray, this.showData, this.state.Branch)
        }
    }

    showData = () => {
        this.setState({
            bodyData: this.tableBodyDataArray
        })
    }

    showModal = (testKey) => {
        this.setState({
            testKey,
            testMessageModalShow: true
        })
    }

    showErrorModal = () => {
        this.setState({
            errorMessageModalShow: true
        })
    }

    createTest = () => {
        createTest(this.state , this.showModal, this.showErrorModal)
        this.setState({Branch: "CSE"})
    }

    componentDidMount() {
        FetchQuestions(this.tableBodyDataArray, this.showData, this.state.Branch)
    }

    render() {
        return (
            <div className="create-test-container">
                <Form>
                    <Form.Group>
                        <Form.Label><h3>Test Title:</h3></Form.Label>
                        <Form.Control name="Title" type="text" placeholder="Enter Test Title" onChange={this.handleFormInputs} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><h3>Test Time:</h3></Form.Label>
                        <Form.Control name="Time" type="number" placeholder="Enter Test Time(In Minutes)" onChange={this.handleFormInputs} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><h3>Branch:</h3></Form.Label>
                        <Form.Control name="Branch" as="select" onChange={this.handleFormInputs}>
                            <option value="CSE" defaultValue>CSE</option>
                            <option value="CE">CE</option>
                            <option value="ME">ME</option>
                            <option value="ECE">ECE</option>
                        </Form.Control>
                    </Form.Group>
                    <h3>Select Questions:</h3>
                    <Table className="table-style" responsive striped bordered>
                        <thead className="thead-dark">
                            <tr>
                                <th>S No</th>
                                <th>Question</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            {this.state.bodyData}
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={this.createTest}>
                        Create Test
                    </Button>
                    <TestMessageModal
                        show={this.state.testMessageModalShow}
                        onHide={() => {
                            this.setState({ testMessageModalShow: false })
                            window.location.reload();
                        }}
                        testkey={this.state.testKey}
                    />
                    <ErrorMessageModal
                        show={this.state.errorMessageModalShow}
                        onHide={() => {
                            this.setState({ errorMessageModalShow: false })
                        }}
                    />
                </Form>
            </div>
        )
    }
}

export default CreateTest;