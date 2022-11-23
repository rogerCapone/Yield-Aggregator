import React, { Component } from "react";

import { Line, Circle } from "rc-progress";
import Countdown from "react-countdown";

import Web3 from "web3";

import LotteryContract from "../../abis/GLotto.json";

//!AQUI
// import Token from "../../abis/SusuToken.json";
// import MasterChef from "../../abis/MasterChef.json";

import gangster from "../assets/gangster.png";
import ewt from "../assets/ewt.png";
// import ammo from "../assets/ammo.png";
import gngLotto from "../assets/gngLotto.png";
import gLotto from "../assets/gLotto.png";

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const ewtPrice = 13.7;
// const startContest_0 = new Date(2021, 6, 27);
const startContest_1 = Date.UTC(2021, 7, 20, 23, 30, 0, 0);

const endContest_0 = Date.UTC(2021, 7, 21, 23, 30, 0, 0);
const contestStart = startContest_1 - Date.now() > 0 ? false : true;
const ended = false;
// const endContest_0 = new Date(2021, 5, 10, 0, 0, 0, 0);
// const endContest_1 = new Date(2021, 7, 10);

const Completionist = () => <span>Time is over, let's check you gLOTTO!</span>;

var now = Date.now();
// let dif = 0;
// let difDate = Math.round(dif / oneDay);

const renderer_f_0 = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  }
  return (
    <span>
      {hours}:{minutes}:{seconds}
    </span>
  );
};

