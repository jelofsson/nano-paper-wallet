import React, { Component } from 'react';
import { Button, InputGroup, InputGroupAddon, Input, Jumbotron } from 'reactstrap';
import * as wallet from 'rai-wallet';

import logo from './nanoLogoFull_white.svg';
import './App.css';
import './print.css';
import PaperWallet from './paperWallet';

import { Wallet } from 'rai-wallet';

class App extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      seed: null,
      account: null
    };

    this.print = this.print.bind(this);
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.generateNewWallet = this.generateNewWallet.bind(this);
  }

  generateNewWallet(event, seed=false) {
    try {
      const wallet = new Wallet();
      wallet.createWallet(seed);
      this.setState({
        seed: wallet.getSeed(),
        account: wallet.getAccounts().pop()['account']
      });
    } catch (error) {
      this.setState({
        seed: seed,
        account: ''
      });
    }
  }

  handleSeedChange(event) {
    this.generateNewWallet(event, event.target.value);
  }

  print(event) {
    window.print();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header noprint">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Nano Paper Wallet Generator
          </h1>
        </header>
        <Jumbotron className="App-jumbotron noprint">
          Both the wallet seed and account are created on the client side.<br/>
          Turn off your internet connection when creating your paper wallet for extra security.
        </Jumbotron>
        <p className="noprint">
        <Button onClick={this.generateNewWallet} color="secondary" size="lg">Generate new Wallet</Button>
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">Private Seed</InputGroupAddon>
          <Input className="upper" value={this.state.seed} onChange={this.handleSeedChange} placeholder="" />
        </InputGroup>
        <InputGroup size="lg">
          <InputGroupAddon addonType="prepend">Public Account</InputGroupAddon>
          <Input value={this.state.account} placeholder="" />
        </InputGroup>
        <Button onClick={this.print} color="secondary" size="lg">Print</Button>
        </p>
        <p className="nano-paper-wallet print">
          <PaperWallet seed={this.state.seed} account={this.state.account} />
        </p>
        <footer className="App-footer noprint">
        <a href="https://github.com/jelofsson/nano-paper-wallet.git">Github</a> | Buy me a coffee ☕️ <strong>xrb_19f6pfs7hxnuk8n1zrctdhhpwso3gtnc8357ggng8iheqbh8pjrfjbaxtzjo</strong>
        </footer>
      </div>
    );
  }
}

export default App;
