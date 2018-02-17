import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Image, Path } from 'react-konva';
import QrImage from './qrImage.js';
import Background from './background.js';
import logo from './nanoLogoFull.svg';

// here is another way to update the image
class ImageLogo extends React.Component {
  state = {
    image: new window.Image()
  };
  componentDidMount() {
    this.state.image.src = "./nanoLogoCrop.svg";
    this.state.image.onload = () => {
      // calling set state here will do nothing
      // because properties of Konva.Image are not changed
      // so we need to update layer manually
      this.imageNode.getLayer().batchDraw();
    };
  }
 
  render() {
    return (
      <Image
        image={this.state.image}
        y={250}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

export default class RaiPaperWallet extends Component {

    constructor(props) {
        super(props);
      console.log(logo);
        this.state = {
            width: null,
            height: null,
            qr: 'hello',
            color: '#0000ff'
        };
    }

    componentDidMount() {
      const height = 350;// this.divElement.clientHeight;
      const width = 850;
      this.setState({ height, width });
    }

    render() {
      return (
        <div className="nano-paper-wallet" ref={ (divElement) => this.divElement = divElement}>
        <Stage width={this.state.width} height={this.state.height}>
        <Layer>
          <Background x={0} y={0} color="Blues" width={this.state.width} height={this.state.height} content={this.props.seed} />
          <Text x={75} y={50} text="Private Seed" fontSize="12" color={this.state.color} fontFamily="Nunito" />
          <QrImage x={75} y={75} content={this.props.seed} />
          
          <Text x={575} y={50} text="Public Account" fontSize="12" color={this.state.color} fontFamily="Nunito" />
          <QrImage x={575} y={75} content={this.props.account} />

          <Path data={logo} x={100} y={500} width={500} height={50} />
        </Layer>
      </Stage>
      </div>
      );
      // <Rect x={500} y={20} width={50} height={50} fill={this.state.color} shadowBlur={5} />
    }
  }