
import React, { Component } from 'react';
import * as Trianglify from 'trianglify';
import QrImage from './qrImage.js';
import './style.css';

export default class PaperWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            qr: 'hello',
            color: '#0000ff',
        };

        this.background = this.background.bind(this);
    }

    componentDidMount() {
    }

    background(seed) {
      return Trianglify({
        variance: "1",
        x_colors: ['#000078', '#000034', '#000078'],
        width: 1024,
        height: 270
      }).png();
    }

    render() {
      var bgStyle={backgroundImage: 'url(' + this.props.theme.background + ')'};
      return (
      <div className="paper-wallet" style={bgStyle}>
          <span style={this.props.theme.textstyle} className="paper-wallet--pvt-seed-txt paper-wallet--txt">Private Seed</span>
          <QrImage className="paper-wallet--pvt-seed-qr paper-wallet--qr" content={this.props.seed} />
          <span style={this.props.theme.textstyle} className="paper-wallet--pub-addr-txt paper-wallet--txt">Public Account</span>
          <QrImage className="paper-wallet--pub-addr-qr paper-wallet--qr" content={this.props.account} />
      </div>
      );
    }
  }