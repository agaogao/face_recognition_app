import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: '4badd5d7d8bb475abfcb1fa878d4e4af'
});

const particlesParams = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  locateFaces = (data) => {
    data.outputs[0].data.regions.forEach(item => {
      const region = item.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      const leftCol = region.left_col * width;
      const topRow = region.top_row * height;
      const rightCol = width - (region.right_col * width);
      const bottomRow = height - (region.bottom_row * height);
      const box_info = {
        leftCol: leftCol,
        topRow: topRow,
        rightCol: rightCol,
        bottomRow: bottomRow
      };
      this.mappingMultiFaces(box_info);
    });
  }

  mappingMultiFaces = (box) => {
    const imageSection = document.getElementById('imageSection');
    imageSection.html = "";
    const newDiv = document.createElement('div');
    const newContent = document.createTextNode('');
    newDiv.appendChild(newContent);
    newDiv.classList.add('bounding-box');
    const pxTop = String(box.topRow)+'px';
    const pxBottom = String(box.bottomRow)+'px';
    const pxLeft = String(box.leftCol)+'px';
    const pxRight = String(box.rightCol)+'px';
    newDiv.style.top = pxTop;
    newDiv.style.left = pxLeft;
    newDiv.style.right = pxRight;
    newDiv.style.bottom = pxBottom;
    imageSection.appendChild(newDiv);
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.locateFaces(response))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesParams} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
      </div>
    );
  }
}

export default App;
