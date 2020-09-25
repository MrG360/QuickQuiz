import { server } from '../../../config/server.json';

function submitKey(testKey, props, showErrorModal) {
    fetch(`${server}/getTestByKey`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Key: testKey
        })
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.length) {
            sessionStorage.setItem("testId", result[0]._id);
            props.history.push('/user/test');
            window.location.reload();
        }
        else {
            showErrorModal()
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

export default submitKey;