import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar';
import { Table } from 'react-bootstrap';
import FetchResults from './TestAttemptsUtil';
import '../../../assets/styles/testAttempts.css';

class TestAttempts extends Component {
    tableBodyDataArray = []
    state = {
        bodyData: this.tableBodyDataArray
    }

    showData = () => {
        this.setState({
            bodyData: this.tableBodyDataArray
        })
    }

    componentDidMount() {
        FetchResults(this.tableBodyDataArray, this.showData)
    }

    render() {
        return (
            <div className="testAttempts-body">
                <Navbar />
                <div className="testAttempts-content">
                <h2>Results:</h2>
                <Table className="testAttempts-table-style" responsive striped bordered>
                    <thead className="thead-dark">
                        <tr>
                            <th>S. No.</th>
                            <th>Test Title</th>
                            <th>Marks</th>
                            <th>Total Marks</th>
                            <th>Submitted At</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {this.state.bodyData}
                    </tbody>
                </Table>
            </div>
            </div>
        )
    }
}

export default TestAttempts;