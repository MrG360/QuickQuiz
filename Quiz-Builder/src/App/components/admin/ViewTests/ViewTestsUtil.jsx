import React from 'react';
import { Button } from 'react-bootstrap';

import { server } from '../../../config/server.json';

function FetchTests(bodyDataArray, showData, Branch) {
    fetch(`${server}/getTestsByBranch`, {
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
                bodyDataArray.push(
                    <tr>
                        <td colSpan="5">
                            <center><h3>Nothing here yet. Create Test First.</h3></center>
                        </td>
                    </tr>
                )
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    let id = result[i].Id
                    let _id = result[i]._id
                    bodyDataArray.push(
                        <tr key={i}>
                        <td>{parseInt(i + 1)}</td>
                        <td>{result[i].Title}</td>
                        <td>{result[i].Id}</td>
                        <td>
                            <Button
                                href="/admin/results" variant="primary"
                                onClick={() => sessionStorage.setItem("testId", _id)}>
                                View Result
                            </Button>
                        </td>
                        <td>
                            <Button variant="btn btn-danger" onClick={() => DeleteTest(id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>)
                }
            }
            showData()
        })
        .catch((error) => {
            console.error(error);
        });
}

function DeleteTest(Id) {
    fetch(`${server}/deleteTest`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Id: Id
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

export default FetchTests;
