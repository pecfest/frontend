/* eslint-env jquery */
/* global $ */
import React, { Component } from 'react';
import { StaggeredMotion, Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';
import trophy from './trophy.png'

import { events } from './eventdb';

import './Event.css';


function populate_event_card(i) {
    var curr_event = events[i - 1];
    document.getElementById("register_button").style.display = '';
    document.getElementById("event_name").innerHTML = curr_event.title;
    if (curr_event.description != undefined && curr_event.description.length > 1) {
        document.getElementById("event_info").style.display = '';
        document.getElementById("event_info").innerHTML = "<i>" + curr_event.description + "</i>";
    } else {
        document.getElementById("event_info").style.display = 'none';
    }
    // prizes
    if (curr_event.prize != undefined && curr_event.prize.length > 1) {
        var prizes_par = parseInt(curr_event.prize);
        if (prizes_par != NaN && prizes_par >= 100) {
            document.getElementById("prizes_worth").innerHTML = "Prizes Worth";
        } else {
            document.getElementById("prizes_worth").innerHTML = "Prizes";
        }
        document.getElementById("event_prize_wrapper").style.display = '';
        document.getElementById("event_prize").innerHTML = curr_event.prize;
    } else {
        document.getElementById("event_prize_wrapper").style.display = 'none';
    }
    // info tab
    var tabs_content = "";
    var desc_content = "";
    if (curr_event.details != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#details\" class=\"active teal-text\">Details</a></li>";
        desc_content = desc_content + "<div id=\"details\" style=\"font-size:18px\"><p>" + curr_event.details + "</p></div>";
    }
    if (curr_event.problem_statement != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#problem\" class=\"teal-text\">Problem Statement</a></li>";
        desc_content = desc_content + "<div id=\"problem\"><p>" + curr_event.problem_statement + "</p></div>";
    }
    if (curr_event.rule_list != undefined) {
        tabs_content = tabs_content + "<li class=\"tab\"><a href=\"#rules\" class=\"teal-text\">Rules</a></li>";
        var rules_content = "";
        if (curr_event.rule_list.length != 1) {
            desc_content = desc_content + "<div id=\"rules\" style=\"font-size:18px\"><p><ol style=\"margin-bottom:0;\">";
            for (var l = 0; l < curr_event.rule_list.length; l++) {
                desc_content = desc_content + "<li>" + curr_event.rule_list[l] + "</li>";
            }
            desc_content = desc_content + "</ol></p></div>";
        } else {
            desc_content = desc_content + "<div id=\"rules\" style=\"font-size:18px><p>";
            for (var l = 0; l < curr_event.rule_list.length; l++) {
                desc_content = desc_content + curr_event.rule_list[l];
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
  state = {
    opening: true,
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
  }

  componentDidMount() {
    populate_event_card(this.props.match.params.eventId);
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <div className="col container-fluid" id="event_desc">
        <div className="card darken-1" style={{boxShadow: 'none'}}>
            <div className="card-content " style={{paddingBottom: 10,paddingTop: 10}}>
                <div className="row" style={{marginBottom: 0}}><span className="card-title"><h3 style={{marginTop:0}} id="event_name"><span style={{color:"#F0F0F0"}}>▆▆▆▆▆▆</span></h3>
                    </span>
                </div>
                <div className="row" style={{marginTop: '-1rem', marginBottom: '1rem'}}><span><h5 style={{marginTop:0}} id="event_info"><span style={{color:'#F0F0F0'}}>▆▆▆▆▆▆▆▆▆▆▆▆▆▆</span></h5>
                    </span>
                    <a className="waves-effect waves-light orange btn white-text" style={{marginRight:0, marginLeft:'auto', display:'none'}} id="register_button"><i className="material-icons left">create</i>Register</a>
                </div>
                <div id="event_prize_wrapper">
                    <span style={{padding: '0.5rem', fontSize: '1rem', float:'left'}}><img src={trophy} width="48" height="48" style={{marginRight: '1rem', marginTop: '-5px'}} /></span><span style={{float: 'left'}} id="prizes_worth"><span style={{color:'#F0F0F0'}}>▆▆▆▆▆▆▆▆▆</span></span>
                    <br/><span style={{float: 'left', fontSize: '1.5rem', fontWeight: 'bold'}} id="event_prize"><span style={{color:'#F0F0F0'}}>▆▆▆▆</span></span>
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
      </div>
    )
  }
}

export default Event;

