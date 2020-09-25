import { server } from '../../config/server.json';

function loginUser(Credentials, props, showErrorMessage) {
    fetch(`${server}/loginUser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Email: Credentials.Email,
            Password: Credentials.Password,
        })
    })
    .then((response) => response.json())
    .then((result) => {
        if (result === false) {
            showErrorMessage();
          }
          else if (result.Type === "Admin") {
            sessionStorage.setItem("loginStatus", "admin");
            props.history.push('/admin');
          }
          else {
            sessionStorage.setItem("username", result.Name);
            sessionStorage.setItem("useremail", result.Email);
            sessionStorage.setItem("userbranch", result.Branch);
            sessionStorage.setItem("loginStatus", "user");
            props.history.push('/user');
          }
    })
    .catch((error) => {
        console.error(error);
    });
}

function registerUser(Credentials, state, showErrorMessage, onRegister) {
    fetch(`${server}/registerUser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Name: Credentials.Name,
            Email: Credentials.Email,
            Password: Credentials.Password,
            Type: "User",
            Branch: Credentials.Branch
        })
    })
    .then((response) => response.json())
    .then((result) => {
        if(result.status === false) {
            if(result.errCode === 11000)
                state.registerErrorMessage = "Email already Registered.";
            else
                state.registerErrorMessage = "Error while registering. Try again!"
            showErrorMessage();
        }
        else {
            onRegister();
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

export {
    loginUser,
    registerUser
}
