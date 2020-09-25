import React from 'react';
import { Button } from 'react-bootstrap';

import { server } from '../../../config/server.json';
let Questions = [];
let testId = Math.round(new Date().getTime() + (Math.random() * 5));
let btn = [];

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
                    let Question = result[i];
                    tableBodyDataArray.push(<tr key={i}>
                        <td>{parseInt(i + 1)}</td>
                        <td>{result[i].Question}</td>
                        <td><Button ref={(ref) => btn[Question._id] = ref} variant="btn btn-outline-success" onClick={() => AddQuestion(Question)}>Add Question</Button></td>
                    </tr>)
                }
            }
            showTableData()
        })
        .catch((error) => {
            console.error(error);
        });
}

function AddQuestion(Question) {
    Questions.push(Question);
    btn[Question._id].setAttribute("class", "btn btn-success");
    btn[Question._id].setAttribute("disabled", "disabled");
    btn[Question._id].textContent = "Added";
}

function createTest(state, showModal, showErrorModal) {
    if (Questions.length > 0 && state.Title !== '' && state.Time !== '') {
        fetch(`${server}/createTest`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Title: state.Title,
                Id: testId,
                Questions: Questions,
                Time: state.Time,
                Branch: state.Branch
            })
        })
            .then((response) => response.json())
            .then((result) => {
                showModal(testId)
            })
    }
    else { 
        showErrorModal()
    }
}

export {
    FetchQuestions,
    createTest
}
