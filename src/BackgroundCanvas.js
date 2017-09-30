import React, { Component } from 'react';
import * as THREE from 'three';

import './BackgroundCanvas.css';

class BackgroundCanvas extends Component {

  handleWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  handleFetch = (image) => {
    this.mouseX = this.mouseY = 0
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.refs.app.appendChild(this.renderer.domElement);
    // camera
    this.camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 6000)
    this.camera.position.z = 1500;
    this.scene = new THREE.Scene()

    this.scene.background = new THREE.Color( 0x000000 );
    this.scene.fog = new THREE.Fog( 0x000000, 1500, 5000 );

    // ground
    // this.imageCanvas =
    this.imageCanvas = document.createElement( "canvas" );
    this._context = this.imageCanvas.getContext( "2d" );
    this.imageCanvas.width = 1280; this.imageCanvas.height = 640;
    this._context.drawImage(image, 0, 0, 1280, 640);

    this.textureCanvas = new THREE.CanvasTexture( this.imageCanvas );
    this.textureCanvas.repeat.set( 128, 64 );
    this.textureCanvas.wrapS = THREE.RepeatWrapping;
    this.textureCanvas.wrapT = THREE.RepeatWrapping;

    this.materialCanvas = new THREE.MeshBasicMaterial( { map: this.textureCanvas } );
    this.geometry = new THREE.PlaneBufferGeometry( 100, 100 );
    this.meshCanvas = new THREE.Mesh( this.geometry, this.materialCanvas );
    this.meshCanvas.rotation.x = - Math.PI / 2;
    this.meshCanvas.scale.set( 1000, 333, 1000 );;
    this.scene.add(this.meshCanvas);

    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.animate()
  }


  componentDidMount() {
    var loader = new THREE.ImageLoader();

    loader.load(window.images.backgroundCover, this.handleFetch)
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    this.camera.position.x += ( this.mouseX - this.camera.position.x ) * .05;
    this.camera.position.y += ( - ( this.mouseY - 2 * window.innerHeight) - this.camera.position.y ) * .05;
    this.camera.lookAt( this.scene.position );
    this.renderer.render( this.scene, this.camera );
  }


  handleMouseMove = (event) => {
    this.mouseX = event.clientX - window.innerWidth / 2;
    this.mouseY = event.clientY - window.innerHeight / 2;
  }

  render() {
    return (
      <div className="FrontSlide-background" ref="app">
      </div>
    );
  }
}

export default BackgroundCanvas;
