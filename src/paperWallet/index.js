import React, { Component } from 'react';
import * as Trianglify from 'trianglify';
import QrImage from './qrImage.js';
import logo from './nanoLogoFull.svg';
import './style.css';

export default class PaperWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            qr: 'hello',
            color: '#0000ff'
        };
        this.background = this.background.bind(this);
    }

    componentDidMount() {
    }

    background(seed) {
      return Trianglify({
        variance: "0.4",
        x_colors: ['#4CAFE8', '#FEFEFE', '#4CAFE8'],
        width: 1024,
        height: 768
      }).png();
    }

    render() {
      return (
      <div className="paper-wallet">
          <img className="paper-wallet--background" src={this.background(this.props.seed)} />
          <span className="paper-wallet--pvt-seed-txt paper-wallet--txt">Private Seed</span>
          <QrImage className="paper-wallet--pvt-seed-qr paper-wallet--qr" content={this.props.seed} />
          <img className="paper-wallet--logo" src={logo} />
          <span className="paper-wallet--pub-addr-txt paper-wallet--txt">Public Account</span>
          <QrImage className="paper-wallet--pub-addr-qr paper-wallet--qr" content={this.props.account} />
      </div>
      );
    }
  }