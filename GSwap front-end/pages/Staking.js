import React, { Component } from "react";

import { Line, Circle } from "rc-progress";
import Countdown from "react-countdown";

import Web3 from "web3";
import "../App.css";

import GMasterChef from "../../abis/GMasterChef.json";
import GS from "../../abis/GSToken.json";

//!AQUI
// import Token from "../../abis/SusuToken.json";
// import MasterChef from "../../abis/MasterChef.json";

import gangster from "../assets/gangster.png";
import ewt from "../assets/ewt.png";
import gngLotto from "../assets/gngLotto.png";
// import ammo from "../assets/ammo.png";
import pugToken from "../assets/pugToken.png";
import gsToken from "../assets/gs.png";
import ammo from "../assets/ammo.png";

const GS_Block = 0.001074735449735;
const EWT_Block_Time = 5.8;
const EWT_Blocks_Day = (60 * 60 * 24) / EWT_Block_Time;
const days_year = 365;
const ttl_gs_allo = 5;
const gs_staking_alloc = 3;

const gsStakingContractAddress = "0x41c49ef86f513498D9Be19F4E920a6Afbe8Af4Cb";
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

class Stake extends Component {
  //*Start Component
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    this.GsStakingRewardDisplay().then(() => {
      const gs_staking_interval = setInterval(
        () => this.GsStakingRewardDisplay(),
        10 * 1000
      );
      this.gs_staking_interval = gs_staking_interval;
    });
    //!CARREGAR INITIAL DATA;
  }

  componentWillUnmount() {
    clearInterval(this.gs_staking_interval);
  }

  async loadBlockchainData(dispatch) {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function () {
          // User has allowed account access to DApp...
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
      const netId = await web3.eth.net.getId();

      const blockAc = await web3.eth.getBlockNumber();
      console.log(netId);
      console.log(`Block: ${blockAc}`);
      // const algo = await web3.eth.Contract(dbank.abi,dbank.address);
      // console.log(algo.toString());
      const accounts = await web3.eth.getAccounts();

      //load balance
      if (typeof accounts[0] !== "undefined") {
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({
          account: accounts[0],
          balance: web3.utils.fromWei(balance),

          //* Progra Globals
          web3: web3,
          netId: netId,
        });
      } else {
        window.alert("Please login with MetaMask");
      }

      //load contracts
      try {
        //!AQUI
        //TODO: AQUI
        const gsContract = new web3.eth.Contract(
          GS.abi,
          GS.networks[netId].address
        );
        const totalSupply = await gsContract.methods.totalSupply().call();

        const gs_supply_apy =
          (100 * ((GS_Block / totalSupply) * (GS_Block * EWT_Blocks_Day) + 1)) ^
          (days_year - 1 - 1); //!  G$ SUPPLY APY
        gs_supply_apy = (gs_supply_apy * gs_staking_alloc) / ttl_gs_allo;
        gs_supply_apy = (+gs_supply_apy).toFixed(2);

        const gsStakingContract = new web3.eth.Contract(
          tokenABI,
          gsStakingContractAddress
        );
        const gMasterChef = new web3.eth.Contract(
          GMasterChef.abi,
          GMasterChef.networks[netId].address
        );
        const gs_wallet_wei = await gsContract.methods
          .balanceOf(this.state.account)
          .call();

        const gS_wallet_balance = web3.utils.fromWei(gs_wallet_wei);
        console.log(`My G$ Wallet Balance: ${gS_wallet_balance}`);
        //TODO: AQUI
        const gSFeeAddress = await gMasterChef.methods.getFeeAddress().call();

        let user_staking_0 = await gMasterChef.methods
          .userInfo(1, this.state.account)
          .call();
        let pdt_gs_rewards_0 = await gMasterChef.methods
          .pendingSushi(1, this.state.account)
          .call();

        //TODO: AQUI
        const depo_gs_staking_precision = web3.utils.fromWei(
          user_staking_0.amount
        );
        const depo_gs_staking = (+depo_gs_staking_precision).toFixed(5);

        // //! APYsss G$
        gs_supply_apy =
          (100 * ((GS_Block / totalSupply) * (GS_Block * EWT_Blocks_Day) + 1)) ^
          (days_year - 1 - 1); //!  G$ SUPPLY APY
        gs_supply_apy = (gs_supply_apy * gs_staking_alloc) / ttl_gs_allo;

        gs_supply_apy = (+gs_supply_apy).toFixed(2);
        const gStakingContracts = [gsStakingContract];

        this.setState({
          gStakingContracts: gStakingContracts,
          gMasterChef: gMasterChef,
          gs: gsContract,
          gs_wallet_balance: gS_wallet_balance,
          gmasterChefAddress: GMasterChef.networks[netId].address,

          gSfeeAddres: gSFeeAddress,
          depo_gs_staking: depo_gs_staking,
          depo_gs_staking_precision: depo_gs_staking_precision,
          gs_supply_apy: gs_supply_apy,
        });

        //! AQUI-end-
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  //! REWARDS IN STAKING (G$)

  async GsStakingRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {

    try {
      console.log("G$ Staking UPDATE REWARDS");
      const pdt_rewards_0 = await this.state.gMasterChef.methods
        .pendingSushi(1, this.state.account)
        .call();
      const containGsReward_0 = this.state.web3.utils.fromWei(pdt_rewards_0);
      let reward_farm_0 = (+containGsReward_0).toFixed(5);
      reward_farm_0 = reward_farm_0
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_gs_staking: reward_farm_0,
        gs_reward_precision: containGsReward_0,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async DepositGsStaking(amount) {
    //! DEPOSIT IN FARMS (G$)
    if (amount != 0) {
      const user_staking_0 = await this.state.gStakingContracts[0].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("2");

      const dep_amount = this.state.web3.utils.toWei(amount);

      let deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("10000000000000000");

      if (this.state.GMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.gStakingContracts[0].methods
            .approve(this.state.gmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //TODO: 3
          //* Fee GS deposit
          await this.state.gs.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.gMasterChef.methods.deposit(1, deposit).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          window.location.reload();
        } catch (e) {
          console.log("Error, deposit: ", e);
        }
      }
    } else {
    }
  }

  async WithdrawGsStaking(e) {
    if (this.state.depo_gs_staking > 0) {
      const user_farm_0_gs = await this.state.gMasterChef.methods
        .userInfo(1, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_0_gs.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");
      const fee = new this.state.web3.utils.BN("50000000000000000");

      const currentGSBalance = await this.state.gs.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //TODO: 3
          //* FEE (G$)
          await this.state.gs.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.gMasterChef.methods
            .withdraw(1, withdraw)
            .send({ from: this.state.account });
          window.location.reload();
        } catch (e) {
          console.log("Error, withdraw: ", e);
        }
      }
    } else {
      return;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      web3: "undefined",
      netId: null,

      gs: null,
      gs_wallet_balance: 0.0,
      gFeeAddress: null,
      gMasterChef: null,
      gmasterChefAddress: null,
      gStakingContracts: [],
      input_gs_staking: 0,
      depo_gs_staking: 0.0,
      reward_gs_staking: 0.0,
    };
  }

  Change_GS_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_gs_staking: this.state.gs_wallet_balance,
      });
    } else {
      this.setState({ input_gs_staking: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  render() {
    return (
      <div>
        <div class="root">
          <br></br>
          <div class="page" style={{ background: "black" }}>
            <div class="pot-banner">
              <div class="wrapper">
                <br></br>
                <br></br>
                <div class="banner-wrapper">
                  <div class="txt-wrapper">
                    <span class="title">
                      G<font size="+3">$taking</font>
                    </span>
                    <span class="sub-title">
                      <font color="white">
                        The G$wap Staking is for real EWC Gs. Stop worrying
                        about fees, Stake, Earn & Enjoy.
                      </font>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="wrapper">
              <div
                class="container apy"
                style={{ width: "100%", alignItems: "center" }}
              >
                <i>{this.state.gs_supply_apy}%</i>
                <font size="1">APY</font>
              </div>
              <a>
                <div
                  class="container pg"
                  style={{ width: "100%", alignItems: "center" }}
                >
                  <div>
                    <img
                      height="240"
                      width="240"
                      src={gsToken}
                      alignItems="center"
                    />
                  </div>
                  <h3
                    syle={{
                      alignContent: "left",
                      alignItems: "left",
                      width: "100%",
                    }}
                    color="body"
                  >
                    {this.state.depo_gs_staking == 0 ? (
                      <font color="fe1e70">
                        <i>
                          <font size="+2">$</font>

                          <font size="+1">take</font>
                        </i>{" "}
                      </font>
                    ) : (
                      <font color="fe1e70">
                        <i>
                          <font size="+1">$</font>
                          <font size="+1" color="white">
                            taked:{" "}
                          </font>
                        </i>{" "}
                        <i>
                          <font size="+2">{this.state.depo_gs_staking}</font>
                          <font size="+1" color="white">
                            G
                          </font>
                          <font size="1">$</font>{" "}
                        </i>{" "}
                        <i>
                          {" "}
                          <font size="+1">R</font>
                          <font size="+1" color="white">
                            ewards:{" "}
                          </font>
                        </i>{" "}
                        <i>
                          <font size="+3" color="fe1e70">
                            {this.state.reward_gs_staking}
                            <font size="+1" color="white">
                              G
                            </font>
                            <font size="1" color="fe1e70">
                              $
                            </font>{" "}
                          </font>
                        </i>{" "}
                      </font>
                    )}
                  </h3>
                  <div>
                    <div
                      class="token-input"
                      style={{
                        marginLeft: "12.5px",
                        alignContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {/* TODO: AQUI */}

                      <div
                        class="token-input-wrapper"
                        style={{
                          alignContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <input
                          class="token-input"
                          placeholder={
                            this.state.input_gs_staking == 0
                              ? "0.0"
                              : this.state.input_gs_staking
                          }
                          onChange={this.Change_GS_Amount}
                        />
                        <i>
                          <font size="+1">
                            <font color="white">G</font>
                            <font color="fe1e70">$ </font>
                          </font>
                        </i>
                        <div
                          class="token-input-max clickable"
                          onClick={(e) => this.Change_GS_Amount(e)}
                        >
                          <i>MAX</i>
                        </div>
                      </div>
                    </div>
                    {/* TODO: AQUI */}
                    <div
                      class="ewt_balance"
                      align="right"
                      style={{ paddingRight: "20px" }}
                    >
                      <span class="label">
                        <font color="fe1e70" size="1">
                          <b>
                            <i>My Wallet G$:</i>
                          </b>
                        </font>{" "}
                      </span>
                      <span class="value">
                        <font color="white" size="1">
                          <i>{this.state.gs_wallet_balance}</i>
                        </font>
                      </span>
                    </div>

                    <div
                      class="row"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a>
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.DepositGsStaking(this.state.input_gs_staking)
                          }
                        >
                          <div class="content">
                            <font
                              color={
                                this.state.depo_gs_staking == 0
                                  ? "white"
                                  : "gray"
                              }
                            >
                              DEPOSIT
                            </font>

                            <div class="subfont"></div>
                          </div>
                        </div>
                      </a>
                      <a>
                        <div
                          class="details return"
                          style={{ marginLeft: "20px" }}
                          align="right"
                        >
                          <div
                            class="bunny-button clickable no-select"
                            onClick={(e) => this.WithdrawGsStaking(e)}
                          >
                            <div class="content">
                              <font
                                color={
                                  this.state.depo_gs_staking != 0
                                    ? "white"
                                    : "gray"
                                }
                              >
                                WITHDRAW
                              </font>

                              <font size="1">
                                + G
                                <i>
                                  <font color="ec6998">$</font>
                                </i>
                              </font>
                              <div class="subfont"></div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </a>
              <br></br>
              <br></br>
              <div class="container pg">
                <div
                  class="pot-list"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="pot-item empty ">
                    <img src={gngLotto} alt="cooking" />
                    <font color="grey">
                      <span>More Coming Soon</span>
                    </font>
                    <font color="grey">
                      <span>This is just the begining</span>{" "}
                    </font>
                  </div>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stake;
