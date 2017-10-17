/* eslint-env jquery */
/* global $ */
import React, { Component } from 'react';
import { StaggeredMotion, Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';
import RegisterEvent from './RegisterEvent';
import trophy from './trophy.png';
import user from './user';
import { api } from './eventdb'

import './Event.css';


function populate_event_card(curr_event) {
    document.getElementById("register_button").style.display = '';

    //document.getElementById("register_button2").style.display = '';
    document.getElementById("event_name").innerHTML = curr_event.name;
    if (curr_event.shortDescription != undefined && curr_event.shortDescription.length > 1) {
        document.getElementById("event_info").style.display = '';
        document.getElementById("event_info").innerHTML = "<i>" + curr_event.shortDescription + "</i>";
    } else {
        document.getElementById("event_info").style.display = 'none';
    }
    // prizes
    if (curr_event.prize!=undefined && curr_event.prize.length>1) {
        var prizes_par = parseInt(curr_event.prize);
        if (prizes_par!=NaN && prizes_par>=100) {
            document.getElementById("prizes_worth").innerHTML = "Prizes Worth";
        } else {
            document.getElementById("prizes_worth").innerHTML = "Prizes";
        }
        document.getElementById("event_prize_wrapper").style.display = '';
        var prizes_split = curr_event.prize.split(';');
        var prizes_content = "";
        for (var x=0;x<prizes_split.length;x++) {
            prizes_content = prizes_content + "<code>" + prizes_split[x] + "</code>";
        }
        document.getElementById("event_prize").innerHTML = prizes_content;
    } else {
        document.getElementById("trophy").style.display = 'none';
        document.getElementById("Something").style.display = 'none';
    }
    // info tab
    var tabs_content = "";
    var desc_content = "";
    if (curr_event.details != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#details\" class=\"active teal-text\">Details</a></li>";
        desc_content = desc_content + "<div id=\"details\" style=\"\"><p>" + curr_event.details + "</p>";
        if (curr_event.pdfUrl) {
            desc_content += `<br /><a href="${curr_event.pdfUrl}">Download problem statement</a></div>`
        } else {
            desc_content += '</div>'
        }
    }
    if (curr_event.problem_statement != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#problem\" class=\"teal-text\">Problem Statement</a></li>";
        desc_content = desc_content + "<div id=\"problem\"><p>" + curr_event.problem_statement + "</p></div>";
    }
    if (curr_event.rulesList != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#rules\" class=\"teal-text\">Rules</a></li>";
        var rules_content = "";
        if (curr_event.rulesList.length != 1) {
            desc_content = desc_content + "<div id=\"rules\" style=\"font-size:18px\"><p><ol style=\"margin-bottom:0;\">";
            for (var l = 0; l < curr_event.rulesList.length; l++) {
                desc_content = desc_content + "<li>" + curr_event.rulesList[l] + "</li>";
            }
            desc_content = desc_content + "</ol></p></div>";
        } else {
            desc_content = desc_content + "<div id=\"rules\"><p>";
            for (var l = 0; l < curr_event.rulesList.length; l++) {
                desc_content = desc_content + curr_event.rulesList[l];
            }
            desc_content = desc_content + "</p></div>";
        }
    }
    if (curr_event.venue != undefined && curr_event.date != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#date\" class=\"teal-text\">Venue and Date</a></li>";
        if (curr_event.venue == "" || curr_event.date == "") {
            desc_content = desc_content + "<div id=\"date\"><p><center><i style=\"color:#a7a7a7;\">To Be Decided</i></center></p></div>";
        } else {
            desc_content = desc_content + "<div id=\"date\"><p>Venue: " + curr_event.venue + "<br/>Date: " + curr_event.date + "</p></div>";
        }
    } else if (curr_event.venue == undefined && curr_event.date != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#date\" class=\"teal-text\">Date</a></li>";
        if (curr_event.date == "") {
            desc_content = desc_content + "<div id=\"date\"><p><center><i style=\"color:#a7a7a7;\">To Be Decided</i></center></p></div>";
        } else {
            desc_content = desc_content + "<div id=\"date\"><p>" + curr_event.date + "</p></div>";
        }
    } else if (curr_event.venue != undefined && curr_event.date == undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#date\" class=\"teal-text\">Venue</a></li>";
        if (curr_event.venue == "") {
            desc_content = desc_content + "<div id=\"date\"><p><center><i style=\"color:#a7a7a7;\">To Be Decided</i></center></p></div>";
        } else {
            desc_content = desc_content + "<div id=\"date\"><p>" + curr_event.venue + "</p></div>";
        }
    }
    if (curr_event.coordinators != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#contacts\" class=\"teal-text\">Contacts</a></li>";
        desc_content = desc_content + "<div id=\"contacts\"><div class=\"row\">";
        for (var l = 0; l < curr_event.coordinators.length; l++) {
            desc_content = desc_content + "<div class=\"col s12 m6\"><div class=\"card\"><div class=\"card-content black-text\"><span class=\"card-title\">" + curr_event.coordinators[l].name + "</span></div>";
            if (curr_event.coordinators[l].phone != undefined) {
                desc_content = desc_content + "<div class=\"card-action\"><a href=\"tel:" + curr_event.coordinators[l].phone + "\">" + curr_event.coordinators[l].phone + "</a></div>";
            }
            if (curr_event.coordinators[l].email != undefined && curr_event.coordinators[l].email.length) {
                desc_content = desc_content + "<div class=\"card-action\"><a href=\"mailto:" + curr_event.coordinators[l].email + "\">" + curr_event.coordinators[l].email + "</a></div>";
            }
            desc_content = desc_content + "</div></div>";
        }
        desc_content = desc_content + "</div></div>";
    }
    tabs_content = tabs_content + "<li class=\"indicator\" style=\"background-color: orange;\"></li>";
    document.getElementById("event_desc_tabs").innerHTML = tabs_content;
    document.getElementById("event_description").innerHTML = desc_content;
    $('ul.tabs').tabs();
}

class Event extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opening: true,
      registered: user.isRegistered(this.props.match.params.eventId),
      register: false,
      loading: true,
    }
  }

  handleOpenRest = () => {

    if (this.state.opening)
      this.setState({ opening: false })
    else if (this.state.closing) {
      this.props.onClose();
    }
  }

  handleClick = () => {
    this.setState({ closing: true });
  }

  componentWillUnmount() {
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundColor = '';
  }

  componentDidUpdate() {
    if (!this.state.error && !this.state.loading)
      populate_event_card(this.state.event);
  }

  componentDidMount() {
    api.getEvent(this.props.match.params.eventId, {
      onSuccess: event => {
        this.setState({ event: event, loading: false });
      },
      onFailed: err => {
        this.setState({ error: true });
      }
    })
    document.body.style.overflow = 'auto';
    document.body.style.backgroundColor = 'rgb(240, 240, 240)'
  }

  handleClick = () => {
    this.setState({ register: true });
  }

  handleCancel = () => {
    this.setState({ register: false });
  }

  handleSuccess = () => {
    this.setState({ register: false, registered: true });
  }

  render() {
    const event = !this.state.loading && !this.state.error ? this.state.event : {};
    return (
      <div className="col container-fluid" id="event_desc">
        <div className="card darken-1" style={{boxShadow: 'none'}}>
            <div className="card-content " style={{paddingBottom: 10,paddingTop: 10}}>
                <div className="row" style={{marginBottom: 0}}><span className="card-title"><h1 style={{marginTop:0}} id="event_name"><span style={{color:"#F0F0F0"}}>▆▆▆▆▆▆</span></h1>
                    </span>
                </div>
                <div className="row" style={{marginTop: '-1rem', marginBottom: '1rem'}}><span><h3 style={{marginTop:0}} id="event_info"><span style={{color:'#F0F0F0'}}>▆▆▆▆▆▆▆▆▆▆▆▆▆▆</span></h3>
                    </span>
                </div>
                <div id="event_prize_wrapper">
                    <div className="eventPrize" id="trophy" style={{}}>
                        <img src={trophy} width="48" height="48" style={{marginRight: '1rem', marginTop: '-5px'}} />
                    </div>
                    <div className="eventPrize" id="Something">
                        <span style={{}} id="prizes_worth"><span style={{color:'#F0F0F0'}}>▆▆▆▆▆▆▆▆▆</span></span>
                        <br />
                        <span style={{}} id="event_prize"><span style={{color:'#F0F0F0'}}>▆▆▆▆</span></span>
                    </div>
                    <button className="eventPrize" disabled={this.state.registered || this.state.loading} onClick={this.handleClick} className="btn" style={{marginRight:0, marginLeft:'auto', display:'none'}} id="register_button">Register</button>
                    <button className="eventPrize" disabled={this.state.registered || this.state.loading} onClick={this.handleClick} className="btn" style={{marginRight:12, marginLeft:'auto', display:'none'}} id="register_button2">Help</button>

                </div>
            </div>
            <div className="card-tabs">
                <ul className="tabs tabs-fixed-width" id="event_desc_tabs">
                    <li className="tab active"><a href="#test4"><span style={{color:'#F0F0F0'}}>▆▆▆</span></a></li>
                    <li className="tab"><a href="#test5"><span style={{color:'#F0F0F0'}}>▆▆▆▆▆▆</span></a></li>
                    <li className="tab"><a href="#test6"><span style={{color:'#F0F0F0'}}>▆▆▆▆▆</span></a></li>
                </ul>
            </div>
            <div className="card-content grey lighten-4" id="event_description">
                <div id="test4">
                    <p><span style={{color:'#F0F0F0'}}>▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆<br/>▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆<br/>▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆</span></p>
                </div>
                <div id="test5"><span style={{color:'#F0F0F0'}}></span></div>
                <div id="test6"><span style={{color:'#F0F0F0'}}></span></div>
            </div>
        </div>
        {
            this.state.register ? <RegisterEvent onCancel={this.handleCancel} onSuccess={this.handleSuccess} maxSize={event.maxSize} minSize={event.minSize} event={event} /> : ""
        }
      </div>
    )
  }
}

export default Event;

