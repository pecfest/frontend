import React, { Component } from 'react';
import Progress from './Progress';
import Begin from './Begin';
import { api } from './eventdb';
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

  componentDidMount() {
      this.setState({ starting: false });


      api.getActivities({
        onSuccess: (activities) => {
          this.setState((prevState, props) => ({ progress: prevState.progress - 1 }));
        },

        onFailed: () => {
          this.setState({ error: true });
        }
      });

      fetch(window.images.backgroundCover)
        .then(response => response.blob())
        .then(blob => {
          window.images.backgroundCover = URL.createObjectURL(blob);
          this.setState((prevState, props) => ({ progress: prevState.progress - 1 }));
        })
        .catch(err => {
          this.setState({ error: true })
        });

      this.setState((prevState, props) => ({ progress: 2, total: 2 }));
  }

  render() {
    setTimeout(this.props.onComplete, 1000);
    return (
      <div className="flexed">
        <div className="centeredAlign">

          <div ref="start" style={{
            display: 'block',
            height: '100%',
            margin: 'auto',
            transition: 'all 400ms',
          }}>
            {

              this.state.error ? <ErrorMessage message="Unable to load assets. Please check your internet connection." /> :
              (this.state.loading ?
                !this.state.starting && <Progress working={!this.state.progress} onComplete={this.props.onComplete} /> : "")
            }
            </div>
        </div>

        <div ref="another" style={{ backgroundColor: 'white', width: '100vw', position: 'fixed', bottom: 0, }} />
      </div>
    );
  }
}

export default App;
