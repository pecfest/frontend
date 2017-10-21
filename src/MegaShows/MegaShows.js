import React, { Component } from 'react';
import megashows from './megashows_list';
import { TransitionMotion, spring } from 'react-motion';
import MegaShow from './MegaShow'
import Swipeable from '../Swipeable';

import './App.css';

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <div className="controls-next">
          <button onClick={this.props.onNext} className="ControlButton Controls-nextButton"></button>
        </div>
        <div className="controls-prev">
          <button onClick={this.props.onPrev} className="ControlButton Controls-prevButton"></button>
        </div>
      </div>
    )
  }
}

class Slide extends Component {
  render() {
    return (
      <div className="MegaShowSlide">
        <Controls onNext={this.props.onNext} onPrev={this.props.onPrev} />
        <MegaShow show={megashows[this.props.current]} />
      </div>
    )
  }
}

class MegaShows extends Component {
  state = {
    current: 0
  }

  handleNext = () => {
    const next = this.state.current + 1 >= megashows.length ? 0 : this.state.current + 1;
    this.setState({ current: next });
  }

  handlePrev = () => {
    const prev = this.state.current - 1 < 0 ? megashows.length - 1 : this.state.current - 1;
    this.setState({ current: prev });
  }

  handleSwipe = dir => {
    if (dir == 'left') {
      this.handlePrev();
    } else if (dir == 'right') {
      this.handleNext();
    }
  }

  render() {
    return (
      <TransitionMotion willEnter={this.willEnter}
        willLeave={this.willLeave}
        defaultStyles={[{
          key: this.state.current.toString(),
          style: {
            x: -100
          }
        }]}
        styles={[{
          key: this.state.current.toString(),
          style: { x: spring(0) }
        }]}>
        {
          styles => <Swipeable className="MegaShows" onSwipe={this.handleSwipe}>
            {
              styles.map(style => {
                return <Slide style={style.style} onNext={this.handleNext} onPrev={this.handlePrev} key={style.key} current={parseInt(style.key)} />
              })
            }
          </Swipeable>
        }
      </TransitionMotion>
    );
  }
}

export default MegaShows;
