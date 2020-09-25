import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Test from './Test/Test';
import TestKey from './TestKey/TestKey';
import Submitted from './Submitted/Submitted';
import TestAttempts from './TestAttempts/TestAttempts';
import AvailableTests from './AvailableTests/AvailableTests';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/user" exact component={ AvailableTests } />
                    <Route path="/user/testAttempts" component={ TestAttempts } />
                    <Route path="/user/testkey" component={ TestKey } />
                    <Route path="/user/test" component={ Test } />
                    <Route path="/user/submitted" component={ Submitted } />
                    <Route path="*">
                        <Redirect to="/user" />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Routes;