import React, { Component } from 'react';
import { DropdownButton, Dropdown, MenuItem, Alert, Button, InputGroup, FormControl, FormGroup } from 'react-bootstrap';
import * as wallet from 'rai-wallet';
import domtoimage from 'dom-to-image';

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
      activeTheme: Themes[0],
      paperWalletImageData: ''
    };

    this.print = this.print.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.generateNewWallet = this.generateNewWallet.bind(this);
  }

  componentDidMount() {
    this.generateNewWallet(null, false);
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
    var node = document.getElementsByClassName('nano-paper-wallet')[0];
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var sprite = new Image();
            sprite.onload = function () {
              this.setState({ paperWalletImageData: dataUrl });
              window.print();
            }.bind(this);
            sprite.src = dataUrl;
        }.bind(this))
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
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

        <div className="noprint">

        <Alert bsStyle="info">
          <a href="https://github.com/jelofsson/nano-paper-wallet/raw/master/nano-paper-wallet.zip">download zip of this website here</a> - disconnect your internet connection, extract the zip and open index.html in an safe OS environment.
        </Alert>

        <Button onClick={this.generateNewWallet} bsStyle="primary">Generate new Wallet</Button>
        <FormGroup>
        <InputGroup>
          <InputGroup.Addon>Private Seed</InputGroup.Addon>
          <FormControl type="text" className="upper" value={this.state.seed} onChange={this.handleSeedChange} placeholder="" />
        </InputGroup>
        </FormGroup>
        <FormGroup>
        <InputGroup>
          <InputGroup.Addon>Public Account</InputGroup.Addon>
          <FormControl type="text" value={this.state.account} placeholder="" />
        </InputGroup>
        </FormGroup>
        <DropdownButton 
          title={"Theme - " + this.state.activeTheme.name}
          key={this.state.walletTheme}
          id={`dropdown-basic-${this.state.walletTheme}`}
        >
          {Themes.map(function(theme, index){
            return <MenuItem eventKey={index} onSelect={this.selectTheme}>{theme.name}</MenuItem>;
          }.bind(this))}
        </DropdownButton>
        {this.state.walletTheme}
        <Button onClick={this.print} bsStyle="primary">Print</Button>

        </div>
          <div className="nano-paper-wallet noprint">
            <PaperWallet theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} />
          </div>
        <img className="nano-paper-wallet-img hidden print" src={this.state.paperWalletImageData} />

        <footer className="App-footer noprint">
        <a href="https://github.com/jelofsson/nano-paper-wallet.git">Github</a> | Buy me a coffee ☕️ <strong>xrb_19f6pfs7hxnuk8n1zrctdhhpwso3gtnc8357ggng8iheqbh8pjrfjbaxtzjo</strong>
        </footer>
      </div>
    );
  }
}

export default App;
