import React, { Component } from 'react';
import anime from 'animejs';

import './PecFest2016.css'

var refreshboxElement, clicked;

function start() {
    var i = 0;

    if (typeof window.YT === 'undefined')
      var player;
      player = new window.YT.Player('muteYouTubeVideoPlayer', {
        videoId: 'kMotFEvb0xc', // YouTube Video ID
        playerVars: {
          autoplay: 1,        // Auto-play the video on load
          controls: 0,        // Show pause/play buttons in player
          showinfo: 0,        // Hide the video title
          modestbranding: 1,  // Hide the Youtube Logo
          loop: 1,            // Run the video in a loop
          fs: 0,              // Hide the full screen button
          cc_load_policy: 0, // Hide closed captions
          iv_load_policy: 3,  // Hide the Video Annotations
          autohide: 0         // Hide video controls when playing
        },
        events: {
          onReady: function(e) {
            e.target.mute();
          }
        }
    });

    var events = document.getElementById("events");
    var eve_count = 0;
    var school = document.getElementById("schools");
    var school_count = 0;
    var foot = document.getElementById("foot");
    var foot_count = 0;
    var complete = 0;
    var counts = {
      eve: 0,
      school: 0,
      foot: 0,
    }

    var anim = anime({
      targets: counts,
      eve: 50,
      school: 350,
      foot: 25000,
      duration: 3000,
      easing: 'easeInQuad',
    });

    anim.update = ({progress}) => {
      events.innerHTML = 'Events: ' + counts.eve.toFixed() + '+';
      school.innerHTML = 'Schools: '  + counts.school.toFixed() + '+';
      foot.innerHTML = 'Footfall: ' + counts.foot.toFixed() + '+';
    }

}

export default class PecFest2016 extends Component {

  handleClick = (i) => {
    clicked(i);
  }

  componentDidMount() {
    try {
      start();
    } catch (e) {
      return;
    }
  }

  componentWillUnmount() {
    window.clearInterval(refreshboxElement);
  }

  render() {

    return (
      <div className="PecFest2016">
        <div id="muteYouTubeVideoPlayer"></div>
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
      </div>
    )
  }
}
