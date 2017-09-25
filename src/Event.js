import React, { Component } from 'react';
import { StaggeredMotion, Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';

import { events } from './eventdb';

import './Event.css';

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

  openAnimation(closing) {
    let initialValue = 0;
    let endValue = 100;

    if (closing) {
      initialValue = 100;
      endValue = 0
    }
    return (
      <Motion defaultStyle={{ h: initialValue }} style={{ h: spring(endValue, {precision: 1}) }} onRest={this.handleOpenRest}>
        {
          style => {
            return (
              <div className="wrapper Event-wrapper" style={{
                width: style.h + '%'
              }} />
            )
          }
        }
      </Motion>
    )
  }

  render() {
    if (this.state.opening) {
      return this.openAnimation(false);
    } else if (this.state.closing) {
      return this.openAnimation(true)
    }
    const event = this.props.event;


    // to much to do for just animation
    const elements = [
      {
        innerElement: (<h2>{event.title}</h2>),
        className: "Event-heading",
        key: "title"
      },

      {
        innerElement: "",
        className: 'shortDividerLine',
        key: 'dividerLine' + Math.random() * 100
      },

      {
        innerElement: (<p>{event.description}</p>),
        className: 'Event-description',
        key: "description",
      },

      {
        innerElement: (<span><em>Schedule: </em>{event.startingDate + ' - ' + event.endDate}</span>),
        className: 'Event-schedule',
        key: 'schedule',
      },

      {
        innerElement: (<span><em>Venue: </em>{'Auditorium'}</span>),
        className: 'Event-venue',
        key: 'venue',
      },

      {
        innerElement: (<span><em>Teamsize: </em>{event.teamsize}</span>),
        className: 'Event-teamsize',
        key: 'teamsize'
      }
    ]

    return (
      <div className="wrapper Event-wrapper">
          <StaggeredMotion
            defaultStyles={elements.map(element => ({ h: 0 }))}
            styles={prevInterpolatingStyles => prevInterpolatingStyles.map((element, key) => {
              return ({
                h: key === 0 ? spring(100) : prevInterpolatingStyles[key - 1].h
              })
            })}
          >

          {
            styles => (
              <div className="Event">
                <div className="Event-details">
                {
                  styles.map((style, i) => {
                    return (
                      <div className={elements[i].className} key={elements[i].key} style={
                        {
                          transform: `translateY(${100 - style.h}%)`,
                          opacity: style.h / 100,
                        }
                      }>
                      { elements[i].innerElement }
                      </div>
                    )
                  })
                }
                </div>
              </div>
            )
          }
          </StaggeredMotion>
        <button className="Button Event-close-button" onClick={this.handleClick}>Close</button>
      </div>
    )
  }
}

export default Event;

