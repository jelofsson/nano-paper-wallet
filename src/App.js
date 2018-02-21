import React, { Component } from 'react';
import { DropdownButton, Dropdown, MenuItem, Jumbotron, Button, InputGroup, FormControl, FormGroup } from 'react-bootstrap';
import * as wallet from 'rai-wallet';

import logo from './nanoLogo.svg';
import './App.css';
import './print.css';
import { PaperWallet, Themes } from './paperWallet';

import { Wallet } from 'rai-wallet';

class App extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      seed: '',
      account: '',
      activeTheme: Themes[0]
    };

    this.print = this.print.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.generateNewWallet = this.generateNewWallet.bind(this);
  }

  selectTheme(eventKey, event) {
    this.setState({ activeTheme: Themes[eventKey] });
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
            NANO Paper Wallet
          </h1>
        </header>
        <Jumbotron className="App-jumbotron noprint">
          Both the wallet seed and account are created on the client side.<br/>
          Turn off your internet connection when creating your paper wallet for extra security.
        </Jumbotron>
        <div className="noprint">
        <Button onClick={this.generateNewWallet} bsStyle="primary" bsSize="large">Generate new Wallet</Button>
        <FormGroup>
        <InputGroup bsSize="large">
          <InputGroup.Addon>Private Seed</InputGroup.Addon>
          <FormControl type="text" className="upper" value={this.state.seed} onChange={this.handleSeedChange} placeholder="" />
        </InputGroup>
        </FormGroup>
        <FormGroup>
        <InputGroup bsSize="large">
          <InputGroup.Addon>Public Account</InputGroup.Addon>
          <FormControl type="text" value={this.state.account} placeholder="" />
        </InputGroup>
        </FormGroup>
        <DropdownButton
          bsSize="large"
          title={"Theme - " + this.state.activeTheme.name}
          key={this.state.walletTheme}
          id={`dropdown-basic-${this.state.walletTheme}`}
        >
          {Themes.map(function(theme, index){
            return <MenuItem eventKey={index} onSelect={this.selectTheme}>{theme.name}</MenuItem>;
          }.bind(this))}
        </DropdownButton>
        {this.state.walletTheme}
        <Button onClick={this.print} bsStyle="primary" bsSize="large">Print</Button>
        </div>
        <div className="nano-paper-wallet print">
          <PaperWallet theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} />
        </div>
        <footer className="App-footer noprint">
        <a href="https://github.com/jelofsson/nano-paper-wallet.git">Github</a> | Buy me a coffee ☕️ <strong>xrb_19f6pfs7hxnuk8n1zrctdhhpwso3gtnc8357ggng8iheqbh8pjrfjbaxtzjo</strong>
        </footer>
      </div>
    );
  }
}

export default App;
