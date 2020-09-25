import React, { Component } from 'react';
import Navbar from './components/navbar/navbar';
import Routes from './routes';
import '../../assets/styles/admin.css'

class Admin extends Component {
    state = {
        classname: ""
    }

    componentDidMount() {
        if(window.location.pathname === "/admin/createTest")
            this.setState({ classname: "admin-body-no-image" })
        else
            this.setState({ classname: "admin-body" })
    }

    render() {
        return (
            <div className={this.state.classname}>
                <Navbar />
                <Routes />
            </div>
        );
    }
}

export default Admin;