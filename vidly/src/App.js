import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/navbar";
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from "./components/registerForm";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieForm from './components/movieForm';
import NotFound from "./components/notFound";
import { getCurrentUser } from './services/authService';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


class App extends Component {

  state = {}

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user: user });
  }
  

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <ProtectedRoute path="/movies/:id" component={MovieForm}></ProtectedRoute>
            <Route 
            path="/movies"
            render={props =>  <Movies {...props} user={this.state.user} /> }>
            </Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
