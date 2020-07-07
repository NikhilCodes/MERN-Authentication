import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Axios from "axios";
import '../App.css';

export class LoginSpace extends Component {

  apiUrl = 'http://localhost:5000/login'

  state = {
    email: '',
    password: ''
  }

  handleInputDataChange = (element) => {
    this.setState({
      [element.target.name]: element.target.value
    })
  }

  render() {
    return (
        <div>
          <input name="email" type="text" placeholder="email" className="AuthInputBox" spellCheck="false"
                 autoComplete="off"
                 onChange={(e) => this.handleInputDataChange(e)} value={this.state.email}/> <br/>
          <input name="password" type="password" placeholder="password" className="AuthInputBox" spellCheck="false"
                 autoComplete="off"
                 onChange={(e) => this.handleInputDataChange(e)} value={this.state.password}/>
          <br/>
          <button className="AuthDetailsSubmitButton" onClick={() => {
            let payload = {email: this.state.email, password: this.state.password}
            Axios.post(`${this.apiUrl}`, payload).then(res => {
              this.props.getProfileDataFunc(res.data)
            }).catch(error => {
              console.log(error)
            })
            this.setState({
              email: '',
              password: ''
            })
          }}>
            Log In
          </button>
        </div>
    )
  }
}

export class RegisterSpace extends Component {

  apiUrl = 'http://localhost:5000/register'

  state = {
    email: '',
    username: '',
    password: ''
  }

  handleInputDataChange = (element) => {
    this.setState({
      [element.target.name]: element.target.value
    })
  }

  render() {
    return (
        <div>
          <input name="email" type="text" placeholder="email" className="AuthInputBox" spellCheck="false"
                 autoComplete="off"
                 onChange={(e) => this.handleInputDataChange(e)} value={this.state.email}/> <br/>
          <input name='username' type="text" placeholder="username" className="AuthInputBox" spellCheck="false"
                 autoComplete="off"
                 onChange={(e) => this.handleInputDataChange(e)} value={this.state.username}/> <br/>
          <input name="password" type="password" placeholder="password" className="AuthInputBox" spellCheck="false"
                 autoComplete="off"
                 onChange={(e) => this.handleInputDataChange(e)} value={this.state.password}/>

          <button className="AuthDetailsSubmitButton" onClick={() => {
            let payload = {email: this.state.email, username: this.state.username, password: this.state.password}
            Axios.post(`${this.apiUrl}`, payload).then(res => {
              console.log(res.data)
            }).catch(error => {
              console.log(error)
            })
            this.setState({
              email: '',
              username: '',
              password: ''
            })
          }}>
            Sign Up
          </button>
        </div>
    )
  }
}