import React from 'react';

import { server } from '../../../config/server.json';

function FetchResults(tableBodyDataArray, showTableData) {
    fetch(`${server}/getResult`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            TestId: sessionStorage.getItem("testId")
        })
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.length === 0) { 
                tableBodyDataArray.push(
                    <tr key="0">
                        <td colSpan="5">
                            <center><h3>Nothing here yet.</h3></center>
                        </td>
                    </tr>
                )
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    tableBodyDataArray.push(<tr key={i}>
                        <td>{parseInt(i + 1)}</td>
                        <td>{result[i].UserName}</td>
                        <td>{result[i].Score}</td>
                        <td>{result[i].Total}</td>
                        <td>{new Date(result[i].CreatedAt).toDateString()}</td>
                    </tr>)
                }
            }
            showTableData()
        })
        .catch((error) => {
            console.error(error);
        });
}

export default FetchResults;