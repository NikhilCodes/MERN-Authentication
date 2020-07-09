import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import {LoginSpace, RegisterSpace} from "./components/AuthSubSections";

class AuthFieldContainer extends Component {

  routeToPath = (path) => {
    window.location.href = `/${path}`
  }

  render() {
    return (
        <div className="AuthFieldsContainer">
          <button className="AuthModeButton" style={{
            borderRadius: "20px 0 0 0",
            borderLeft: "none",
            borderRight: "1px solid white",
          }} onClick={() => this.routeToPath("login")}>Log In
          </button>
          <button className="AuthModeButton" style={{
            borderRadius: "0 20px 0 0",
            borderLeft: "1px solid white",
            borderRight: "none"
          }} onClick={() => this.routeToPath("register")}>Register
          </button>
          <div className="AuthFieldsSubContainer">
            <Router>
              <Route exact path="/" component={() => <LoginSpace getProfileDataFunc={this.props.getProfileDataFunc}/>}/>
              <Route exact path="/login"
                     component={() => <LoginSpace getProfileDataFunc={this.props.getProfileDataFunc}/>}/>
              <Route exact path="/register"
                     component={() => <RegisterSpace getProfileDataFunc={this.props.getProfileDataFunc}/>}/>
            </Router>
          </div>
        </div>
    );
  }

}

class UserProfile extends Component {
  render() {
    if (this.props.userIsLoggedIn) {
      return (
          <div>
            <h1>Profile</h1>
            <hr/>
            <h3>Welcome {this.props.data.user.username}</h3>
            <h3>Email: {this.props.data.user.email}</h3>
          </div>
      )
    } else {
      return (
          <div>
            <h1>404 Error</h1>
            <h3>User Not Logged In</h3>
          </div>
      )
    }
  }
}

function RedirectToProfile(props) {
  if (props.isLoggedIn)
    return <Redirect to="/profile"/>
  return null
}

class App extends Component {

  state = {
    isLoggedIn: false,
    userData: {}
  }

  getProfileData = (userData) => {
    this.setState({
      isLoggedIn: true,
      userData,
    })
  }

  render() {
    return (
        <div className="App">
          <Router>
            <RedirectToProfile isLoggedIn={this.state.isLoggedIn}/>
            <Route exact path='/' component={() => <AuthFieldContainer getProfileDataFunc={this.getProfileData}/>}/>
            <Route exact path='/login'
                   component={() => <AuthFieldContainer getProfileDataFunc={this.getProfileData}/>}/>
            <Route exact path='/register'
                   component={() => <AuthFieldContainer getProfileDataFunc={this.getProfileData}/>}/>
            <Route exact path='/profile'
                   component={() => <UserProfile userIsLoggedIn={this.state.isLoggedIn} data={this.state.userData}/>}/>
          </Router>
        </div>
    )
  }
}

export default App;
