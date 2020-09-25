import React, { Component } from 'react';
import '../../../assets/styles/viewResults.css';
import { Table } from 'react-bootstrap';
import FetchResults from './ResultsUtil';

class Result extends Component {
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
            <div className="result-content">
                <h2>Results:</h2>
                <Table className="result-table-style" responsive striped bordered>
                    <thead className="thead-dark">
                        <tr>
                            <th>S. No.</th>
                            <th>User Name</th>
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
        )
    }
}

export default Result;