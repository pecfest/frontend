import React, { Component } from 'react';
import './PecFest2016.css'

var refreshboxElement, clicked;

function start() {
    var i = 0;

    var events = document.getElementById("events");
    var eve_count = 0;
    var school = document.getElementById("schools");
    var school_count = 0;
    var foot = document.getElementById("foot");
    var foot_count = 0;
    var complete = 0;
    var int1 = setInterval(function() {
        events.innerHTML = "Events : " + eve_count.toString();
        if (eve_count < 50) eve_count += 1;
        else { eve_count = 50;
            complete++; }
        school.innerHTML = "Schools : " + school_count.toString() + "+";
        if (school_count < 330) school_count += 12;
        else { school_count = 330;
            complete++; }
        foot.innerHTML = "Foot Fall : " + foot_count.toString() + "+";
        if (foot_count < 25000) foot_count += 400;
        else { foot_count = 25000;
            complete++; }
        if (complete >= 3) {
            clearInterval(int1);
        }
    }, 30);

    var player = document.getElementById("video-background");

    var Vid = document.getElementById('vid_source');

    var video_source = [
        ["Videos/Amit.mp4", "video/mp4"],
        ["Videos/Crowd.mp4", "video/mp4"],
        ["Videos/Drums.mp4", "video/mp4"],
        ["Videos/Groovz.mp4", "video/mp4"]
    ];

    clicked = function(num) {
        Vid.src = video_source[num][0];
        Vid.type = video_source[num][1];
        player.load();
        player.play();
        i = num;
        i += 1;
        i %= 4;
        var element = document.getElementById("top");
        element.classList.remove("top");
        void element.offsetWidth;
        element.classList.add("top");
        var element = document.getElementById("left");
        element.classList.remove("left");
        void element.offsetWidth;
        element.classList.add("left");
        var element = document.getElementById("bottom");
        element.classList.remove("bottom");
        void element.offsetWidth;
        element.classList.add("bottom");
        var element = document.getElementById("right");
        element.classList.remove("right");
        void element.offsetWidth;
        element.classList.add("right");
        var element = document.getElementById("inner-box");
        element.classList.remove("inner-box");
        void element.offsetWidth;
        element.classList.add("inner-box");
    }

    refreshboxElement = setInterval(function() {
        i += 1;
        i %= 4;
        Vid.src = video_source[i][0];
        Vid.type = video_source[i][1];
        player.load();
        player.play();
    }, 5000);
}

export default class PecFest2016 extends Component {

  handleClick = (i) => {
    clicked(i);
  }

  componentDidMount() {
    start();
  }

  componentWillUnmount() {
    window.clearInterval(refreshboxElement);
  }

  render() {

    return (
      <div className="PecFest2016">
        <video autoPlay loop id="video-background" muted>
          <source id="vid_source" src="Videos/Amit.mp4" type="video/mp4" />
        </video>
        <div className="filter" style={{ overflowX:'hidden', zIndex: 0 }}>
          <div className="desc">
            <div className="text" id="pecfest-title" style={{ top:'20%', left:'13%'}}>PECFEST 2016</div>
            <div className="text" id="events" style={{top:'45%', left:'13%', fontSize:'2.7vh'}}></div>
            <div className="text" id="schools" style={{ top:'50%', left:'13%', fontSize:'2.7vh'}}></div>
            <div className="text" id="foot" style={{top:'55%', left:'13%', fontSize:'2.7vh'}}></div>
          </div>
          <div id="sidebar" style={{ right:'0%', width:'40px', height:'100%',background:'black', position:'absolute', opacity:0.5}}>
              <ul id="side-list">
                  <li id="l0" onClick={this.handleClick.bind(this, 0)} className="bullet"> </li>
                  <li id="l1" onClick={this.handleClick.bind(this, 0)} className="bullet"> </li>
                  <li id="l2" onClick={this.handleClick.bind(this, 0)} className="bullet"> </li>
                  <li id="l3" onClick={this.handleClick.bind(this, 0)} className="bullet"> </li>
              </ul>
          </div>
        </div>
        <canvas id="inner-box" className="inner-box" style={{position:'absolute', left:'40%', top:'40%',width:'20%', height:'20%', border: '2px solid #ffffff', opacity:0}} />
      </div>
    )
  }
}
