import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';
import Loader from './Loader';

import TextInput from './FormElements/TextInput';
import { validateId } from './utils';
import SignUpOrLogInForm from './SignUpOrLogInForm';
import SubmitButton from './FormElements/SubmitButton';
import user from './user';
import PropTypes from 'prop-types';

import './RegisterEvent.css';

class RegisterEventHeader extends Component {
  render() {
    return (
      <div className="RegisterEvent-header">
        <div className="RegisterEvent-title">
          <h1>Registering for <span className="RegisterEvent-eventname">{this.props.event.name }</span></h1>
        </div>
        <div className="RegisterEvent-instructions">
          <div className="RegisterEvent-memberSize">
            Team size:&nbsp;
            <span className="RegisterEvent-teamsize">
            { this.props.maxSize === 1 || this.props.maxSize == this.props.minSize ? this.props.minSize : this.props.minSize + ' - ' + this.props.maxSize }
            </span>
          </div>
          <div className="RegisterEvent-help">
          Please enter the PECFEST ID's of your team members. If you want to enter extra members, then click `Add Member`.
          </div>
        </div>
      </div>
    )
  }
}

class RegisterEventInternal extends Component {
  constructor(props) {
    super(props);

    const inputs = [ 'user1' ];
    const values = [ '']
    if (typeof this.props.minSize !== 'undefined' && this.props.minSize > 1) {
      for (let i = 1; i < this.props.minSize; i++) {
        inputs.push('user' + (i+1));
      }
    }
    this.state = {
      inputs: inputs,
      values: {
        user1: {
          user: user.currentUser,
          value: user.currentUser.pecfestId,
          verified: true,
          error: false
        },
      },
      leader: user.currentUser.pecfestId,
    }
  }

  handleError = (name, value, message) => {
    const values = { ...this.state.values };
    values[name].error = true;
    values[name].verified = false;
    this.setState({ values });
  }

  handleSuccess = (name, value, user) => {
    const values = { ...this.state.values };
    values[name] = Object.assign({}, values[name], { verified: true, error: false, user: user });
    this.setState({ values });
  }

  handleChange = (name, { target }) => {
    const values = this.state.values;

    if (name == 'leader') {
      this.setState({ leader: target.value });
      return;
    }

    values[name] = { value: target.value, verified: false, error: false };

    validateId(target.value, { onError: this.handleError.bind(this, name), onSuccess: this.handleSuccess.bind(this, name) });

    this.setState({ values });
  }

  handleRegister = () => {
    this.setState({ registering: false, done: true });
    setTimeout(this.props.onSuccess, 1500);
  }

  handleFailed = (error) => {
    this.setState({ registering: false, error: true, errMessage: (error.message || 'Unknown error occurred.')});
  }

  handleSubmit = event => {
    event.stopPropagation();
    event.preventDefault();

    if (this.state.inputs.length < this.props.minSize) {
      return;
    }

    let members = [];
    let allCorrect = true;
    this.state.inputs.forEach(input => {
      if (typeof this.state.values[input] === 'undefined')
        return;
      if (this.state.values[input].error) {
        allCorrect = false;
        return;
      }

      members.push(this.state.values[input].value);
    })

    if (members.length < this.props.minSize || !allCorrect) {
      return;
    }

    user.registerEvent(this.props.event, members, this.state.leader, {
      onSuccess: this.handleRegister,
      onFailed: this.handleFailed,
    })
    this.setState({ registering: true });
  }

