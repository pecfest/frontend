import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

import './SignUpOrLoginForm.css';

export default class SignUpOrLoginForm extends Component {
  state = {
    form: 'signup',
  }

  handleClick = (form) => {
    this.setState({ form });
  }

  componentDidMount() {
    this.overflow = document.body.style.overflow;
    document.body.style.overflow = 'auto'
  }

  componentWillUnmount() {
    document.body.style.overflow = this.overflow;
  }

  render() {
    return (
      <div className="SignUpOrLoginForm">
        <div className="SignUpOrLoginForm-options">
          <button className={"SignUpButton" + (this.state.form == 'signup' ? ' highlight' : '')}
            onClick={this.handleClick.bind(this, 'signup')}>Sign Up</button>
          <span className="light">&nbsp;or&nbsp;</span>
          <button className={"SignUpButton" + (this.state.form == 'login' ? ' highlight' : '')}
            onClick={this.handleClick.bind(this, 'login')}>Login</button>
          <span className="light">&nbsp;or&nbsp;</span>
          <button className={"SignUpButton"}
            onClick={this.props.onCancel}>Cancel</button>
        </div>
        <div className="Divider" />
        <div className="SignUpOrLoginForm-form">
        {
          this.state.form == 'signup' ?
              <SignUpForm onSignUp={this.props.onLoggedIn} /> :
              <LoginForm onLogin={this.props.onLoggedIn} />
        }
        </div>
      </div>
    )
  }
}
