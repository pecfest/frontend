import React, { Component } from 'react';
import anime from 'animejs';
import Progress from './Progress';
import Begin from './Begin';
import { subcategories } from './eventdb';
import ErrorMessage from './ErrorMessage';
import './App.css';

class App extends Component {
  state = {
    lastPosition: 0,
    progress: 0,
    loading: true,
    starting: true,
    total: 100,
    error: false,
  }

  handleComplete = () => {
    this.setState({ loading: false });
    setTimeout(this.handleClick, 1000);
  }

  handleClick = button => {
    this.animations = [];
    let closeAnimation = anime.timeline();

    const letters = [ ...document.getElementsByClassName('PECFEST-letter')];

    let offset = 0;
    letters.map((letter, i) => {
      closeAnimation = closeAnimation.add({
        targets: letter,
        translateY: -100,
        easing: 'easeInOutExpo',
        opacity: 0,
        offset: '-=' + (offset + i * 600),
      })
    });

    this.animations.push(closeAnimation);

    const year = [ ...document.getElementsByClassName("PECFEST-year")];

    offset = 0;

    let lettersCloseAnimation = anime.timeline();
    year.map((letter, i) => {
      lettersCloseAnimation = lettersCloseAnimation.add({
        targets: letter,
        translateY: -100,
        easing: 'easeInOutExpo',
        opacity: 0,
        offset: '-=' + (offset + i * 600),
      })
    });

    this.animations.push(lettersCloseAnimation);

    // const buttonAnimation = anime({
    //   targets: button,
    //   translateY: '100%',
    //   easing: 'easeInOutExpo',
    //   opacity: 0
    // });
    // this.animations.push(buttonAnimation);

    const borderAnimation = anime({
      targets: this.refs.span,
      opacity: 0,
      easing: 'easeInOutExpo',
    });
    this.animations.push(borderAnimation);

    this.animations.forEach(animation => animation.complete = this.handleAnimationsComplete);
  }

  handleAnimationsComplete = () => {
    this.animations.pop();

    if (this.animations.length === 0) {
      this.props.onComplete && this.props.onComplete();
    }
  }


  componentDidMount() {
    const letters = document.querySelectorAll('.PECFEST-letter, .PECFEST-year');

    const anim = anime({
      targets: letters,
      value: 100,
      duration: 2000,
      easing: 'linear',
      delay: 1000,
    });
    anim.update = anim => {
      Array.from(letters).forEach(letter => letter.style.opacity = anim.progress / 100);
    }

    anim.complete = () => {
      this.setState({ starting: false });


      for (const i in subcategories) {
        fetch(subcategories[i].backgroundImageUrl, { redirect: 'follow' })
          .then(response => { return response.blob(); } )
          .then(blob => {
            subcategories[i].backgroundImageUrl = URL.createObjectURL(blob);

            this.setState((prevState, props) => ({ progress: prevState.progress - 1 }));
          })
          .catch(err => {
            this.setState((prevState, props) => ({ error: true }))
          });
      }
      this.setState((prevState, props) => ({ progress: subcategories.length, total: subcategories.length + 1 }));
    }
  }

  render() {
    const pecfest = "PECFEST".split('').map((letter, i) => (<span className="PECFEST-letter" key={i}>{letter}</span>));
    const currentYear = "2017".split('').map((letter, i) => (<span className="PECFEST-year" key={i}>{letter}</span>));
    return (
      <div className="flexed">
        <div className="centeredAlign">

          <div ref="start" style={{
            maxWidth: '16em',
            display: 'block',
            margin: 'auto',
            transition: 'all 400ms',
          }}>
            {pecfest}<span ref="span" style={{ paddingLeft: '0.7em', opacity: 0.5, borderLeft: '1px solid'}}>{currentYear}</span>
            {

              this.state.error ? <ErrorMessage message="Unable to load assets. Please check your internet connection." /> :
              (this.state.loading ?
                !this.state.starting && <Progress progress={this.state.total - this.state.progress} total={this.state.total} onComplete={this.handleComplete} /> : "")
            }
            </div>
        </div>

        <div ref="another" style={{ backgroundColor: 'white', width: '100vw', position: 'fixed', bottom: 0, }} />
      </div>
    );
  }
}

export default App;
