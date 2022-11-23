import React, { Component, useState, useEffect } from "react";

import Web3 from "web3";
import { useHistory } from "react-router-dom";

import pug from "./assets/gangster.png";

const tokenABI = [
  {
    name: "Transfer",
    inputs: [
      { type: "address", name: "_from", indexed: true },
      { type: "address", name: "_to", indexed: true },
      { type: "uint256", name: "_value", indexed: false },
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "Approval",
    inputs: [
      { type: "address", name: "_owner", indexed: true },
      { type: "address", name: "_spender", indexed: true },
      { type: "uint256", name: "_value", indexed: false },
    ],
    anonymous: false,
    type: "event",
  },
  {
    name: "__init__",
    outputs: [],
    inputs: [
      { type: "bytes32", name: "_name" },
      { type: "bytes32", name: "_symbol" },
      { type: "uint256", name: "_decimals" },
      { type: "uint256", name: "_supply" },
    ],
    constant: false,
    payable: false,
    type: "constructor",
  },
  {
    name: "deposit",
    outputs: [],
    inputs: [],
    constant: false,
    payable: true,
    type: "function",
    gas: 74279,
  },
  {
    name: "withdraw",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [{ type: "uint256", name: "_value" }],
    constant: false,
    payable: false,
    type: "function",
    gas: 108706,
  },
  {
    name: "totalSupply",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 543,
  },
  {
    name: "balanceOf",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [{ type: "address", name: "_owner" }],
    constant: true,
    payable: false,
    type: "function",
    gas: 745,
  },
  {
    name: "transfer",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_to" },
      { type: "uint256", name: "_value" },
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 74698,
  },
  {
    name: "transferFrom",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_from" },
      { type: "address", name: "_to" },
      { type: "uint256", name: "_value" },
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 110600,
  },
  {
    name: "approve",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_spender" },
      { type: "uint256", name: "_value" },
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 37888,
  },
  {
    name: "allowance",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "address", name: "_owner" },
      { type: "address", name: "_spender" },
    ],
    constant: true,
    payable: false,
    type: "function",
    gas: 1025,
  },
  {
    name: "name",
    outputs: [{ type: "bytes32", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 723,
  },
  {
    name: "symbol",
    outputs: [{ type: "bytes32", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 753,
  },
  {
    name: "decimals",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 783,
  },
];

const pugContractAddress = "0x59b6196e41c118dfF75961257b882e86b915a0e8";

class NavBar extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    await this.loadUrlPrice(
      "https://us-central1-gswap-27c0a.cloudfunctions.net/pugPrice"
    );
    //!CARREGAR INITIAL DATA;
  }

  async loadUrlPrice(url) {
    const response = await fetch(
      "https://us-central1-gswap-27c0a.cloudfunctions.net/pugPrice"
    );
    const fetchJson = await response.json();
    const pugPrice = fetchJson.toString();

    this.setState({
      pugPrice: fetchJson,
    });
  }

  async loadBlockchainData(dispatch) {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const blockAc = await web3.eth.getBlockNumber();
      const pugContract = new web3.eth.Contract(tokenABI, pugContractAddress);

      const accounts = await web3.eth.getAccounts();

      //load balance
      if (typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0]);
        const pugBalance = await pugContract.methods
          .balanceOf(accounts[0])
          .call();
        const pgBal = web3.utils.fromWei(pugBalance);
        const round_pug_balance = (+pgBal).toFixed(2);

        const gangster_pug_balance =
          round_pug_balance / 1000 > 1
            ? (+(round_pug_balance / 1000)).toFixed(2)
            : 0;

        this.setState({
          account: accounts[0],
          balance: web3.utils.fromWei(balance),
          web3: web3,
          round_pug_balance: round_pug_balance,
          gangster_pug_balance: gangster_pug_balance,
        });
      } else {
        window.alert("Please login with MetaMask");
      }

      //load contracts
      try {
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      const result = await window.ethereum.enable();
      window.location.reload();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      //? Changable DATA:

      //TODO: Lottery state
      contest_0_winner: null,
      account: "",
      web3: "undefined",

      pugPrice: "99.999",
      pugBalance: 0,
      round_pug_balance: 0,
      gangster_pug_balance: 0,
      screenWidth: window.innerWidth,
    };
  }

  render() {
    return (
      <nav
        className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"
        style={{
          background:
            "radial-gradient(100% 100% at 0px 0px, black, transparent), orange",
        }}
      >
        <div
          className="row"
          style={{
            paddingLeft: 15,
            paddingTop: 7.5,
          }}
        >
          {this.state.screenWidth >= 900 ? (
            <div>
              <img src={pug} className="App-logo" alt="logo" height="70" />
              <a className="navbar-brand col-sm-2 col-md-2 mr-0" href="#/about">
                <div class="wasabi-banner">
                  <div
                    class="wrapper"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      class="wasabi-banner-wrapper"
                      style={{
                        verticalAlign: "center",
                      }}
                    >
                      <div class="txt-wrapper">
                        <span class="title">
                          <font size="+3">G</font>
                          <font size="+2">$</font>
                          <font size="+1">wap</font>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="content"></div>

        <div
          className="nav-wrapper"
          style={{
            padding: "10px",
          }}
        >
          <div className="topbar-nav no-select">
            <a class={"item clickable "} href="#/stake">
              <font color="ec6998">
                G<font size="1">$</font>
              </font>
              Stake
            </a>
            <a class={"item clickable "} href="#/farms">
              <font color="ec6998">
                G<font size="1">$</font>
              </font>
              Farms
            </a>
            {/* <a class="item clickable" href="/zap">
                Swap
              </a> */}
            <a class="item clickable" href="#/lottery">
              <font color="ec6998">
                G<font size="1">$</font>
              </font>
              Lotto
            </a>
            {/* <a class="item clickable" href="#/swap">
              <font color="ec6998">
                G<font size="1">$</font>
              </font>
              Swap
            </a> */}
            {/* <a
                class="item clickable"
                href="https://explorer.energyweb.org/tokens/0x59b6196e41c118dfF75961257b882e86b915a0e8/token-holders"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rank
              </a> */}
            <a
              class="item clickable"
              href="https://twitter.com/mobpug"
              target="_blank"
              rel="noopener noreferrer"
            >
              <font color="ec6998">
                G<font size="1"></font>
              </font>
              News
            </a>
          </div>
        </div>
        <div
          class="account-button"
          no-select
          href="https://twitter.com/mobpug"
          target="_blank"
          rel="noopener noreferrer"
        >
          {this.state.screenWidth >= 900 ? (
            <div>
              <div class="bunny-price clickable">
                <font color="white">
                  <b>
                    <font color="ec6998">PUG:</font>
                  </b>{" "}
                  {this.state.pugPrice}
                  <b>$</b>
                </font>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div class="account-button no-select"></div>
        </div>
        {this.state.screenWidth >= 900 ? (
          <div>
            <span>
              <font color="ec6998"> M</font>
              <font color="white">y PUG</font>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <b>
                  <font color="ec6998">
                    {this.state.gangster_pug_balance != 0 ? (
                      <div>
                        <font>{this.state.gangster_pug_balance}</font>
                        <i>
                          <font color="white">K</font>
                        </i>
                      </div>
                    ) : (
                      <div>{this.state.round_pug_balance}</div>
                    )}
                  </font>{" "}
                </b>
              </div>
            </span>
          </div>
        ) : (
          <div></div>
        )}
        {/* <div>
          <span>
            <font color="ec6998"> M</font>
            <font color="white">y AMMO</font>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <font color="ec6998">
                {" "}
                {this.state.gangster_pug_balance != 0
                  ? this.state.gangster_pug_balance + " "
                  : this.state.round_pug_balance}
              </font>{" "}
              ,
              <font color="white">
                {this.state.gangster_pug_balance != 0 ? "K" : ""}
              </font>
            </div>
          </span>
        </div> */}
        <a>
          {" "}
          <div
            class="bunny-button primary clickable no-select no-wrap"
            onClick={(e) => this.loadBlockchainData(e)}
          >
            <div class="content">
              {this.state.account == ""
                ? "Connect Wallet"
                : this.state.account.substr(0, 5) +
                  "***" +
                  this.state.account.substr(this.state.account.length - 4)}
            </div>
          </div>
        </a>
        <div style={{ width: "5px" }}></div>
      </nav>
    );
  }
}

export default NavBar;
