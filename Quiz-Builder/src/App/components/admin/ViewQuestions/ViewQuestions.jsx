import React, { Component } from 'react';
import '../../../assets/styles/viewQuestions.css';
import { Table, Form } from 'react-bootstrap';
import FetchQuestions from './ViewQuestionsUtil';

class ViewQuestions extends Component {
    tableBodyDataArray = []
    state = {
        bodyData: this.tableBodyDataArray,
        Branch: "CSE"
    }

    showData = () => {
        this.setState({
            bodyData: this.tableBodyDataArray
        })
    }

    componentDidMount() {
        FetchQuestions(this.tableBodyDataArray, this.showData, this.state.Branch)
    }

    handleFormInputs = async(event) => {
        let name = event.target.name;
        let val = event.target.value;
        await this.setState({
            [name]: val
        })
        this.tableBodyDataArray = []
        FetchQuestions(this.tableBodyDataArray, this.showData, this.state.Branch)
    }

    render() {
        return (
            <div className="view-questions-content">
                <Form>
                    <Form.Group>
                        <Form.Label><h2>Branch:</h2></Form.Label>
                        <Form.Control name="Branch" as="select" onChange={this.handleFormInputs}>
                            <option value="CSE" defaultValue>CSE</option>
                            <option value="CE">CE</option>
                            <option value="ME">ME</option>
                            <option value="ECE">ECE</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <h2>Questions:</h2>
                <Table className="view-questions-table-style" responsive striped bordered>
                    <thead className="thead-dark">
                        <tr>
                            <th>S. No.</th>
                            <th>Question</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {this.state.bodyData}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ViewQuestions;