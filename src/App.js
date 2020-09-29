import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Forgot from './components/auth/Forgot.js';
import Reset from './components/auth/Reset.js';
import PublicRoute from './PublicRoute.js';
import PrivateRoute from './PrivateRoute.js';
import AdminRoute from './AdminRoute.js';
import { AuthContext, AdminContext, getAuth, isAdmin } from "./components/auth/auth.js";
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.authStatus = this.authStatus.bind(this);
        this.setAuth = this.setAuth.bind(this);
        this.state = {
            isAuth: true,
            isAdmin: true
        };
        this.saveState = (page, state) => {
            this.setState({
                [page]: state
            });
        };
        this.restoreState = (page) => {
            return this.state[page];
        };
    }

    componentDidMount() {
        // this.authStatus();
    }

    authStatus() {
        let res = getAuth();

        res.then(data => {
            this.setState({
                isAuth: data.active,
                isAdmin: isAdmin()
            });
        });
    };

    setAuth(auth, admin) {
        this.setState({
            isAuth: auth,
            isAdmin: admin
        });
    };

    render() {
        const { isAuth } = this.state;
        const { isAdmin } = this.state;
        const { setAuth } = this;

        return (
            <AuthContext.Provider value={ { isAuth, setAuth } }>
                <AdminContext.Provider value={ { isAdmin } }>
                    <Router>
                        <div className="App">
                            <Header />
                            <div className="page-wrapper">
                                <Switch>
                                    <PublicRoute exact path="/register" component={Register} />
                                    <PublicRoute exact path="/login" component={Login} />
                                    <PublicRoute exact path="/forgot" component={Forgot} />
                                    <PublicRoute exact path="/reset/:token?" component={Reset} />
                                </Switch>
                            </div>
                            <Footer />
                        </div>
                    </Router>
                </AdminContext.Provider>
            </AuthContext.Provider>
        );
    }
}

export default App;
