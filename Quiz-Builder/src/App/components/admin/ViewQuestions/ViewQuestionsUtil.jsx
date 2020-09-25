import React from 'react';
import { Button } from 'react-bootstrap';

import { server } from '../../../config/server.json';

function FetchQuestions(tableBodyDataArray, showTableData, Branch) {
    fetch(`${server}/getQuestionsByBranch`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Branch: Branch
        })
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.length === 0) { 
                tableBodyDataArray.push(
                    <tr>
                        <td colSpan="3">
                            <center><h3>Nothing here yet. Add some Questions.</h3></center>
                        </td>
                    </tr>
                )
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    let id = result[i]._id;
                    tableBodyDataArray.push(
                        <tr key={i}>
                        <td>{parseInt(i + 1)}</td>
                        <td>{result[i].Question}</td>
                        <td><Button variant="btn btn-danger" onClick={() => DeleteQuestion(id)}>Delete</Button></td>
                    </tr>)
                }
            }
            showTableData()
        })
        .catch((error) => {
            console.error(error);
        });
}

function DeleteQuestion(id) {
    fetch(`${server}/deleteQuestion`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then((response) => response.json())
        .then((result) => {
            window.location.reload()
        })
        .catch((error) => {
            console.error(error);
        });
}

export default FetchQuestions;