class Lottery extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    await this.GetLotto_0();
    //!CARREGAR INITIAL DATA;

    this.setState({});
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
      const lottery = new web3.eth.Contract(
        LotteryContract.abi,
        LotteryContract.networks[netId].address
      );
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
        const winDisp_0 = await lottery.methods
          .winnings(this.state.account)
          .call();
        winDisp_0 = winDisp_0;

        //!AQUI
        // const ammoContract = new web3.eth.Contract(
        //   Token.abi,
        //   Token.networks[netId].address
        // );
        // const ammoAddress = Token.networks[netId].address;
        // const masterChef = new web3.eth.Contract(
        //   MasterChef.abi,
        //   MasterChef.networks[netId].address
        // );
        // this.setState({
        //   winDisp_0: winDisp_0,
        //   ammo: ammoContract,
        //   ammoAddress: ammoAddress,
        //   masterChef: masterChef,
        // });

        //! AQUI-end-
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  async GetLotto_0() {
    const lottery = new this.state.web3.eth.Contract(
      LotteryContract.abi,
      LotteryContract.networks[this.state.netId].address
    );

    const leng = await lottery.methods.ticketsLength().call();

    let array = [];
    let gLotto = 0;
    let allTickets = 0;
    let probability = 0;
    let pot = 0;
    let win_pot_0 = 0;

    try {
      for (let index = 0; index < leng; index++) {
        const participant = await lottery.methods.tickets(index).call();
        if (participant == this.state.account) {
          gLotto++;
        }
        allTickets++;
      }
      pot = await this.state.web3.eth.getBalance(lottery.options.address);
      pot = await this.state.web3.utils.fromWei(pot);
      probability = (gLotto / (leng == 0 ? 1 : leng)) * 100;
      probability = Math.round(probability * 100) / 100;
    } catch (e) {
      console.log(e.toString());
    }
    this.setState({
      gLotto_0: gLotto,
      gLotto_0_probability: probability,
      gLotto_0_allTickets: allTickets,
      pot_0: allTickets,
    });
  }

  async Buy_gLotto_0() {
    if (ended == false) {
      const id = await this.state.web3.eth.net.getId();
      const lottery = new this.state.web3.eth.Contract(
        LotteryContract.abi,
        LotteryContract.networks[id].address
      );

      const buyingAmount = new this.state.web3.utils.BN("1000000000000000000");
      const gas = new this.state.web3.utils.BN("99999");
      const gasPrice = new this.state.web3.utils.BN("1");
      try {
        await lottery.methods.buy().send({
          from: this.state.account,
          value: buyingAmount,
          gas: gas,
        });
        window.location.reload();
      } catch (error) {
        console.log(error.toString());
      }
    }
  }

  async Buy_2GLotto() {
    if (ended == false) {
      const id = await this.state.web3.eth.net.getId();
      const lottery = new this.state.web3.eth.Contract(
        LotteryContract.abi,
        LotteryContract.networks[id].address
      );

      const buyingAmount = new this.state.web3.utils.BN("1000000000000000000");
      const gas = new this.state.web3.utils.BN("99999");
      const gasPrice = new this.state.web3.utils.BN("1");

      try {
        for (let index = 0; index < 2; index++) {
          await lottery.methods.buy().send({
            from: this.state.account,
            value: buyingAmount,
            gas: gas,
          });
        }
      } catch (error) {
        console.log(error.toString());
      }
      window.location.reload();
    }
  }

  async Buy_5GLotto() {
    if (ended == false) {
      const id = await this.state.web3.eth.net.getId();
      const lottery = new this.state.web3.eth.Contract(
        LotteryContract.abi,
        LotteryContract.networks[id].address
      );

      const buyingAmount = new this.state.web3.utils.BN("1000000000000000000");
      const gas = new this.state.web3.utils.BN("99999");
      const gasPrice = new this.state.web3.utils.BN("5");

      try {
        for (let index = 0; index < 5; index++) {
          await lottery.methods.buy().send({
            from: this.state.account,
            value: buyingAmount,
            gas: gas,
          });
        }
      } catch (error) {
        console.log(error.toString());
      }
      window.location.reload();
    }
  }

  async Withdraw_gLotto_0() {
    let contest_0_winner;
    //! Fer call a winner i mirar si es ell
    //! Si es ell, probar de fer un withdraw
    if (ended == false) {
      contest_0_winner = null;
      this.setState({
        firstTime: false,
      });
    } else {
      const id = await this.state.web3.eth.net.getId();
      const lottery = new this.state.web3.eth.Contract(
        LotteryContract.abi,
        LotteryContract.networks[id].address
      );

      try {
        const resposta = await lottery.methods
          .winnings(this.state.account)
          .call();
        if (resposta != 0) {
          const gas = new this.state.web3.utils.BN("6000000");
          const gasPrice = new this.state.web3.utils.BN("100000");

          //!AQUI
          // const ammoAddress = this.state.ammoAddress;
          // console.log(ammoAddress);
          // const currentAmmoBalance = await this.state.ammo.methods
          //   .balanceOf(this.state.account)
          //   .call();
          // const fee = new this.state.web3.utils.BN("50000000000000000000");
          // const feeAddress = await this.state.masterChef.methods
          //   .getFeeAddress()
          //   .call();
          //!AQUI-end--

          this.setState({ contest_0_winner: true });
          //* Fee
          // await this.state.ammo.methods.transfer(feeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await lottery.methods.withdraw().send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });
          window.location.reload();
          await this.GetLotto_0();
        }
        contest_0_winner = false;

        // console.log(resposta);
      } catch (error) {
        console.log(error.toString());
        this.setState({ contest_0_winner: false });
      }
    }

    this.setState({ contest_0_winner: contest_0_winner });
  }

  constructor(props) {
    super(props);
    this.state = {
      //? Changable DATA:

      //TODO: Lottery state
      contest_0_winner: null,
      account: "",
      web3: "undefined",
      firstTime: true,
      width: window.innerWidth,
      //TODO: End Lottery state
      //   //*Globals
      //   web3: "undefined",
      //   masterChef: null,
      //   netId: null,
      //   feeAddress: null,
      //   //?UserGlobals
      //   account: "",
      //   balance: 0,
      //   //!Balances
      //   //* PUG_EWT
      //   ewt_clp_wallet_balance: 0,
      //   reward_ewt_pdt_ammo: 0.0,
      //   depo_clp_ewt_amount: 0,
      //   input_lp_ewt: 0,
      //   //* PUG_AMMO
      //   ammo_clp_wallet_balance: 0,
      //   reward_ammo_pdt_ammo: 0.0,
      //   depo_clp_ammo_amount: 0,
      //   input_lp_ammo: 0,
      //   //! Contracts&Addresses
      //   farmContracts: [],
      //   ammo: null,
      //   masterChefAddress: null,
      //   //?* State Management
      //   pair: null,
    };
  }

  render() {
    return (
      <div class="page" style={{ background: "black" }}>
        NavBar
        <div class="pot-banner">
          <div class="wrapper">
            <div class="banner-wrapper">
              <div class="txt-wrapper">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <span class="title">Opening Jackpot</span>
                <span class="sub-title">
                  <font color="white">
                    The G$wap Pot is the first EWC Pot platform. We aim that
                    every Gangster in the EWC ecosystem be able to make huge
                    profits by spending small amount. We just want to be the
                    Gangstest $wap ever created.
                  </font>
                </span>
                <br></br>
                <div>
                  <span class="title" align="right">
                    <font color="white">
                      <b>
                        <i>From Gangsters to Gangsters</i>
                      </b>
                    </font>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="apy">GLotto #2 up to 3,500,000$</div>
        <br />
        <div class="container pg">
          <div class="pot-list">
            <div class="pot-item farming">
              <div class="pot-status-wrapper">
                <div class="pot-status farming">
                  <font color="ec6998">1 Winner</font>
                </div>
                <div class="pot-token">7 DAYS</div>
              </div>

              <div class="title">
                <img src={ewt} height="100" width="100px" alt="token" />
                <br></br>

                <div
                  class="pot-status farming"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <font color="ec6998" align="center">
                    <br />
                    <b>
                      Winner's Pot
                      <br />
                    </b>
                    <font size="1">up to:</font>
                  </font>
                </div>
              </div>

              <span class="pot-estimated">
                250.000{" "}
                <font color="ec6998" size="1">
                  EWT
                </font>
              </span>
              {/* <span class="pot-timestamp">
                <span class="pot-timestamp">
                  Countdown to Pot Open:{" "}
                  <Countdown date={startContest_0} renderer={renderer_i_0} />
                </span>
              </span> */}
              <div class="pot-divide"></div>
              <div class="pot-status-wrapper">
                <div class="pot-token">Total Deposited</div>
                <div class="pot-token">
                  <b>
                    <font color="ec6998">{this.state.pot_0} </font>
                  </b>{" "}
                  <font size="1">EWT</font>
                </div>
              </div>
              <div class="pot-status-wrapper">
                <div class="pot-token">Min. Reward</div>
                <div class="pot-token">
                  <b>
                    <font color="ec6998">1 </font>
                  </b>{" "}
                  <font size="1">G$</font>
                </div>
              </div>

              {ended != true ? (
                <div>
                  <span class="row">
                    <div
                      class="bunny-button clickable no-mask"
                      onClick={(e) => this.Buy_gLotto_0(e)}
                    >
                      <div class="token-input-max clickable">
                        <font color="ec6998">BUY gLotto</font>
                      </div>
                      <div
                        class="bunny-button clickable "
                        onClick={(e) => this.Buy_2GLotto(e)}
                      >
                        <div class="token-input-max clickable">
                          <font color="ec6998">BUY x5</font>
                        </div>
                      </div>
                      <div
                        class="bunny-button"
                        onClick={(e) => this.Buy_5GLotto(e)}
                        style={{ width: "100px" }}
                      >
                        <div class="token-input-max clickable ">
                          <font color="ec6998">BUY x10</font>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              ) : (
                <div class="bunny-button">
                  <div class="token-input-max clickable no-select">
                    <font color="ec6998">POT CLOSED</font>
                  </div>
                </div>
              )}
            </div>

            {/* CHANGE */}

            {this.state.width >= 900 ? (
              <span class="pot-item farming jackpot" style={{ width: "200%" }}>
                <Line
                  percent={
                    this.state.gLotto_0_allTickets / 250000 <= 1
                      ? "0.1"
                      : this.state.gLotto_0_allTickets / 250000
                  }
                  strokeWidth="4"
                  strokeColor="#ec6998"
                  trailColor="black"
                />
                <div class="pot-status-wrapper"></div>
                <div class="pot-jackpot-title">
                  <div class="row">
                    <div class="farms-card-item clickable">
                      <div class="icon">
                        <div
                          class="card-icon no-select"
                          style={{ height: "90px", width: "90px" }}
                        >
                          <img src={gLotto} alt="icon" />
                        </div>
                      </div>
                      <div></div>
                      <div class="label" align="right">
                        <span>
                          <font color="ec6998">g</font>
                          <font color="white">LOTTO</font>
                        </span>
                      </div>
                      <div class="algo">
                        <div class="details return" align="right">
                          <div class="rates">
                            My <font color="ec6998">g</font>LOTTO
                          </div>
                          <div class="rates" align="right">
                            <span class="apy">
                              <font color="ec6998">
                                <b>{this.state.gLotto_0}</b>
                              </font>
                            </span>
                          </div>
                        </div>
                        <div class="details return" align="right">
                          <div class="rates">
                            My <font color="ec6998">g</font>Probability
                          </div>
                          <div class="rates" align="right">
                            <span class="apy">
                              <font color="ec6998">
                                <b>{this.state.gLotto_0_probability}</b>%
                              </font>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>{/* Operating BOX */}</div>
                <span class="pot-timestamp">
                  {ended == true ? (
                    <div>
                      <span class="pot-timestamp">
                        <font color="ec6998">
                          Time to check if you are the Lucky One
                        </font>
                      </span>
                      <br />
                      <span
                        class="pot-timestamp"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <font size="+1">
                          G<font color="ec6998">$</font>wap wishes you{" "}
                          <font color="ec6998">g</font>Luck!
                        </font>
                      </span>
                    </div>
                  ) : contestStart == true ? (
                    <span class="pot-timestamp">
                      Countdown for Pot to be Closed:{" "}
                      <Countdown date={endContest_0} />
                    </span>
                  ) : (
                    <span class="pot-timestamp">
                      Countdown for Pot to be Open:{" "}
                      <Countdown date={startContest_1} />
                    </span>
                  )}
                </span>
                <div class="pot-divide"></div>
                <div class="pot-status-wrapper">
                  <div class="pot-token">
                    G
                    <font color="ec6998">
                      <b>$</b>
                    </font>
                    wap POT:
                  </div>
                  <div class="pot-token">
                    <b>
                      <font color="ec6998" size="+2">
                        {this.state.pot_0}{" "}
                      </font>
                    </b>{" "}
                    <font size="1">EWT</font>
                  </div>{" "}
                </div>

                <div
                  class="bunny-button default clickable deep-purple "
                  style={{ margin: "10px" }}
                  onClick={(e) => this.Withdraw_gLotto_0(e)}
                >
                  <br></br>
                  <div
                    class="bunny-button default clickable select pink"
                    onClick={(e) => this.Withdraw_gLotto_0(e)}
                    style={{ margin: "10px" }}
                  >
                    <div
                      class="token-input"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        class="token-input-max clickable"
                        onClick={(e) => this.Withdraw_gLotto_0(e)}
                      >
                        Try my gLUCK
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {this.state.contest_0_winner == false && ended == true ? (
                    <i>"Sorry, better Luck next time"</i>
                  ) : this.state.contest_0_winner == true && ended == true ? (
                    <i>"Good Luck, you're a gangster, BUY some $PUG"</i>
                  ) : this.state.firstTime == true ? (
                    <i></i>
                  ) : (
                    <i>
                      "Pot is not closed yet, buy more to increase your
                      probability"
                    </i>
                  )}
                </div>
              </span>
            ) : (
              <span class="pot-item farming jackpot" style={{ width: "100%" }}>
                <Line
                  percent={
                    this.state.gLotto_0_allTickets / 250000 <= 1
                      ? "0.1"
                      : this.state.gLotto_0_allTickets / 250000
                  }
                  strokeWidth="4"
                  strokeColor="#ec6998"
                  trailColor="black"
                />
                <div class="pot-status-wrapper"></div>
                <div class="pot-jackpot-title">
                  <div class="row">
                    <div class="farms-card-item clickable">
                      <div class="icon">
                        <div
                          class="card-icon no-select"
                          style={{ height: "90px", width: "90px" }}
                        >
                          <img src={gLotto} alt="icon" />
                        </div>
                      </div>
                      <div></div>
                      <div class="label" align="right">
                        <span>
                          <font color="ec6998">g</font>
                          <font color="white">LOTTO</font>
                        </span>
                      </div>
                      <div class="algo">
                        <div class="details return" align="right">
                          <div class="rates">
                            My <font color="ec6998">g</font>LOTTO
                          </div>
                          <div class="rates" align="right">
                            <span class="apy">
                              <font color="ec6998">
                                <b>{this.state.gLotto_0}</b>
                              </font>
                            </span>
                          </div>
                        </div>
                        <div class="details return" align="right">
                          <div class="rates">
                            My <font color="ec6998">g</font>Probability
                          </div>
                          <div class="rates" align="right">
                            <span class="apy">
                              <font color="ec6998">
                                <b>{this.state.gLotto_0_probability}</b>%
                              </font>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>{/* Operating BOX */}</div>
                <span class="pot-timestamp">
                  {this.state.endContest_0 <= 0 ? (
                    <div>
                      <span class="pot-timestamp">
                        <font color="ec6998">
                          Time to check if you are the Lucky One
                        </font>
                      </span>
                      <br />
                      <span
                        class="pot-timestamp"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <font size="+1">
                          G<font color="ec6998">$</font>wap wishes you{" "}
                          <font color="ec6998">g</font>Luck!
                        </font>
                      </span>
                    </div>
                  ) : (
                    <span class="pot-timestamp">
                      Countdown for Pot to be Closed:{" "}
                      <Countdown date={endContest_0} />
                    </span>
                  )}
                </span>
                <div class="pot-divide"></div>
                <div class="pot-status-wrapper">
                  <div class="pot-token">
                    G
                    <font color="ec6998">
                      <b>$</b>
                    </font>
                    wap POT:
                  </div>
                  <div class="pot-token">
                    <b>
                      <font color="ec6998" size="+2">
                        {this.state.pot_0}{" "}
                      </font>
                    </b>{" "}
                    <font size="1">EWT</font>
                  </div>{" "}
                </div>

                <div
                  class="bunny-button default clickable deep-purple "
                  style={{ margin: "10px" }}
                  onClick={(e) => this.Withdraw_gLotto_0(e)}
                >
                  <br></br>
                  <div
                    class="bunny-button default clickable select pink"
                    onClick={(e) => this.Withdraw_gLotto_0(e)}
                    style={{ margin: "10px" }}
                  >
                    <div
                      class="token-input"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        class="token-input-max clickable"
                        onClick={(e) => this.Withdraw_gLotto_0(e)}
                      >
                        Try my gLUCK
                      </div>
                    </div>
                  </div>
                </div>
                <div align="center">
                  {this.state.contest_0_winner == false ? (
                    <i>"Sorry, better Luck next time"</i>
                  ) : this.state.contest_0_winner == true ? (
                    <i>"Good Luck, you're a gangster, BUY some $PUG"</i>
                  ) : this.state.firstTime == true ? (
                    <i></i>
                  ) : (
                    <i>
                      "Pot is not closed yet, buy more to increase your
                      probability"
                    </i>
                  )}
                </div>
              </span>
            )}
            {/* change */}
          </div>
        </div>
        <br></br>
        {/* <div class="container pg">
          <div class="pot-list">
            <div class="pot-item farming premium">
              <div class="pot-status-wrapper">
                <div class="pot-status farming premium">
                  <font color="ec6998">1 Winner</font>
                </div>
                <div class="pot-token">7 DAYS LOCKED</div>
              </div>

              <div class="title">
                <img src={gangster} height="100" width="100px" alt="token" />

                <div
                  class="pot-jackpot premium"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  PUG POT
                </div>
              </div>

              <span class="pot-estimated">$74,869.82</span>
              <span class="pot-timestamp">
                <span class="pot-timestamp">
                  Countdown to Pot Open: <Countdown date={startContest_1} />
                </span>
              </span>
              <div class="pot-divide"></div>
              <div class="pot-status-wrapper">
                <div class="pot-token">Total Deposit</div>
                <div class="pot-token">284,479.65 BUNNY</div>
              </div>
              <div class="bunny-button default clickable no-select deep-purple">
                <div class="content">
                  View more<div class="subtext"></div>
                </div>
              </div>
            </div>
            <div class="pot-item farming jackpot">
              <div class="pot-status-wrapper">
                <div class="pot-status farming jackpot">farming</div>
                <div class="pot-token">7 DAYS LOCKED</div>
              </div>
              <div class="pot-jackpot-title">
                <img src={gangster} height="170px" width="170px" alt="token" />
                <span class="pot-jackpot jackpot">BUNNY jackpot</span>
              </div>
              <span class="pot-estimated">$38,253.29</span>
              <span class="pot-timestamp">
                <span class="pot-timestamp">
                  Countdown to Pot Closes: <Countdown date={endContest_1} />
                </span>
              </span>
              <div class="pot-divide"></div>
              <div class="pot-status-wrapper">
                <div class="pot-token">Total Deposit</div>
                <div class="pot-token">145,349.38 BUNNY</div>
              </div>
              <div class="bunny-button default clickable no-select deep-purple">
                <div class="content">
                  View more<div class="subtext"></div>
                </div>
              </div>
            </div>
            <div class="pot-item empty ">
              <img src={gngLotto} alt="cooking" />
              <span>More Coming soon</span>
              <span>This is just the begining</span>
            </div>
          </div>
        </div> */}
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
                <span>More Coming soon</span>
              </font>
              <font color="grey">
                <span>This is just the beginning</span>{" "}
              </font>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}

export default Lottery;