  handleAddExtra = event => {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.maxSize <= this.state.inputs.length)
      return;
    const inputs = [ ...this.state.inputs ];
    inputs.push('user' + (inputs.length + 1));
    this.setState({ inputs });
  }

  handleCancel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onCancel();
  }

  render() {
    let allVerified = true;
    let members = [];
    const inputs = this.state.inputs.map((input, i) => {
      const value = typeof this.state.values[input] === 'undefined' ? '' : this.state.values[input].value;
      const wrongInput = typeof this.state.values[input] === 'undefined' ? false : !this.state.values[input].verified;

      if (typeof this.state.values[input] !== 'undefined') {
        if (this.state.values[input].error) {
          allVerified = false;
        } else {
          members.push(this.state.values[input].value);
        }
      }

      return (
        <div className="MemberInput"
            key={input}
          >
          <small htmlFor={input} style={{display: 'block'}}>Member {i + 1}</small>
          <TextInput
            placeholder={'PECFEST ID'}
            name={input}
            value={value}
            wrongInput={wrongInput}
            onChange={this.handleChange.bind(this, input)}
            disabled={input === 'user1'}
          />
        </div>
      );
    });

    if (this.state.registering) {
      return (
        <div className="RegisterEvent">
          <RegisterEventHeader { ...this.props} />
          <Loader color="gray" />
        </div>
      )
    }

    if (this.state.done) {
      return (
        <div className="RegisterEvent">
          <RegisterEventHeader {...this.props} />
          <div className="success">
            <p>Successfully registered for <span className="RegisterEvent-eventname">{this.props.event.name}</span>.</p>
          </div>
        </div>
      )
    }

    return (
        <div className="RegisterEvent">
          <RegisterEventHeader {...this.props} />
          <form className="RegisterEvent-form" onSubmit={this.handleSubmit}>
            {
              inputs
            }
            {
              this.props.maxSize === 1 || this.state.inputs.length === 1 ? "" :
                <div className="MemberInput">
                  <small htmlFor={'leader'} style={{ display: 'block' }}>Team Leader</small>
                  <select className="MemberInput-select" onChange={this.handleChange.bind(this, 'leader')}>
                    {
                      members.map((member, i) => {
                        return (
                          <option value={member} key={i}>{member}</option>
                        )
                      })
                    }
                  </select>
                </div>
            }
            {
              this.state.error ?
                <p className="SignUpForm-ErrorMessage">
                  { this.state.errMessage }
                </p> : ""
            }
            <div className="SubmitButton" style={{width: '100%', textAlign: 'right'}}>
              <button
                className="RegisterEvent-addButton FormButton waves-effect btn-flat"
                onClick={this.handleAddExtra}
                disabled={this.props.maxSize <= this.state.inputs.length}>
                Add Member
              </button>

              <button
                className="FormButton"
                onClick={this.handleCancel}
                >
                Cancel
              </button>

              <SubmitButton disabled={!allVerified} />
            </div>
          </form>
        </div>
    )
  }
}

export default class RegisterEvent extends Component {
  state = {
    closing: false,
    loggedIn: user.isLoggedIn(),
    success: false,
  }

  handleCancel = () => {
    this.setState({ closing: true });
  }

  handleLoggedIn = () => {
    this.setState({ loggedIn: true });
  }

  handleSuccess = () => {
    this.setState({ closing: true, success: true })
  }

  handleRest = () => {
    if (this.state.closing) {
      if (this.state.success) {
        this.props.onSuccess();
      } else {
        this.props.onCancel();
      }
    }
  }

  render() {
    return (
      <Motion onRest={this.handleRest} defaultStyle={{h: this.state.closing ? 0 : 100}} style={{ h: spring(this.state.closing ? 100 : 0, { stiffness: 300, damping: 30 }) }}>
      {
        style => {
          return (
            <div className="DialogBox" style={{ transform: `translateY(${style.h}px)`, opacity: 1 - style.h / 100 }}>
            {
              !this.state.loggedIn ?
                (<div className="RegisterEvent">
                  <RegisterEventHeader {...this.props} />
                  <p>
                  <Link to={"/register?continue=events/" + this.props.event.id}><strong>Login&nbsp;</strong></Link>
                  to register for <strong>{this.props.event.name}</strong>. Or <button className="FormButton" style={{padding: 0}} onClick={this.handleCancel}><strong>Cancel</strong></button>
                  </p>
                </div>) :
                <RegisterEventInternal
                  maxSize={this.props.maxSize}
                  minSize={this.props.minSize}
                  event={this.props.event}
                  onSuccess={this.handleSuccess}
                  onCancel={this.handleCancel} />
            }
            </div>
          )
        }
      }
      </Motion>
    )
  }
}

RegisterEvent.propTypes = {
  minSize: PropTypes.number.isRequired,
  maxSize: PropTypes.number.isRequired,
}
