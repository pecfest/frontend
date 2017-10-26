import React, { Component } from 'react';
import anime from 'animejs';
import * as THREE from 'three';

import './BackgroundCanvas.css';

class BackgroundCanvas extends Component {
  _changed = true

  handleWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  handleFetch = () => {
    this.mouseX = this.mouseY = 0
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.refs.app.appendChild(this.renderer.domElement);
    // camera
    this.camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 6000)
    this.camera.position.z = 1;
    this.scene = new THREE.Scene()

    this.backgroundColor = new THREE.Color();
    this.backgroundColor.setHSL(0.0, 0.0, 0.0);

    var loader = new THREE.ImageLoader();
    this.texture = THREE.ImageUtils.loadTexture('Images/background.jpg');

    this.texture.repeat.set( 16, 8 );
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;

    this.materialCanvas = new THREE.MeshBasicMaterial( { map: this.texture } );
    this.geometry = new THREE.PlaneBufferGeometry( 10, 10 );
    this.meshCanvas = new THREE.Mesh( this.geometry, this.materialCanvas );
    this.meshCanvas.rotation.x = - Math.PI /2;
    this.meshCanvas.scale.set( 1000, 250, 1000 );;
    this.scene.add(this.meshCanvas);

    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.animate();
    anime({
      targets: this.backgroundColor,
      r: [ 1.0, 0.0 ],
      g: [ 1.0, 0.0 ],
      b: [ 1.0, 0.0 ],
      easing: 'easeInOutQuad'
    }).complete = () => this.props.onComplete && this.props.onComplete();
  }


  componentDidMount() {
    var loader = new THREE.ImageLoader();

    this._mounted = true;
    this.handleFetch();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  animate = () => {
    if (this._mounted && this._changed) {
      requestAnimationFrame(this.animate);
    }

    const lastPositionX = this.camera.position.x;
    const lastPositionY = this.camera.position.y;
    this.camera.position.x += ( this.mouseX - this.camera.position.x ) * .05;
    this.camera.position.y += ( - ( this.mouseY - 2 * window.innerHeight) - this.camera.position.y ) * .05;
    this.camera.lookAt( this.scene.position );
    this.renderer.render( this.scene, this.camera );
  }


  handleMouseMove = (event) => {
    this.mouseX = (event.clientX - window.innerWidth / 2) / 1000;
    this.mouseY = (event.clientY - window.innerHeight / 2) / 1000;
    this._changed = true;
  }

  render() {
    return (
      <div className="FrontSlide-background" ref="app">
      </div>
    );
  }
}

export default BackgroundCanvas;
