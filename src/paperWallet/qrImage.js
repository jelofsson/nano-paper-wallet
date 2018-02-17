import React, { Component } from 'react';
import QRious from 'qrious';

export default class QrImage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          image: null,
      };
    }

    componentWillReceiveProps(nextProps, nextState) {
      if(nextProps.content) {
        var qr = new QRious({value: nextProps.content});
        this.setState({image: qr.toDataURL('image/jpeg') });
      } else {
        this.setState({image: null });
      }
    }

    render() {
      return <img { ...this.props }src={this.state.image} />;
    }
  }