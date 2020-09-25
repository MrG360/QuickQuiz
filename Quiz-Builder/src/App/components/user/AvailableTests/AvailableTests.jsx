import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar';
import { Table } from 'react-bootstrap';
import FetchTests from './AvailableTestsUtil';
import '../../../assets/styles/availableTests.css';

class AvailableTests extends Component {
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
        FetchTests(this.tableBodyDataArray, this.showData)
    }

    render() {
        return (
            <div className="availableTests-body">
                <Navbar />
                <div className="result-content">
                    <h2>Tests:</h2>
                    <Table className="result-table-style" responsive striped bordered>
                        <thead className="thead-dark">
                            <tr>
                                <th>S. No.</th>
                                <th>Test Title</th>
                                <th>Total Marks</th>
                                <th>Link</th>
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

export default AvailableTests;