import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { withRouter } from 'react-router-dom';

import user from './user';

import './SignUpOrLoginForm.css';

class SignUpOrLoginForm extends Component {
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

  handleCancel = () => {

    let continueUrl = '/';
    let search = this.props.location.search.slice('?continue='.length);
    if (search.length > 0) {
      continueUrl = search;
    }
    this.props.history.push(continueUrl);
  }

  handleLogin = (pecfestId) => {
    this.setState({ loggedIn: true, pecfestId: pecfestId })
    setTimeout(this.handleCancel, 1000);
  }

  handleSignup = (pecfestId) => {
    this.setState({ loggedIn: true, pecfestId: pecfestId })
    user.login(pecfestId, {
      onSuccess: this.handleCancel,
      onFailed: this.handleCancel,
    })
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
            onClick={window.location.pathname.startsWith('/register') ? this.handleCancel : this.props.onCancel}>Cancel</button>
        </div>
        <div className="Divider" />
        {
          this.state.loggedIn ? <h1 style={{ }}>You are logged in as <strong>{this.state.pecfestId}</strong></h1> :
            <div className="SignUpOrLoginForm-form">
            {
              this.state.form == 'signup' ?
                  <SignUpForm onSignUp={this.handleSignup} onContinueToLogin={this.handleClick.bind(this, 'login')} /> :
                  <LoginForm onLogin={this.handleLogin} />
            }
            </div>
        }
      </div>
    )
  }
}


export default withRouter(SignUpOrLoginForm)
