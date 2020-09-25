import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/admin/admin';
import Login from './components/login/login';
import User from './components/user/user';

const Page = () => {
    if(sessionStorage.getItem("loginStatus") !== null) {
        if(sessionStorage.getItem("loginStatus") === "admin")
            return (
                    <Route path="*" component={Admin} />
            )
        else
            return (
                    <Route path="*" component={User} />
            )
    }
    return (
        <Route path="*" component={Login} />
    )
}

class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Page />
                </Switch>
            </Router>
        )
    }
}

export default Routes;