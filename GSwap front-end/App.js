import { Tabs, Tab } from "react-bootstrap";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
// import  Routes from './routes';

import Web3 from "web3";
import Countdown from "react-countdown";

import "./App.css";
// import EwtFarm from './ewtFarm.js';

//!FAKE -- delete!
import Ewt_Fake from "../abis/Ewt_lp.json";
import Ammo_Fake from "../abis/Ammo_lp.json";
import Clp2 from "../abis/CLP_2.json";
import Clp3 from "../abis/CLP_3.json";
import Clp4 from "../abis/CLP_4.json";
//!end : FAKE -- delete!

import PugMasterChef from "../abis/PMasterChef.json";
import Token from "../abis/SusuToken.json";
//TODO: Implement
import GMasterChef from "../abis/GMasterChef.json";
import GS from "../abis/GSToken.json";

import pugSusu from "./assets/pugSusu.png";
import pugEwtt from "./assets/pugEwtt.png";
import ammoUsdc from "./assets/ammoUsdc.png";
import gsUsdc from "./assets/gsUsdc.png";
import pugUsdc from "./assets/pugUsdc.png";
import pugBnb from "./assets/pugBnb.png";
import slrPug from "./assets/slrPug.png";
import pugAmmo from "./assets/pugAmmo.png";
import gngLotto from "./assets/gngLotto.png";

const farm_opening = new Date(2021, 6, 5, 19, 0, 0, 0);

const gs_pair_0 = "AMMO-USDC";
const gs_pair_1 = "G$-USDC";
const pair_0 = "PUG-EWT";
const pair_1 = "PUG-SUSU";
const pair_3 = "PUG-USDC";
const pair_4 = "PUG-BNB";
const pair_5 = "PUG-SLR";
const pair_6 = "PUG-AMMO";
const pug_ewt_contract_address = "0xc61500fa1bfa61312c71393a202149bac9ce1de4";
const ammo_usdc_contract_address = "0x20ae3646e74dfec646b2788286065f642245ca5f";
const gs_usdc_contract_address = "0xc6838a932e29283aa3b286306b3d3656748832f9";
const pug_susu_contract_address = "0x6a6a9a7215b402771d2a35866a2c445cdc2a4019";
const pug_usdc_contract_address = "0xdc3323a7cd9bd55660f6a461cd14f91c2668de27";
const pug_bnb_contract_address = "0x9bdb88dff2d0639d4824512152794114f557d411";
const pug_slr_contract_address = "0xc376a565e670a31516bf81339f09153466b8f196";
const pug_ammo_contract_address = "0xE99bDF79cB46416E28BBFd2dc9c8f8454D7bDC09";
const pugContractAddress = "0x59b6196e41c118dfF75961257b882e86b915a0e8";

const GS_Block = 0.001074735449735;
const gsPrice = 1;
const AMMO_per_Block = 5.642364376368273;
const EWT_Block_Time = 5.8;
const EWT_Blocks_Day = (60 * 60 * 24) / EWT_Block_Time;
const days_year = 365;
const ttl_gs_allo = 5;
const ammo_usdc_allo = 1;
const gs_usdc_allo = 4;

//TODO: DONE

const gs_usdc_ratio = 2672593.974940015995734;
const ewtAverageValue = 10.5;
const gsAverageValue = 2.5;
const pugAverageValue = 0.0044;
const ammoAverageValue = 0.00062;
const pug_slr_ratio = 0.00567856;
const ammo_usdc_ratio = 29495.38124315014874;
const pug_bnb_ratio = 2.66;
const pug_ammo_ratio = 0.0015;
const pug_ewt_ratio = 0.858140182810175;
const pug_susu_ratio = 0.068926494845361;
const pug_usdc_ratio = 158844.155844155844156;

//TODO: AQUI

const ttl_pugs_allo = 7;
const pug_ewt_allo = 3;
const pug_susu_allo = 2;
const pug_usdc_allo = 1;
const pug_bnb_allo = 1;
const pug_slr_allo = 2;
const pug_ammo_allo = 3;

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

class Home extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
    this.GswapTVL().then(() => {
      const gswap_tvl_interval = setInterval(() => this.GswapTVL(), 100 * 1000);
      this.gswap_tvl_interval = gswap_tvl_interval;
    });
    //* G$ Rewards Reload
    this.AmmoUsdcRewardDisplay().then(() => {
      const ammo_usdc_interval = setInterval(
        () => this.AmmoUsdcRewardDisplay(),
        10 * 1000
      );
      this.ammo_usdc_interval = ammo_usdc_interval;
    });
    this.GsUsdcRewardDisplay().then(() => {
      const gs_usdc_interval = setInterval(
        () => this.GsUsdcRewardDisplay(),
        10 * 1000
      );
      this.gs_usdc_interval = gs_usdc_interval;
    });

    //* $AMMO Rewards Reload
    this.PugEwtRewardDisplay().then(() => {
      const pug_ewt_interval = setInterval(
        () => this.PugEwtRewardDisplay(),
        10 * 1000
      );
      this.pug_ewt_interval = pug_ewt_interval;
    });
    this.PugSusuRewardDisplay().then(() => {
      const pug_susu_interval = setInterval(
        () => this.PugSusuRewardDisplay(),
        10 * 1000
      );
      this.pug_susu_interval = pug_susu_interval;
    });
    this.PugUsdcRewardDisplay().then(() => {
      const pug_usdc_interval = setInterval(
        () => this.PugUsdcRewardDisplay(),
        10 * 1000
      );
      this.pug_usdc_interval = pug_usdc_interval;
    });
    this.PugBnbRewardDisplay().then(() => {
      const pug_bnb_interval = setInterval(
        () => this.PugBnbRewardDisplay(),
        10 * 1000
      );
      this.pug_bnb_interval = pug_bnb_interval;
    });
    this.PugSlrRewardDisplay().then(() => {
      const pug_slr_interval = setInterval(
        () => this.PugSlrRewardDisplay(),
        10 * 1000
      );
      this.pug_slr_interval = pug_slr_interval;
    });
    this.PugAmmoRewardDisplay().then(() => {
      const pug_ammo_interval = setInterval(
        () => this.PugAmmoRewardDisplay(),
        10 * 1000
      );
      this.pug_ammo_interval = pug_ammo_interval;
    });

    //*Interval ends
  }

  componentWillUnmount() {
    clearInterval(this.ammo_usdc_interval);
    clearInterval(this.gs_usdc_interval);
    clearInterval(this.pug_ewt_interval);
    clearInterval(this.pug_susu_interval);
    clearInterval(this.pug_usdc_interval);
    clearInterval(this.pug_bnb_interval);
    clearInterval(this.pug_slr_interval);
    clearInterval(this.pug_ammo_interval);
    clearInterval(this.gswap_tvl_interval);
    // this._isMounted = false;  <----- tried
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const blockAc = await web3.eth.getBlockNumber();

      console.log(`Gangster you are connected through NET: ${netId}`);
      console.log(`Actual Block: ${blockAc}`);
      const accounts = await web3.eth.getAccounts();
      console.log("Currently Connected to G$wap with address:");
      console.log(accounts[0]);

      //load ewt_balance
      if (typeof accounts[0] !== "undefined") {
        const ewt_balance = await web3.eth.getBalance(accounts[0]);
        this.setState({
          account: accounts[0],
          ewt_balance: web3.utils.fromWei(ewt_balance),
          web3: web3,
        });
      } else {
        window.alert("Please login with MetaMask");
      }

      //load contracts
      try {
        const ammoContract = new web3.eth.Contract(
          Token.abi,
          Token.networks[netId].address
        );

        //TODO: AQUI
        const gsContract = new web3.eth.Contract(
          GS.abi,
          GS.networks[netId].address
        );
        const pugContract = new web3.eth.Contract(tokenABI, pugContractAddress);

        // //! APYsss G$
        const totalSupply = await gsContract.methods.totalSupply().call();
        const gs_supply_apy =
          (100 * ((GS_Block / totalSupply) * (GS_Block * EWT_Blocks_Day) + 1)) ^
          (days_year - 1 - 1); //!  G$ SUPPLY APY

        let ammo_usdc_supply_apy =
          (gs_supply_apy * ammo_usdc_allo) / ttl_gs_allo;
        ammo_usdc_supply_apy = (+ammo_usdc_supply_apy).toFixed(2);
        let gs_usdc_supply_apy = (gs_supply_apy * gs_usdc_allo) / ttl_gs_allo;
        gs_usdc_supply_apy = (+gs_usdc_supply_apy).toFixed(2);

        const ammo_totalSupply = await ammoContract.methods
          .totalSupply()
          .call();
        const ammo_supply_apy =
          (100 *
            ((AMMO_per_Block / ammo_totalSupply) *
              (AMMO_per_Block * EWT_Blocks_Day) +
              1)) ^
          (days_year - 1 - 1); //!  G$ SUPPLY APY
        let pug_ewt_apy = (ammo_supply_apy * pug_ewt_allo) / ttl_pugs_allo;
        let pug_susu_apy = (ammo_supply_apy * pug_susu_allo) / ttl_pugs_allo;
        let pug_usdc_apy = (ammo_supply_apy * pug_usdc_allo) / ttl_pugs_allo;
        let pug_bnb_apy = (ammo_supply_apy * pug_bnb_allo) / ttl_pugs_allo;
        let pug_slr_apy = (ammo_supply_apy * pug_slr_allo) / ttl_pugs_allo;
        let pug_ammo_apy = (ammo_supply_apy * pug_ammo_allo) / ttl_pugs_allo;

        pug_ewt_apy = (+pug_ewt_apy).toFixed(2);

        pug_susu_apy = (+pug_susu_apy).toFixed(2);

        pug_usdc_apy = (+pug_usdc_apy).toFixed(2);

        pug_bnb_apy = (+pug_bnb_apy).toFixed(2);
        pug_slr_apy = (+pug_slr_apy).toFixed(2);
        pug_ammo_apy = (+pug_slr_apy).toFixed(2);

        this.setState({
          ammo_usdc_supply_apy: ammo_usdc_supply_apy,
          gs_usdc_supply_apy: gs_usdc_supply_apy,
          pug_ewt_apy: pug_ewt_apy,
          pug_susu_apy: pug_susu_apy,
          pug_usdc_apy: pug_usdc_apy,
          pug_bnb_apy: pug_bnb_apy,
          pug_slr_apy: pug_slr_apy,
          pug_ammo_apy: pug_ammo_apy,
        });

        //TODO: AQUI
        const ammo_usdc_contract = new web3.eth.Contract(
          tokenABI,
          ammo_usdc_contract_address
        );
        const ammo_usdc_clp = await ammo_usdc_contract.methods
          .balanceOf(accounts[0])
          .call();
        const ammo_usdc_clp_wallet_balance = web3.utils.fromWei(ammo_usdc_clp);
        const gs_usdc_contract = new web3.eth.Contract(
          tokenABI,
          gs_usdc_contract_address
        );
        const gs_usdc_clp = await gs_usdc_contract.methods
          .balanceOf(accounts[0])
          .call();
        const gs_usdc_clp_wallet_balance = web3.utils.fromWei(gs_usdc_clp);

        const pug_ewt_contract = new web3.eth.Contract(
          tokenABI,
          pug_ewt_contract_address
        );
        const pug_ewt_clp = await pug_ewt_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_ewt_clp_wallet_balance = web3.utils.fromWei(pug_ewt_clp);

        const pug_susu_contract = new web3.eth.Contract(
          tokenABI,
          pug_susu_contract_address
        );
        const pug_susu_clp = await pug_susu_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_susu_clp_wallet_balance = web3.utils.fromWei(pug_susu_clp);

        const pug_usdc_contract = new web3.eth.Contract(
          tokenABI,
          pug_usdc_contract_address
        );
        const pug_slr_contract = new web3.eth.Contract(
          tokenABI,
          pug_slr_contract_address
        );
        const pug_slr_clp = await pug_slr_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_slr_clp_wallet_balance = web3.utils.fromWei(pug_slr_clp);
        const pug_ammo_contract = new web3.eth.Contract(
          tokenABI,
          pug_ammo_contract_address
        );
        const pug_ammo_clp = await pug_ammo_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_ammo_clp_wallet_balance = web3.utils.fromWei(pug_ammo_clp);
        const pug_usdc_clp = await pug_usdc_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_usdc_clp_wallet_balance = web3.utils.fromWei(pug_usdc_clp);

        const pug_bnb_contract = new web3.eth.Contract(
          tokenABI,
          pug_bnb_contract_address
        );
        const pug_bnb_clp = await pug_bnb_contract.methods
          .balanceOf(accounts[0])
          .call();
        const pug_bnb_clp_wallet_balance = web3.utils.fromWei(pug_bnb_clp);

        const pMasterChef = new web3.eth.Contract(
          PugMasterChef.abi,
          PugMasterChef.networks[netId].address
        );
        const ammo_wallet_wei = await ammoContract.methods
          .balanceOf(this.state.account)
          .call();

        const ammoAddress = Token.networks[netId].address;
        const ammo_wallet_balance = web3.utils.fromWei(ammo_wallet_wei);
        const ammoFeeAddress = await pMasterChef.methods.getFeeAddress().call();

        let user_farm_0 = await pMasterChef.methods
          .userInfo(0, this.state.account)
          .call();
        let user_farm_1 = await pMasterChef.methods
          .userInfo(1, this.state.account)
          .call();
        let user_farm_2 = await pMasterChef.methods
          .userInfo(2, this.state.account)
          .call();
        let user_farm_3 = await pMasterChef.methods
          .userInfo(3, this.state.account)
          .call();
        let user_farm_4 = await pMasterChef.methods
          .userInfo(4, this.state.account)
          .call();
        let user_farm_5 = await pMasterChef.methods
          .userInfo(5, this.state.account)
          .call();

        let pdt_rewards_0 = await pMasterChef.methods
          .pendingSushi(0, this.state.account)
          .call();
        let pdt_rewards_1 = await pMasterChef.methods
          .pendingSushi(1, this.state.account)
          .call();
        let pdt_rewards_2 = await pMasterChef.methods
          .pendingSushi(2, this.state.account)
          .call();
        let pdt_rewards_3 = await pMasterChef.methods
          .pendingSushi(3, this.state.account)
          .call();
        let pdt_rewards_4 = await pMasterChef.methods
          .pendingSushi(4, this.state.account)
          .call();
        let pdt_rewards_5 = await pMasterChef.methods
          .pendingSushi(5, this.state.account)
          .call();

        //TODO: AQUI
        const gMasterChef = new web3.eth.Contract(
          GMasterChef.abi,
          GMasterChef.networks[netId].address
        );
        const gs_wallet_wei = await ammoContract.methods
          .balanceOf(this.state.account)
          .call();
        const gSAddress = Token.networks[netId].address;
        const gS_wallet_balance = web3.utils.fromWei(gs_wallet_wei);
        //TODO: AQUI
        const gSFeeAddress = await gMasterChef.methods.getFeeAddress().call();

        let user_gs_farm_0 = await gMasterChef.methods
          .userInfo(0, this.state.account)
          .call();
        let pdt_gs_rewards_0 = await gMasterChef.methods
          .pendingSushi(0, this.state.account)
          .call();

        let user_gs_farm_1 = await gMasterChef.methods
          .userInfo(2, this.state.account)
          .call();
        let pdt_gs_rewards_1 = await gMasterChef.methods
          .pendingSushi(2, this.state.account)
          .call();

        //* Deposited on PUG
        let depo_clp_pug_ewt_amount_precision = web3.utils.fromWei(
          user_farm_0.amount
        );
        let depo_clp_pug_susu_amount_precision = web3.utils.fromWei(
          user_farm_1.amount
        );
        let depo_clp_pug_usdc_amount_precision = web3.utils.fromWei(
          user_farm_2.amount
        );
        let depo_clp_pug_bnb_amount_precision = web3.utils.fromWei(
          user_farm_3.amount
        );
        let depo_clp_pug_slr_amount_precision = web3.utils.fromWei(
          user_farm_4.amount
        );
        let depo_clp_pug_ammo_amount_precision = web3.utils.fromWei(
          user_farm_5.amount
        );

        const depo_clp_pug_ewt_amount =
          (+depo_clp_pug_ewt_amount_precision).toFixed(4);
        const depo_clp_pug_susu_amount =
          (+depo_clp_pug_susu_amount_precision).toFixed(4);
        const depo_clp_pug_usdc_amount =
          (+depo_clp_pug_usdc_amount_precision).toFixed(4);
        const depo_clp_pug_bnb_amount =
          (+depo_clp_pug_bnb_amount_precision).toFixed(4);
        const depo_clp_pug_slr_amount =
          (+depo_clp_pug_slr_amount_precision).toFixed(4);
        const depo_clp_pug_ammo_amount =
          (+depo_clp_pug_ammo_amount_precision).toFixed(4);

        //* Deposited on GS

        //TODO: AQUI
        const depo_clp_ammo_usdc_amount_precision = web3.utils.fromWei(
          user_gs_farm_0.amount
        );
        const depo_clp_ammo_usdc_amount =
          (+depo_clp_ammo_usdc_amount_precision).toFixed(5);
        const depo_clp_gs_usdc_amount_precision = web3.utils.fromWei(
          user_gs_farm_1.amount
        );
        const depo_clp_gs_usdc_amount =
          (+depo_clp_gs_usdc_amount_precision).toFixed(5);

        //* Rewards
        let containReward_0 = web3.utils.fromWei(pdt_rewards_0);
        let containReward_1 = web3.utils.fromWei(pdt_rewards_1);
        let containReward_2 = web3.utils.fromWei(pdt_rewards_2);
        let containReward_3 = web3.utils.fromWei(pdt_rewards_3);
        let containReward_4 = web3.utils.fromWei(pdt_rewards_4);
        let containReward_5 = web3.utils.fromWei(pdt_rewards_5);

        //TODO: AQUI
        let containGsReward_0 = web3.utils.fromWei(pdt_gs_rewards_0);
        let containGsReward_1 = web3.utils.fromWei(pdt_gs_rewards_1);

        let reward_farm_0 = (+containReward_0).toFixed(2);
        let reward_farm_1 = (+containReward_1).toFixed(2);
        let reward_farm_2 = (+containReward_2).toFixed(2);
        let reward_farm_3 = (+containReward_3).toFixed(2);
        let reward_farm_4 = (+containReward_4).toFixed(2);
        let reward_farm_5 = (+containReward_5).toFixed(2);

        //TODO: AQUI
        let reward_gs_farm_0 = (+containGsReward_0).toFixed(5);
        let reward_gs_farm_1 = (+containGsReward_1).toFixed(5);
        //TODO: AQUI
        reward_gs_farm_0 = reward_gs_farm_0
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        reward_farm_0 = reward_farm_0
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        reward_farm_1 = reward_farm_1
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        reward_farm_2 = reward_farm_2
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        reward_farm_3 = reward_farm_3
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        reward_farm_4 = reward_farm_4
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        reward_farm_5 = reward_farm_5
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const farmContracts = [
          pug_ewt_contract,
          pug_susu_contract,
          pug_usdc_contract,
          pug_bnb_contract,
          pug_slr_contract,
          pug_ammo_contract,
        ];

        //TODO: AQUI
        const gfarmContracts = [ammo_usdc_contract, gs_usdc_contract];
        this.setState({
          //! AMMO
          ammo: ammoContract,
          ammoAddress: ammoAddress,

          //TODO: AQUI
          pug: pugContract,
          gs: gsContract,
          gSAddress: gSAddress,
          gfarmContracts: gfarmContracts,

          //! PugMasterChef
          pMasterChef: pMasterChef,
          pmasterChefAddress: PugMasterChef.networks[netId].address,
          //TODO: AQUI
          gMasterChef: gMasterChef,
          gmasterChefAddress: GMasterChef.networks[netId].address,
          feeAddres: ammoFeeAddress,
          //TODO: AQUI
          gSfeeAddres: gSFeeAddress,
          //! All_Farms
          farmContracts: farmContracts,

          //* PUG FARMS
          //?Farm_0
          reward_pug_ewt_pdt_ammo: reward_farm_0,
          depo_clp_pug_ewt_amount: depo_clp_pug_ewt_amount,
          depo_clp_pug_ewt_amount_precision: depo_clp_pug_ewt_amount_precision,
          //?Farm_1
          reward_pug_susu_pdt_ammo: reward_farm_1,
          depo_clp_pug_susu_amount: depo_clp_pug_susu_amount,
          depo_clp_pug_susu_amount_precision:
            depo_clp_pug_susu_amount_precision,
          //?Farm_2
          reward_pug_usdc_pdt_ammo: reward_farm_2,
          depo_clp_pug_usdc_amount: depo_clp_pug_usdc_amount,
          depo_clp_pug_usdc_amount_precision:
            depo_clp_pug_usdc_amount_precision,
          //?Farm_3
          reward_pug_bnb_pdt_ammo: reward_farm_3,
          depo_clp_pug_bnb_amount: depo_clp_pug_bnb_amount,
          depo_clp_pug_bnb_amount_precision: depo_clp_pug_bnb_amount_precision,
          //?Farm_4
          reward_pug_slr_pdt_ammo: reward_farm_4,
          depo_clp_pug_slr_amount: depo_clp_pug_slr_amount,
          depo_clp_pug_slr_amount_precision: depo_clp_pug_slr_amount_precision,
          //?Farm_5
          reward_pug_ammo_pdt_ammo: reward_farm_5,
          depo_clp_pug_ammo_amount: depo_clp_pug_ammo_amount,
          depo_clp_pug_ammo_amount_precision:
            depo_clp_pug_ammo_amount_precision,

          //TODO: AQUI
          // //* GS FARMS
          //?Farm_AMMO_USDC
          reward_ammo_usdc_pdt_gs: reward_gs_farm_0,
          depo_clp_ammo_usdc_amount: depo_clp_ammo_usdc_amount,
          depo_clp_ammo_usdc_amount_precision:
            depo_clp_ammo_usdc_amount_precision,

          //?Farm_GS_USDC
          reward_gs_usdc_pdt_gs: reward_gs_farm_0,
          depo_clp_gs_usdc_amount: depo_clp_gs_usdc_amount,
          depo_clp_gs_usdc_amount_precision: depo_clp_gs_usdc_amount_precision,

          //? User Globals
          pug_ewt_clp_wallet_balance: pug_ewt_clp_wallet_balance,
          pug_susu_clp_wallet_balance: pug_susu_clp_wallet_balance,
          pug_slr_clp_wallet_balance: pug_slr_clp_wallet_balance,
          pug_ammo_clp_wallet_balance: pug_ammo_clp_wallet_balance,
          //TODO: AQUI
          ammo_usdc_clp_wallet_balance: ammo_usdc_clp_wallet_balance,
          gs_usdc_clp_wallet_balance: gs_usdc_clp_wallet_balance,
          pug_usdc_clp_wallet_balance: pug_usdc_clp_wallet_balance,
          pug_bnb_clp_wallet_balance: pug_bnb_clp_wallet_balance,
          ammo_wallet_balance: ammo_wallet_balance,
          //TODO: AQUI
          gs_wallet_balance: gS_wallet_balance,

          //* Progra Globals
          web3: web3,
          netId: netId,
        });
      } catch (e) {
        console.log("Error", e);
        window.alert("Contracts not deployed to the current network");
      }
    } else {
      window.alert("Please install MetaMask");
    }
  }

  //! REWARDS IN FARMS (G$)

  async AmmoUsdcRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {

    try {
      const pdt_rewards_0 = await this.state.gMasterChef.methods
        .pendingSushi(0, this.state.account)
        .call();
      const containGsReward_0 = this.state.web3.utils.fromWei(pdt_rewards_0);
      const reward_ammo_usdc_pdt_gs_precision =
        this.state.web3.utils.fromWei(pdt_rewards_0);
      let reward_farm_0 = (+containGsReward_0).toFixed(5);
      reward_farm_0 = reward_farm_0
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_ammo_usdc_pdt_gs: reward_farm_0,
        reward_ammo_usdc_pdt_gs_precision: reward_ammo_usdc_pdt_gs_precision,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async GsUsdcRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {

    try {
      const pdt_rewards_0 = await this.state.gMasterChef.methods
        .pendingSushi(2, this.state.account)
        .call();
      const containGsReward_0 = this.state.web3.utils.fromWei(pdt_rewards_0);
      const reward_gs_usdc_pdt_gs_precision =
        this.state.web3.utils.fromWei(pdt_rewards_0);
      let reward_farm_0 = (+containGsReward_0).toFixed(5);
      reward_farm_0 = reward_farm_0
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_gs_usdc_pdt_gs: reward_farm_0,
        reward_gs_usdc_pdt_gs_precision: reward_gs_usdc_pdt_gs_precision,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  //! REWARDS IN FARMS ($AMMO)
  async PugEwtRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      const pdt_rewards_0 = await this.state.pMasterChef.methods
        .pendingSushi(0, this.state.account)
        .call();
      const containReward_0 = this.state.web3.utils.fromWei(pdt_rewards_0);
      let reward_farm_0 = (+containReward_0).toFixed(2);
      reward_farm_0 = reward_farm_0
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_ewt_pdt_ammo: reward_farm_0,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async PugSusuRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      const pdt_rewards_1 = await this.state.pMasterChef.methods
        .pendingSushi(1, this.state.account)
        .call();
      const containReward_1 = this.state.web3.utils.fromWei(pdt_rewards_1);
      let reward_farm_1 = (+containReward_1).toFixed(2);
      reward_farm_1 = reward_farm_1
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_susu_pdt_ammo: reward_farm_1,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async PugUsdcRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      const pdt_rewards_2 = await this.state.pMasterChef.methods
        .pendingSushi(2, this.state.account)
        .call();
      const containReward_2 = this.state.web3.utils.fromWei(pdt_rewards_2);
      let reward_farm_2 = (+containReward_2).toFixed(2);
      reward_farm_2 = reward_farm_2
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_usdc_pdt_ammo: reward_farm_2,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async PugBnbRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      const pdt_rewards_3 = await this.state.pMasterChef.methods
        .pendingSushi(3, this.state.account)
        .call();
      const containReward_3 = this.state.web3.utils.fromWei(pdt_rewards_3);
      let reward_farm_3 = (+containReward_3).toFixed(2);
      reward_farm_3 = reward_farm_3
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_bnb_pdt_ammo: reward_farm_3,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async PugSlrRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      const pdt_rewards_4 = await this.state.pMasterChef.methods
        .pendingSushi(4, this.state.account)
        .call();
      const containReward_4 = this.state.web3.utils.fromWei(pdt_rewards_4);
      let reward_farm_4 = (+containReward_4).toFixed(2);
      reward_farm_4 = reward_farm_4
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_slr_pdt_ammo: reward_farm_4,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  async PugAmmoRewardDisplay() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    try {
      const pdt_rewards_5 = await this.state.pMasterChef.methods
        .pendingSushi(5, this.state.account)
        .call();
      const containReward_5 = this.state.web3.utils.fromWei(pdt_rewards_5);
      let reward_farm_5 = (+containReward_5).toFixed(2);
      reward_farm_5 = reward_farm_5
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        reward_pug_ammo_pdt_ammo: reward_farm_5,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }
  async GswapTVL() {
    //TODO: This is my own implementation of FARMING MODE
    // if (this.state.farmMode == true) {
    const gsMaster = "0xc178BDDe838ACb506C499d22c478452c4528A8Aa";
    const ammoMaster = "0xfD58a7c40E98608ac4d1676541bC1f0037d8a180";
    const ammo_usdc_contract = new this.state.web3.eth.Contract(
      tokenABI,
      ammo_usdc_contract_address
    );
    const gs_usdc_contract = new this.state.web3.eth.Contract(
      tokenABI,
      gs_usdc_contract_address
    );
    const pug_ammo_contract = new this.state.web3.eth.Contract(
      tokenABI,
      pug_ammo_contract_address
    );
    const pug_ewt_contract = new this.state.web3.eth.Contract(
      tokenABI,
      pug_ewt_contract_address
    );
    const pug_susu_contract = new this.state.web3.eth.Contract(
      tokenABI,
      pug_susu_contract_address
    );
    const pug_bnb_contract = new this.state.web3.eth.Contract(
      tokenABI,
      pug_bnb_contract_address
    );
    const pug_usdc_contract = new this.state.web3.eth.Contract(
      tokenABI,
      pug_usdc_contract_address
    );
    const pug_slr_contract = new this.state.web3.eth.Contract(
      tokenABI,
      pug_slr_contract_address
    );
    const pug_contract = new this.state.web3.eth.Contract(
      tokenABI,
      pugContractAddress
    );

    try {
      console.log("LOKING AT");
      const gsRewards = await this.state.gs.methods.balanceOf(gsMaster).call();
      console.log(gsRewards);

      gsRewards = this.state.web3.utils.fromWei(gsRewards);

      const ammo_usdc_clp = await ammo_usdc_contract.methods
        .balanceOf(gsMaster)
        .call();
      ammo_usdc_clp = this.state.web3.utils.fromWei(ammo_usdc_clp);

      const gs_usdc_clp = await gs_usdc_contract.methods
        .balanceOf(gsMaster)
        .call();
      gs_usdc_clp = this.state.web3.utils.fromWei(gs_usdc_clp);

      const pug_ammo_clp = await pug_ammo_contract.methods
        .balanceOf(ammoMaster)
        .call();
      const pug_ammo = this.state.web3.utils.fromWei(pug_ammo_clp);
      console.log(pug_ammo);
      const pug_susu_clp = await pug_susu_contract.methods
        .balanceOf(ammoMaster)
        .call();
      const pug_susu = this.state.web3.utils.fromWei(pug_susu_clp);
      console.log(pug_susu);
      const pug_ewt_clp = await pug_ewt_contract.methods
        .balanceOf(ammoMaster)
        .call();
      const pug_ewt = this.state.web3.utils.fromWei(pug_ewt_clp);
      const pug_usdc_clp = await pug_usdc_contract.methods
        .balanceOf(ammoMaster)
        .call();
      const pug_usdc = this.state.web3.utils.fromWei(pug_usdc_clp);
      const pug_bnb_clp = await pug_bnb_contract.methods
        .balanceOf(ammoMaster)
        .call();
      const pug_bnb = this.state.web3.utils.fromWei(pug_bnb_clp);
      const pug_slr_clp = await pug_slr_contract.methods
        .balanceOf(ammoMaster)
        .call();
      const pug_slr = this.state.web3.utils.fromWei(pug_slr_clp);

      const total_ammo_in_dollars =
        pug_ammo * pug_ammo_ratio +
        pug_susu * pug_susu_ratio +
        pug_ewt * pug_ewt_ratio +
        pug_usdc * pug_usdc_ratio +
        pug_bnb * pug_bnb_ratio +
        pug_slr * pug_slr_ratio;

      let tvl_pug_ammo = pug_ammo * pug_ammo_ratio;
      tvl_pug_ammo = (+tvl_pug_ammo).toFixed(2);
      tvl_pug_ammo = tvl_pug_ammo
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let tvl_pug_susu = pug_susu * pug_susu_ratio;
      tvl_pug_susu = (+tvl_pug_susu).toFixed(2);
      tvl_pug_susu = tvl_pug_susu
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let tvl_pug_ewt = pug_ewt * pug_ewt_ratio;
      tvl_pug_ewt = (+tvl_pug_ewt).toFixed(2);
      tvl_pug_ewt = tvl_pug_ewt
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let tvl_pug_usdc = pug_usdc * pug_usdc_ratio;
      tvl_pug_usdc = (+tvl_pug_usdc).toFixed(2);
      tvl_pug_usdc = tvl_pug_usdc
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let tvl_pug_bnb = pug_bnb * pug_bnb_ratio;
      tvl_pug_bnb = (+tvl_pug_bnb).toFixed(2);
      tvl_pug_bnb = tvl_pug_bnb
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let tvl_pug_slr = pug_slr * pug_slr_ratio;
      tvl_pug_slr = (+tvl_pug_slr).toFixed(2);
      tvl_pug_slr = tvl_pug_slr
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let tvl_gs_usdc = gs_usdc_clp * gs_usdc_ratio;
      tvl_gs_usdc = (+tvl_gs_usdc).toFixed(2);
      tvl_gs_usdc = tvl_gs_usdc
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let tvl_ammo_usdc = ammo_usdc_clp * ammo_usdc_ratio;
      tvl_ammo_usdc = (+tvl_ammo_usdc).toFixed(2);
      tvl_ammo_usdc = tvl_ammo_usdc
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        tvl_pug_ammo: tvl_pug_ammo,
        tvl_pug_susu: tvl_pug_susu,
        tvl_pug_ewt: tvl_pug_ewt,
        tvl_pug_usdc: tvl_pug_usdc,
        tvl_pug_bnb: tvl_pug_bnb,
        tvl_pug_slr: tvl_pug_slr,
        tvl_gs_usdc: tvl_gs_usdc,
        tvl_ammo_usdc: tvl_ammo_usdc,
      });

      console.log(total_ammo_in_dollars);
      console.log(total_ammo_in_dollars);
      console.log(total_ammo_in_dollars);
      console.log(total_ammo_in_dollars);
      console.log(total_ammo_in_dollars);
      const total_gs_valued_in_dollars =
        gs_usdc_clp * gs_usdc_ratio +
        ammo_usdc_clp * ammo_usdc_ratio +
        gsRewards * gsAverageValue;

      total_gs_valued_in_dollars = +total_gs_valued_in_dollars;

      console.log(`All G Stuff is: ${total_gs_valued_in_dollars}$`);

      const lotto = await this.state.web3.eth.getBalance(
        "0x1350da838AD7b9027c874b859C8f874E48f488D0"
      );
      console.log(lotto);
      console.log(lotto);
      console.log(lotto);
      const lottoETH = this.state.web3.utils.fromWei(lotto);
      const pugReserve = await pug_contract.methods
        .balanceOf("0x10Dd48A9Dda3E462C80c86E9c30c613324c321F0")
        .call();

      lottoETH = +lottoETH * ewtAverageValue;

      const pugAvaialble = this.state.web3.utils.fromWei(pugReserve);
      console.log(`All G Stuff is: ${lottoETH}$`);
      total_gs_valued_in_dollars =
        total_gs_valued_in_dollars + lottoETH + total_ammo_in_dollars;
      // + pugAvaialble * pugAverageValue;

      // const ammoLp = await this.state.web3.gsContract
      //   .balanceOf("0xc178BDDe838ACb506C499d22c478452c4528A8Aa")
      //   .call();

      // let reward_farm_5 = (+containReward_5).toFixed(2);
      total_gs_valued_in_dollars = (+total_gs_valued_in_dollars).toFixed(2);

      total_gs_valued_in_dollars = total_gs_valued_in_dollars
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      const gsTotalSupply = await this.state.gs.methods.totalSupply().call();
      const pugTotalSupply = await pug_contract.methods.totalSupply().call();
      const ammoTotalSupply = await this.state.ammo.methods
        .totalSupply()
        .call();

      const gsTS = this.state.web3.utils.fromWei(gsTotalSupply);
      const pugTS = this.state.web3.utils.fromWei(pugTotalSupply);
      const ammoTS = this.state.web3.utils.fromWei(ammoTotalSupply);
      let gangster_market_cap =
        gsTS * gsAverageValue +
        (pugTS - pugAvaialble) * pugAverageValue +
        ammoTS * ammoAverageValue;

      gangster_market_cap = gangster_market_cap.toFixed(2);
      gangster_market_cap = gangster_market_cap
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let gswap_rewards =
        gsTS * gsAverageValue + ammoTS * ammoAverageValue + lottoETH;

      gswap_rewards = gswap_rewards.toFixed(2);
      gswap_rewards = gswap_rewards
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.setState({
        total_gs_valued_in_dollars: total_gs_valued_in_dollars,
        gangster_market_cap: gangster_market_cap,
        gswap_rewards: gswap_rewards,
      });
    } catch (e) {
      console.log(e);
    }
    // } else {

    // }
  }

  //! DEPOSIT IN FARMS (G$)
  async deposit_ammo_usdc_clp(amount) {
    if (amount != 0) {
      const user_gs_farm_0 = await this.state.gfarmContracts[0].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("2");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("50000000000000000");

      if (this.state.GMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.gfarmContracts[0].methods
            .approve(this.state.gmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //* Fee GS
          //TODO: Fee GS
          await this.state.gs.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.gMasterChef.methods.deposit(0, deposit).send({
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

  async deposit_gs_usdc_clp(amount) {
    if (amount != 0) {
      const user_gs_farm_0 = await this.state.gfarmContracts[1].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("2");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("50000000000000000");

      if (this.state.GMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.gfarmContracts[1].methods
            .approve(this.state.gmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //* Fee GS
          //TODO: Fee GS
          await this.state.gs.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.gMasterChef.methods.deposit(2, deposit).send({
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

  //! DEPOSIT IN FARMS (PUG)
  async deposit_pug_ewt_clp(amount) {
    if (amount != 0) {
      const user_farm_0 = await this.state.farmContracts[0].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;

      const fee = new this.state.web3.utils.BN("50000000000000000");
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          const allowed = await this.state.farmContracts[0].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({ from: this.state.account });

          //TODO: 2
          //TODO: Fee GS
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(0, deposit).send({
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

  async deposit_pug_susu_clp(amount) {
    if (amount != 0) {
      const user_farm_1 = await this.state.farmContracts[1].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("50000000000000000");

      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[1].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });
          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(1, deposit).send({
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

  async deposit_pug_usdc_clp(amount) {
    if (amount != 0) {
      const user_farm_2 = await this.state.farmContracts[2].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("50000000000000000");

      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[2].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(2, deposit).send({
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

  async deposit_pug_bnb_clp(amount) {
    if (amount != 0) {
      const user_farm_3 = await this.state.farmContracts[3].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("50000000000000000");

      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[3].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(3, deposit).send({
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

  async deposit_pug_slr_clp(amount) {
    if (amount != 0) {
      const user_farm_4 = await this.state.farmContracts[4].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("50000000000000000");

      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[4].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(4, deposit).send({
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

  async deposit_pug_ammo_clp(amount) {
    if (amount != 0) {
      const user_farm_5 = await this.state.farmContracts[5].methods
        .balanceOf(this.state.account)
        .call();
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");

      const dep_amount = this.state.web3.utils.toWei(amount);

      const deposit = new this.state.web3.utils.BN(dep_amount);
      const allow = dep_amount;
      const fee = new this.state.web3.utils.BN("50000000000000000");

      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();
          const allowed = await this.state.farmContracts[5].methods
            .approve(this.state.pmasterChefAddress, allow)
            .send({
              from: this.state.account,
            });

          //* FEE (G$)
          // await this.state.gs.methods.transfer(gFeeAddress, fee).send({
          //   from: this.state.account,
          //   gas: gas,
          //   gasPrice: gasPrice,
          // });

          await this.state.pMasterChef.methods.deposit(5, deposit).send({
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

  //! END: DEPOSIT IN FARMS

  //! WITHDRAW GS  FARMS

  async withdraw_ammo_usdc_clp(e) {
    if (this.state.depo_clp_ammo_usdc_amount_precision > 0) {
      const user_farm_0_gs = await this.state.gMasterChef.methods
        .userInfo(0, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_0_gs.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("20000");
      const fee = new this.state.web3.utils.BN("50000000000000000");

      const currentGSBalance = await this.state.gs.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.gMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (G$) withdraw
          await this.state.gs.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.gMasterChef.methods
            .withdraw(0, withdraw)
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

  async withdraw_gs_usdc_clp(e) {
    if (this.state.depo_clp_gs_usdc_amount_precision > 0) {
      const user_farm_1_gs = await this.state.gMasterChef.methods
        .userInfo(2, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_1_gs.amount);
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
      if (this.state.gMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          // * FEE (G$) withdraw
          await this.state.gs.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.gMasterChef.methods
            .withdraw(2, withdraw)
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

  //! WITHDRAW PUG FARMS

  async withdraw_pug_ewt_clp(e) {
    if (this.state.depo_clp_pug_ewt_amount_precision > 0) {
      const user_farm_0 = await this.state.pMasterChef.methods
        .userInfo(0, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_0.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");

      const ammoAddress = this.state.ammoAddress;
      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();
      const fee = new this.state.web3.utils.BN("50000000000000000000");

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (PUG)
          await this.state.pug.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.pMasterChef.methods
            .withdraw(0, withdraw)
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

  async withdraw_pug_susu_clp(e) {
    if (this.state.depo_clp_pug_susu_amount_precision > 0) {
      const user_farm_1 = await this.state.pMasterChef.methods
        .userInfo(1, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_1.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");
      const fee = new this.state.web3.utils.BN("50000000000000000000");

      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          ///* FEE (PUG)
          await this.state.pug.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.pMasterChef.methods
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

  async withdraw_pug_usdc_clp(e) {
    if (this.state.depo_clp_pug_usdc_amount_precision > 0) {
      const user_farm_2 = await this.state.pMasterChef.methods
        .userInfo(2, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_2.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");
      const fee = new this.state.web3.utils.BN("50000000000000000000");

      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (PUG)
          await this.state.pug.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.pMasterChef.methods
            .withdraw(2, withdraw)
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

  async withdraw_pug_bnb_clp(e) {
    if (this.state.depo_clp_pug_bnb_amount_precision > 0) {
      const user_farm_3 = await this.state.pMasterChef.methods
        .userInfo(3, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_3.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");
      const fee = new this.state.web3.utils.BN("50000000000000000000");

      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (PUG)
          await this.state.pug.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.pMasterChef.methods
            .withdraw(3, withdraw)
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

  async withdraw_pug_slr_clp(e) {
    if (this.state.depo_clp_pug_slr_amount_precision > 0) {
      const user_farm_4 = await this.state.pMasterChef.methods
        .userInfo(4, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_4.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");
      const fee = new this.state.web3.utils.BN("50000000000000000000");

      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (PUG)
          await this.state.pug.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.pMasterChef.methods
            .withdraw(4, withdraw)
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

  async withdraw_pug_ammo_clp(e) {
    if (this.state.depo_clp_pug_ammo_amount_precision > 0) {
      const user_farm_5 = await this.state.pMasterChef.methods
        .userInfo(5, this.state.account)
        .call();
      const maxAmount = this.state.web3.utils.fromWei(user_farm_5.amount);
      const withdraw = new this.state.web3.utils.BN(
        this.state.web3.utils.toWei(maxAmount)
      );
      const ammoAddress = this.state.ammoAddress;
      const gas = new this.state.web3.utils.BN("1000000");
      const gasPrice = new this.state.web3.utils.BN("200000");
      const fee = new this.state.web3.utils.BN("50000000000000000000");

      const currentAmmoBalance = await this.state.ammo.methods
        .balanceOf(this.state.account)
        .call();

      e.preventDefault();
      if (this.state.pMasterChef !== "undefined") {
        try {
          const gFeeAddress = await this.state.gMasterChef.methods
            .getFeeAddress()
            .call();

          //* FEE (PUG)
          await this.state.pug.methods.transfer(gFeeAddress, fee).send({
            from: this.state.account,
            gas: gas,
            gasPrice: gasPrice,
          });

          await this.state.pMasterChef.methods
            .withdraw(5, withdraw)
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

  //! END: WITHDRAW IN FARMS

  constructor(props) {
    super(props);
    this.state = {
      //*Globals
      web3: "undefined",
      pMasterChef: null,
      netId: null,
      ammoFeeAddress: null,
      //TODO: AQUI
      gFeeAddress: null,
      //?UserGlobals
      account: "",
      ewt_balance: 0,
      //!Balances

      //*GSWAP Globals
      total_gs_valued_in_dollars: "999,999.99",
      gswap_rewards: "99,999.99",
      gangster_market_cap: "99,999,999.99",

      //* AMMO_USDC
      //TODO: AQUI
      ammo_usdc_clp_wallet_balance: 0,
      reward_ammo_usdc_pdt_gs: 0.0,
      reward_ammo_usdc_pdt_gs_precision: 0.0,
      depo_clp_ammo_usdc_amount: 0,
      input_lp_ammo_usdc: 0,

      //* GS_USDC
      //TODO: AQUI
      gs_usdc_clp_wallet_balance: 0,
      reward_gs_usdc_pdt_gs: 0.0,
      reward_gs_usdc_pdt_gs_precision: 0.0,
      depo_clp_gs_usdc_amount: 0,
      input_lp_gs_usdc: 0,

      //* PUG_EWT
      pug_ewt_clp_wallet_balance: 0,
      reward_pug_ewt_pdt_ammo: 0.0,
      depo_clp_pug_ewt_amount: 0,
      input_lp_pug_ewt: 0,

      //* PUG_SUSU
      pug_susu_clp_wallet_balance: 0,
      reward_pug_susu_pdt_ammo: 0.0,
      depo_clp_ammo_usdc_amount: 0,
      input_lp_pug_susu: 0,

      //* PUG_USDC
      pug_usdc_clp_wallet_balance: 0,
      reward_pug_usdc_pdt_ammo: 0.0,
      depo_clp_pug_usdc_amount: 0,
      input_lp_pug_usdc: 0,

      //* PUG_BNB
      pug_bnb_clp_wallet_balance: 0,
      reward_pug_bnb_pdt_ammo: 0.0,
      depo_clp_pug_bnb_amount: 0,
      input_lp_pug_bnb: 0,

      //* PUG_SLR
      pug_slr_clp_wallet_balance: 0,
      reward_pug_slr_pdt_ammo: 0.0,
      depo_clp_pug_slr_amount: 0,
      input_lp_pug_slr: 0,

      //* PUG_AMMO
      pug_ammo_clp_wallet_balance: 0,
      reward_pug_ammo_pdt_ammo: 0.0,
      depo_clp_pug_ammo_amount: 0,
      input_lp_pug_ammo: 0,

      //! Contracts&Addresses
      farmContracts: [],
      //TODO: AQUI
      gfarmContracts: [],
      ammo: null,
      gs: null,
      pmasterChefAddress: null,
      //TODO: AQUI
      gmasterChefAddress: null,

      //?* State Management
      pair: null,
    };
  }

  ChangeCLP_AMMO_USDC_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_ammo_usdc: this.state.ammo_usdc_clp_wallet_balance,
      });
    } else {
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
      this.setState({ input_lp_ammo_usdc: event.target.value });
    }
  };

  ChangeCLP_GS_USDC_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_gs_usdc: this.state.gs_usdc_clp_wallet_balance,
      });
    } else {
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
      this.setState({ input_lp_gs_usdc: event.target.value });
    }
  };

  ChangeCLP_PUG_EWT_Amount = (event) => {
    console.log(event.target.value == undefined);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_ewt: this.state.pug_ewt_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_ewt: event.target.value });
    }
  };

  ChangeCLP_PUG_SUSU_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_susu: this.state.pug_susu_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_susu: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  ChangeCLP_PUG_USDC_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_usdc: this.state.pug_usdc_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_usdc: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  ChangeCLP_PUG_BNB_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_bnb: this.state.pug_bnb_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_bnb: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  ChangeCLP_PUG_SLR_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_slr: this.state.pug_slr_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_slr: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  ChangeCLP_PUG_AMMO_Amount = (event) => {
    console.log(event.target.value);
    if (event.target.value == undefined) {
      this.setState({
        input_lp_pug_ammo: this.state.pug_ammo_clp_wallet_balance,
      });
    } else {
      this.setState({ input_lp_pug_ammo: event.target.value });
      //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
    }
  };

  //*Navigation

  //* END: Navigation

  render() {
    return (
      <div>
        <div className="root">
          <br></br>
          <div className="page" style={{ background: "black" }}>
            <br></br>
            <br></br>
            <div class="pot-banner">
              <div class="wrapper">
                <div class="banner-wrapper">
                  <div class="txt-wrapper">
                    <span class="title">
                      G<font size="+3">angster</font> F
                      <font size="+3">arming</font>
                    </span>

                    <div class="page-header no-select">
                      <span class="title">
                        G$ helps $PUG lovers get more G$ &
                      </span>
                      <div class="subtitle">
                        <div class="farms-header">
                          <div class="dashboard">
                            <div class="stat tvl">
                              <span class="value">
                                <i>${this.state.total_gs_valued_in_dollars}</i>
                              </span>
                              <span class="description">
                                Total Deposited Value at G$wap
                              </span>
                            </div>
                            <div class="stat mcap">
                              <span class="value">
                                <i>${this.state.gangster_market_cap}</i>
                              </span>
                              <span class="description">
                                TTL Gangster
                                <br />
                                Market Cap
                              </span>
                            </div>
                            <div class="stat perf">
                              <span class="value">
                                <i>$ {this.state.gswap_rewards}</i>
                              </span>
                              <span class="description">
                                Profits for
                                <br />
                                G$wap lovers
                              </span>
                            </div>
                          </div>
                          <br />
                          Supported Pairs
                          <div class="partners">
                            <div class="social-group">
                              <img
                                class="icon clickable no-select"
                                src={gsUsdc}
                                alt="telegram"
                              />
                            </div>
                            <div class="link-group">
                              <img
                                class="icon clickable no-select"
                                src={pugEwtt}
                              />
                              <img
                                class="icon clickable no-select"
                                src={pugAmmo}
                              />
                              <img
                                class="icon clickable no-select"
                                src={pugSusu}
                              />
                              <img
                                class="icon clickable no-select"
                                src={pugBnb}
                                alt="telegram"
                              />
                              <img
                                class="icon clickable no-select"
                                src={pugUsdc}
                              />

                              <img
                                class="icon clickable no-select"
                                src={slrPug}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="page-content"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div class="container pg">
                <div class="farms-list-wrapper">
                  {/* FIRST FARM */}
                  {/* TODO: AQUI */}
                  {/* G$ - USDC FARM */}

                  <main role="main" className="farm-list">
                    <div class="ewt_balance" align="left">
                      <span class="label">
                        <font color="ec6998">
                          <b>
                            WALLET <font color="white"></font> BALANCE:
                          </b>
                        </font>{" "}
                      </span>
                      {/* TODO: AQUI */}
                      <span class="value">
                        <font color="white">
                          {this.state.gs_usdc_clp_wallet_balance}
                        </font>
                      </span>
                    </div>

                    <div class="row">
                      <div class="farms-card-item clickable boost-subimp">
                        <div class="icon">
                          <div
                            class="card-icon no-select"
                            style={{
                              height: "120px",
                              width: "120px",
                            }}
                          >
                            <img src={gsUsdc} alt="icon" />
                          </div>
                        </div>
                        <div></div>
                        <div
                          class="label"
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <font color="white">G</font>
                            <i>$</i>
                            <font color="white">-USDC</font>
                          </span>{" "}
                          <span>
                            <font color="white" size="1">
                              G
                            </font>
                            <font color="fe1e70" size="1">
                              <i>$wap Booster</i>
                            </font>
                          </span>
                        </div>
                        <div class="rates">
                          <span class="apy">
                            {/* TODO: REMOVE THIS AND UNCOMMENT OTHER */}

                            {/* TODO: AQUI */}

                            {this.state.reward_gs_usdc_pdt_gs_precision <
                            0.000001 ? (
                              <font>
                                {this.state.gs_usdc_supply_apy}
                                <i>
                                  <font size="+1">%</font>
                                </i>
                              </font>
                            ) : (
                              <font>
                                <font>{this.state.reward_gs_usdc_pdt_gs}</font>{" "}
                                G
                                <i>
                                  <font size="+1">$</font>
                                </i>
                              </font>
                            )}
                          </span>
                          {this.state.reward_gs_usdc_pdt_gs_precision <=
                          0.000001 ? (
                            <span class="apr">
                              <font>
                                <font size="+1">
                                  <i>APY</i>
                                </font>
                              </font>
                              {/* {this.state.reward_ammo_usdc_pdt_gs == 0 ? (
                              <font>
                                <font size="+1">
                                  <i>APY</i>
                                </font>
                              </font>
                            ) : (
                              ""
                            )} */}
                            </span>
                          ) : (
                            <span class="apr"></span>
                          )}
                        </div>
                        <div class="details return" align="right">
                          <div
                            class="bunny-button clickable no-select"
                            onClick={(e) => this.withdraw_gs_usdc_clp(e)}
                          >
                            <div class="content">
                              <font
                                color={
                                  this.state.depo_clp_gs_usdc_amount >=
                                  0.0000001
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
                        <div class="details balance">
                          <span class="label">
                            <font color="white">TVL: </font>
                          </span>
                          <span class="value">
                            {" "}
                            <font color="white">
                              {this.state.tvl_gs_usdc} <i>$</i>
                            </font>
                          </span>
                        </div>
                        <div class="details total">
                          <span class="label">
                            <font color="white">Deposited: </font>
                          </span>

                          <span class="value">
                            <font color="white">
                              {" "}
                              {this.state.depo_clp_gs_usdc_amount}{" "}
                              <i>{gs_pair_1}</i>
                            </font>
                          </span>
                        </div>
                      </div>
                    </div>
                    <br></br>
                  </main>
                  {/* Operating BOX */}
                  <div
                    class="token-input"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* TODO: AQUI */}

                    <div class="token-input-wrapper" style={{ width: "55%" }}>
                      <input
                        class="token-input"
                        placeholder={
                          this.state.input_lp_gs_usdc == 0
                            ? "0.0"
                            : this.state.input_lp_gs_usdc
                        }
                        onChange={this.ChangeCLP_GS_USDC_Amount}
                      />
                      <span class="token-input-symbol no-select">
                        {gs_pair_1} CLP
                      </span>
                      <div
                        class="token-input-max clickable"
                        onClick={(e) => this.ChangeCLP_GS_USDC_Amount(e)}
                      >
                        MAX
                      </div>
                    </div>
                  </div>
                  <br />
                  {/* TODO: AQUI */}

                  <div class="card-content">
                    <div
                      class="farm-detail-control-action-wrapper"
                      style={{ height: "5px" }}
                    >
                      <div class="row">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.deposit_gs_usdc_clp(
                              this.state.input_lp_gs_usdc
                            )
                          }
                        >
                          <div class="content">
                            <font color="white">DEPOSIT</font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* EWT-PUG FARM */}
                  <div class="ewt_balance" align="left">
                    <span class="label">
                      <font color="purple">
                        <b>
                          WALLET <font color="white"></font> BALANCE:
                        </b>
                      </font>{" "}
                    </span>
                    <span class="value">
                      <font color="white">
                        {this.state.pug_ewt_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="section staked">
                    <div class="wrapper_important_pairs">
                      <main role="main" className="farm-list">
                        <div class="row">
                          <div class="farms-card-item clickable boost undefined">
                            <div class="icon">
                              <div
                                class="card-icon no-select"
                                style={{ height: "120px", width: "120px" }}
                              >
                                <img src={pugEwtt} alt="icon" />
                              </div>
                            </div>
                            <div></div>
                            <div
                              class="label"
                              style={{
                                alignItems: "center",
                              }}
                            >
                              <span>
                                <i>$</i>
                                <font color="white">{pair_0}</font>
                              </span>{" "}
                              <span>
                                <font color="white" size="1"></font>
                                <font color="800080" size="1">
                                  <i>PUG Father Choice</i>
                                </font>
                              </span>
                            </div>
                            <div class="rates">
                              <span class="apy">
                                {this.state.reward_pug_ewt_pdt_ammo == 0 ? (
                                  <font>
                                    {this.state.pug_ewt_apy}
                                    <i>
                                      <font size="+1">%</font>
                                    </i>
                                  </font>
                                ) : (
                                  <font>
                                    <font>
                                      <i>$</i>
                                      {this.state.reward_pug_ewt_pdt_ammo}
                                    </font>
                                  </font>
                                )}
                              </span>
                              <span class="apr">
                                {this.state.reward_pug_ewt_pdt_ammo == 0 ? (
                                  <font>
                                    <font size="+1">
                                      <i>APY</i>
                                    </font>
                                  </font>
                                ) : (
                                  "AMMO"
                                )}
                              </span>
                            </div>
                            {/* Withdraw PUG-EWT */}
                            <div class="details return" align="right">
                              <div
                                class="bunny-button clickable no-select"
                                onClick={(e) => this.withdraw_pug_ewt_clp(e)}
                              >
                                <div class="content">
                                  <font
                                    color={
                                      this.state.depo_clp_pug_ewt_amount >=
                                      0.0000001
                                        ? "white"
                                        : "gray"
                                    }
                                  >
                                    WITHDRAW
                                  </font>

                                  <font size="1">
                                    + <i>$</i>AMMO
                                  </font>
                                  <div class="subfont"></div>
                                </div>
                              </div>
                            </div>
                            <div class="details balance">
                              <span class="label">
                                <font color="white">TVL: </font>
                              </span>
                              <span class="value">
                                {" "}
                                <font color="white">
                                  {this.state.tvl_pug_ewt} <i>$</i>
                                </font>
                              </span>
                            </div>
                            <div class="details total">
                              <span class="label">
                                <font color="white">Deposited: </font>
                              </span>

                              <span class="value">
                                <font color="white">
                                  {" "}
                                  {this.state.depo_clp_pug_ewt_amount}{" "}
                                  <i>{pair_0}</i>
                                </font>
                              </span>
                            </div>
                          </div>
                        </div>
                        <br></br>
                      </main>

                      {/* Operating BOX */}
                      <div
                        class="token-input"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          class="token-input-wrapper"
                          style={{ width: "55%" }}
                        >
                          <input
                            class="token-input"
                            placeholder={
                              this.state.input_lp_pug_ewt == 0
                                ? "0.0"
                                : this.state.input_lp_pug_ewt
                            }
                            onChange={this.ChangeCLP_PUG_EWT_Amount}
                          />
                          <span class="token-input-symbol no-select">
                            {pair_0} CLP
                          </span>
                          {/* INPUT PUG-EWT */}
                          <div
                            class="token-input-max clickable"
                            onClick={(e) => this.ChangeCLP_PUG_EWT_Amount(e)}
                          >
                            MAX
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="farm-detail-control-action-wrapper"
                      style={{ height: "5px" }}
                    >
                      <div class="row">
                        {/* DEPOSIT PUG-EWT */}
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.deposit_pug_ewt_clp(
                              this.state.input_lp_pug_ewt
                            )
                          }
                        >
                          <div class="content">
                            <font color="white">DEPOSIT</font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PUG-SUSU FARM*/}
                    <main role="main" className="farm-list">
                      <div class="ewt_balance" align="left">
                        <span class="label">
                          <font color="purple">
                            <b>
                              WALLET <font color="white"></font> BALANCE:
                            </b>
                          </font>{" "}
                        </span>
                        <span class="value">
                          <font color="white">
                            {this.state.pug_susu_clp_wallet_balance}
                          </font>
                        </span>
                      </div>

                      <div class="row">
                        <div class="farms-card-item clickable boost undefined">
                          <div class="icon">
                            <div
                              class="card-icon no-select"
                              style={{ height: "120px", width: "120px" }}
                            >
                              <img src={pugSusu} alt="icon" />
                            </div>
                          </div>
                          <div></div>
                          <div class="label" align="right">
                            <span>
                              $<font color="white">{pair_1}</font>
                            </span>
                          </div>
                          <div class="rates">
                            <span class="apy">
                              {this.state.reward_pug_susu_pdt_ammo == 0 ? (
                                <font>
                                  {this.state.pug_susu_apy}
                                  <i>
                                    <font size="+1">%</font>
                                  </i>
                                </font>
                              ) : (
                                <font>
                                  <font>
                                    <i>$</i>
                                    {this.state.reward_pug_susu_pdt_ammo}
                                  </font>
                                </font>
                              )}
                            </span>
                            <span class="apr">
                              {this.state.reward_pug_susu_pdt_ammo == 0 ? (
                                <font>
                                  <font size="+1">
                                    <i>APY</i>
                                  </font>
                                </font>
                              ) : (
                                `$AMMO`
                              )}
                            </span>
                          </div>
                          <div class="details return" align="right">
                            {/* Withdraw PUG-SUSU */}
                            <div
                              class="bunny-button clickable no-select"
                              onClick={(e) => this.withdraw_pug_susu_clp(e)}
                            >
                              <div class="content">
                                <font
                                  color={
                                    this.state.depo_clp_pug_susu_amount >=
                                    0.0000001
                                      ? "white"
                                      : "gray"
                                  }
                                >
                                  WITHDRAW
                                </font>

                                <font size="1">
                                  + <i>$</i>AMMO
                                </font>
                                <div class="subfont"></div>
                              </div>
                            </div>
                          </div>
                          <div class="details balance">
                            <span class="label">
                              <font color="white">TVL: </font>
                            </span>
                            <span class="value">
                              {" "}
                              <font color="white">
                                {this.state.tvl_pug_susu} <i>$</i>
                              </font>
                            </span>
                          </div>
                          <div class="details total">
                            <span class="label">
                              <font color="white">Deposited: </font>
                            </span>

                            <span class="value">
                              <font color="white">
                                {" "}
                                {this.state.depo_clp_pug_susu_amount}{" "}
                                <i>{pair_1}</i>
                              </font>
                            </span>
                          </div>
                        </div>
                      </div>
                      <br></br>
                    </main>
                    {/* Operating BOX */}
                    <div
                      class="token-input"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div class="token-input-wrapper" style={{ width: "55%" }}>
                        <input
                          class="token-input"
                          placeholder={
                            this.state.input_lp_pug_susu == 0
                              ? "0.0"
                              : this.state.input_lp_pug_susu
                          }
                          onChange={this.ChangeCLP_PUG_SUSU_Amount}
                        />
                        <span class="token-input-symbol no-select">
                          {pair_1} CLP
                        </span>
                        {/* INPUT PUG-SUSU */}
                        <div
                          class="token-input-max clickable"
                          onClick={(e) => this.ChangeCLP_PUG_SUSU_Amount(e)}
                        >
                          MAX
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-content">
                    <div
                      class="farm-detail-control-action-wrapper"
                      style={{ height: "5px" }}
                    >
                      <div class="row">
                        {/* Deposit PUG-SUSU */}
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) =>
                            this.deposit_pug_susu_clp(
                              this.state.input_lp_pug_susu
                            )
                          }
                        >
                          <div class="content">
                            <font color="white">DEPOSIT</font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* PUG-AMMO FARM GS */}

                <main role="main" className="farm-list">
                  <div class="ewt_balance" align="left">
                    <span class="label">
                      <font color="640b76">
                        <b>
                          WALLET <font color="white"></font> BALANCE:
                        </b>
                      </font>{" "}
                    </span>
                    {/* TODO: AQUI */}
                    <span class="value">
                      <font color="white">
                        {this.state.pug_ammo_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="row">
                    <div class="farms-card-item clickable boost-new">
                      <div class="icon">
                        <div
                          class="card-icon no-select"
                          style={{
                            height: "120px",
                            width: "120px",
                          }}
                        >
                          <img src={pugAmmo} alt="icon" />
                        </div>
                      </div>
                      <div></div>
                      <div
                        class="label"
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <span>
                          <i>$</i>
                          <font color="white">{pair_6}</font>
                        </span>
                        <span>
                          <font color="fe1e70" size="1">
                            <i>New </i>
                          </font>
                          <font color="white" size="1">
                            <i>Farm </i>
                          </font>
                        </span>
                      </div>
                      <div class="rates">
                        <span class="apy">
                          {this.state.reward_pug_ammo_pdt_ammo == 0 ? (
                            <font>
                              {this.state.pug_ammo_apy}
                              <i>
                                <font size="+1">%</font>
                              </i>
                            </font>
                          ) : (
                            <font>
                              <font>
                                <i>$</i>
                                {this.state.reward_pug_ammo_pdt_ammo}
                              </font>
                            </font>
                          )}
                        </span>
                        <span class="apr">
                          {this.state.reward_pug_ammo_pdt_ammo == 0 ? (
                            <font>
                              <font size="+1">
                                <i>APY</i>
                              </font>
                            </font>
                          ) : (
                            `AMMO`
                          )}
                        </span>
                      </div>
                      <div class="details return" align="right">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) => this.withdraw_pug_ammo_clp(e)}
                        >
                          <div class="content">
                            <font
                              color={
                                this.state.depo_clp_pug_ammo_amount_precision >=
                                0.0000001
                                  ? "white"
                                  : "gray"
                              }
                            >
                              WITHDRAW
                            </font>

                            <font size="1">
                              + <i>$</i>AMMO
                            </font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                      <div class="details balance">
                        <span class="label">
                          <font color="white">TVL: </font>
                        </span>
                        <span class="value">
                          {" "}
                          <font color="white">
                            {this.state.tvl_pug_ammo} <i>$</i>
                          </font>
                        </span>
                      </div>
                      <div class="details total">
                        <span class="label">
                          <font color="white">Deposited: </font>
                        </span>

                        <span class="value">
                          <font color="white">
                            {" "}
                            {this.state.depo_clp_pug_ammo_amount}{" "}
                            <i>{pair_6}</i>
                          </font>
                        </span>
                      </div>
                    </div>
                  </div>
                  <br></br>
                </main>
                {/* Operating BOX */}
                <div
                  class="token-input"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* TODO: AQUI */}
                  <div class="token-input-wrapper" style={{ width: "75%" }}>
                    <input
                      class="token-input"
                      placeholder={
                        this.state.input_lp_pug_ammo == 0
                          ? "0.0"
                          : this.state.input_lp_pug_ammo
                      }
                      onChange={this.ChangeCLP_PUG_AMMO_Amount}
                    />
                    <span class="token-input-symbol no-select">
                      {pair_6} CLP
                    </span>
                    <div
                      class="token-input-max clickable"
                      onClick={(e) => this.ChangeCLP_PUG_AMMO_Amount(e)}
                    >
                      MAX
                    </div>
                  </div>
                </div>
                <br />
                {/* TODO: AQUI */}

                <div class="card-content">
                  <div
                    class="farm-detail-control-action-wrapper"
                    style={{ height: "5px" }}
                  >
                    <div class="row">
                      <div
                        class="bunny-button clickable no-select"
                        onClick={(e) =>
                          this.deposit_pug_ammo_clp(
                            this.state.input_lp_pug_ammo
                          )
                        }
                      >
                        <div class="content">
                          <font color="white">DEPOSIT</font>
                          <div class="subfont"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* SLR-PUG FARM GS */}

                <main role="main" className="farm-list">
                  <div class="ewt_balance" align="left">
                    <span class="label">
                      <font color="640b76">
                        <b>
                          WALLET <font color="white"></font> BALANCE:
                        </b>
                      </font>{" "}
                    </span>
                    {/* TODO: AQUI */}
                    <span class="value">
                      <font color="white">
                        {this.state.pug_slr_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="row">
                    <div class="farms-card-item clickable boost-new">
                      <div class="icon">
                        <div
                          class="card-icon no-select"
                          style={{
                            height: "120px",
                            width: "120px",
                          }}
                        >
                          <img src={slrPug} alt="icon" />
                        </div>
                      </div>
                      <div></div>
                      <div
                        class="label"
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <span>
                          <i>$</i>
                          <font color="white">{pair_5}</font>
                        </span>
                        <span>
                          <font color="fe1e70" size="1">
                            <i>New </i>
                          </font>
                          <font color="white" size="1">
                            <i>Farm </i>
                          </font>
                        </span>
                      </div>
                      <div class="rates">
                        <span class="apy">
                          {this.state.reward_pug_slr_pdt_ammo == 0 ? (
                            <font>
                              {this.state.pug_slr_apy}
                              <i>
                                <font size="+1">%</font>
                              </i>
                            </font>
                          ) : (
                            <font>
                              <font>
                                <i>$</i>
                                {this.state.reward_pug_slr_pdt_ammo}
                              </font>
                            </font>
                          )}
                        </span>
                        <span class="apr">
                          {this.state.reward_pug_slr_pdt_ammo == 0 ? (
                            <font>
                              <font size="+1">
                                <i>APY</i>
                              </font>
                            </font>
                          ) : (
                            `AMMO`
                          )}
                        </span>
                      </div>
                      <div class="details return" align="right">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) => this.withdraw_pug_slr_clp(e)}
                        >
                          <div class="content">
                            <font
                              color={
                                this.state.depo_clp_pug_slr_amount >= 0.0000001
                                  ? "white"
                                  : "gray"
                              }
                            >
                              WITHDRAW
                            </font>

                            <font size="1">
                              + <i>$</i>AMMO
                            </font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                      <div class="details balance">
                        <span class="label">
                          <font color="white">TVL: </font>
                        </span>
                        <span class="value">
                          {" "}
                          <font color="white">
                            {this.state.tvl_pug_slr} <i>$</i>
                          </font>
                        </span>
                      </div>
                      <div class="details total">
                        <span class="label">
                          <font color="white">Deposited: </font>
                        </span>

                        <span class="value">
                          <font color="white">
                            {" "}
                            {this.state.depo_clp_pug_slr_amount} <i>{pair_5}</i>
                          </font>
                        </span>
                      </div>
                    </div>
                  </div>
                  <br></br>
                </main>
                {/* Operating BOX */}
                <div
                  class="token-input"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* TODO: AQUI */}
                  <div class="token-input-wrapper" style={{ width: "75%" }}>
                    <input
                      class="token-input"
                      placeholder={
                        this.state.input_lp_pug_slr == 0
                          ? "0.0"
                          : this.state.input_lp_pug_slr
                      }
                      onChange={this.ChangeCLP_PUG_SLR_Amount}
                    />
                    <span class="token-input-symbol no-select">
                      {pair_5} CLP
                    </span>
                    <div
                      class="token-input-max clickable"
                      onClick={(e) => this.ChangeCLP_PUG_SLR_Amount(e)}
                    >
                      MAX
                    </div>
                  </div>
                </div>
                <br />
                {/* TODO: AQUI */}

                <div class="card-content">
                  <div
                    class="farm-detail-control-action-wrapper"
                    style={{ height: "5px" }}
                  >
                    <div class="row">
                      <div
                        class="bunny-button clickable no-select"
                        onClick={(e) =>
                          this.deposit_pug_slr_clp(this.state.input_lp_pug_slr)
                        }
                      >
                        <div class="content">
                          <font color="white">DEPOSIT</font>
                          <div class="subfont"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AMMO-USDC FARM GS */}

                <main role="main" className="farm-list">
                  <div class="ewt_balance" align="left">
                    <span class="label">
                      <font color="ec6998">
                        <b>
                          WALLET <font color="white"></font> BALANCE:
                        </b>
                      </font>{" "}
                    </span>
                    {/* TODO: AQUI */}
                    <span class="value">
                      <font color="white">
                        {this.state.ammo_usdc_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="row">
                    <div class="farms-card-item clickable boost-subimp">
                      <div class="icon">
                        <div
                          class="card-icon no-select"
                          style={{
                            height: "120px",
                            width: "120px",
                          }}
                        >
                          <img src={ammoUsdc} alt="icon" />
                        </div>
                      </div>
                      <div></div>
                      <div
                        class="label"
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <span>
                          <i>$</i>
                          <font color="white">{gs_pair_0}</font>
                        </span>{" "}
                        <span>
                          <font color="white" size="1">
                            G
                          </font>
                          <font color="fe1e70" size="1">
                            <i>$wap Booster</i>
                          </font>
                        </span>
                      </div>
                      <div class="rates">
                        <span class="apy">
                          {/* TODO: REMOVE THIS AND UNCOMMENT OTHER */}

                          {/* TODO: AQUI */}

                          {this.state.reward_ammo_usdc_pdt_gs_precision <
                          0.000001 ? (
                            <font>
                              {this.state.ammo_usdc_supply_apy}
                              <i>
                                <font size="+1">%</font>
                              </i>
                            </font>
                          ) : (
                            <font>
                              <font>{this.state.reward_ammo_usdc_pdt_gs}</font>{" "}
                              G
                              <i>
                                <font size="+1">$</font>
                              </i>
                            </font>
                          )}
                        </span>
                        {this.state.reward_ammo_usdc_pdt_gs_precision <=
                        0.000001 ? (
                          <span class="apr">
                            <font>
                              <font size="+1">
                                <i>APY</i>
                              </font>
                            </font>
                            {/* {this.state.reward_ammo_usdc_pdt_gs == 0 ? (
                              <font>
                                <font size="+1">
                                  <i>APY</i>
                                </font>
                              </font>
                            ) : (
                              ""
                            )} */}
                          </span>
                        ) : (
                          <span class="apr"></span>
                        )}
                      </div>
                      <div class="details return" align="right">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) => this.withdraw_ammo_usdc_clp(e)}
                        >
                          <div class="content">
                            <font
                              color={
                                this.state.depo_clp_ammo_usdc_amount >=
                                0.0000001
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
                      <div class="details balance">
                        <span class="label">
                          <font color="white">TVL: </font>
                        </span>
                        <span class="value">
                          {" "}
                          <font color="white">
                            {this.state.tvl_ammo_usdc} <i>$</i>
                          </font>
                        </span>
                      </div>
                      <div class="details total">
                        <span class="label">
                          <font color="white">Deposited: </font>
                        </span>

                        <span class="value">
                          <font color="white">
                            {" "}
                            {this.state.depo_clp_ammo_usdc_amount}{" "}
                            <i>{gs_pair_0}</i>
                          </font>
                        </span>
                      </div>
                    </div>
                  </div>
                  <br></br>
                </main>
                {/* Operating BOX */}
                <div
                  class="token-input"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* TODO: AQUI */}
                  <div class="token-input-wrapper" style={{ width: "75%" }}>
                    <input
                      class="token-input"
                      placeholder={
                        this.state.input_lp_ammo_usdc == 0
                          ? "0.0"
                          : this.state.input_lp_ammo_usdc
                      }
                      onChange={this.ChangeCLP_AMMO_USDC_Amount}
                    />
                    <span class="token-input-symbol no-select">
                      {gs_pair_0} CLP
                    </span>
                    <div
                      class="token-input-max clickable"
                      onClick={(e) => this.ChangeCLP_AMMO_USDC_Amount(e)}
                    >
                      MAX
                    </div>
                  </div>
                </div>
                <br />
                {/* TODO: AQUI */}

                <div class="card-content">
                  <div
                    class="farm-detail-control-action-wrapper"
                    style={{ height: "5px" }}
                  >
                    <div class="row">
                      <div
                        class="bunny-button clickable no-select"
                        onClick={(e) =>
                          this.deposit_ammo_usdc_clp(
                            this.state.input_lp_ammo_usdc
                          )
                        }
                      >
                        <div class="content">
                          <font color="white">DEPOSIT</font>
                          <div class="subfont"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* USDC-PUG FARM */}

                <main role="main" className="farm-list">
                  <div class="ewt_balance" align="left">
                    <span class="label">
                      <font color="ec6998">
                        <b>
                          WALLET <font color="white"></font> BALANCE:
                        </b>
                      </font>{" "}
                    </span>
                    <span class="value">
                      <font color="white">
                        {this.state.pug_usdc_clp_wallet_balance}
                      </font>
                    </span>
                  </div>

                  <div class="row">
                    <div class="farms-card-item">
                      <div class="icon">
                        <div
                          class="card-icon no-select"
                          style={{ height: "120px", width: "120px" }}
                        >
                          <img src={pugUsdc} alt="icon" />
                        </div>
                      </div>
                      <div></div>
                      <div class="label" align="right">
                        <span>
                          $<font color="white">{pair_3}</font>
                        </span>{" "}
                      </div>
                      <div class="rates">
                        <span class="apy">
                          {this.state.reward_pug_usdc_pdt_ammo == 0 ? (
                            <font>
                              {this.state.pug_usdc_apy}
                              <i>
                                <font size="+1">%</font>
                              </i>
                            </font>
                          ) : (
                            <font>
                              <font>
                                <i>$</i>
                                {this.state.reward_pug_usdc_pdt_ammo}
                              </font>
                            </font>
                          )}
                        </span>
                        <span class="apr">
                          {this.state.reward_pug_usdc_pdt_ammo == 0 ? (
                            <font>
                              <font size="+1">
                                <i>APY</i>
                              </font>
                            </font>
                          ) : (
                            `AMMO`
                          )}
                        </span>
                      </div>
                      <div class="details return" align="right">
                        <div
                          class="bunny-button clickable no-select"
                          onClick={(e) => this.withdraw_pug_usdc_clp(e)}
                        >
                          <div class="content">
                            <font
                              color={
                                this.state.depo_clp_pug_usdc_amount >= 0.0000001
                                  ? "white"
                                  : "gray"
                              }
                            >
                              WITHDRAW
                            </font>

                            <font size="1">
                              + <i>$</i>AMMO
                            </font>
                            <div class="subfont"></div>
                          </div>
                        </div>
                      </div>
                      <div class="details balance">
                        <span class="label">
                          <font color="white">TVL: </font>
                        </span>
                        <span class="value">
                          {" "}
                          <font color="white">
                            {this.state.tvl_pug_usdc} <i>$</i>
                          </font>
                        </span>
                      </div>
                      <div class="details total">
                        <span class="label">
                          <font color="white">Deposited: </font>
                        </span>

                        <span class="value">
                          <font color="white">
                            {" "}
                            {this.state.depo_clp_pug_usdc_amount}{" "}
                            <i>{pair_3}</i>
                          </font>
                        </span>
                      </div>
                    </div>
                  </div>
                  <br></br>
                </main>
                {/* Operating BOX */}
                <div
                  class="token-input"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div class="token-input-wrapper" style={{ width: "75%" }}>
                    <input
                      class="token-input"
                      placeholder={
                        this.state.input_lp_pug_usdc == 0
                          ? "0.0"
                          : this.state.input_lp_pug_usdc
                      }
                      onChange={this.ChangeCLP_PUG_USDC_Amount}
                    />
                    <span class="token-input-symbol no-select">
                      {pair_3} CLP
                    </span>
                    <div
                      class="token-input-max clickable"
                      onClick={(e) => this.ChangeCLP_PUG_USDC_Amount(e)}
                    >
                      MAX
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-content">
                <div
                  class="farm-detail-control-action-wrapper"
                  align="center"
                  style={{ height: "5px" }}
                >
                  <div class="row">
                    <div
                      class="bunny-button clickable no-select"
                      onClick={(e) =>
                        this.deposit_pug_usdc_clp(this.state.input_lp_pug_usdc)
                      }
                    >
                      <div class="content" align="center">
                        <font color="white">DEPOSIT</font>
                        <div class="subfont"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WBNB-PUG FARM */}

            <main role="main" className="farm-list">
              <div class="ewt_balance" align="left">
                <span class="label">
                  <font color="ec6998">
                    <b>
                      WALLET <font color="white"></font> BALANCE:
                    </b>
                  </font>{" "}
                </span>
                <span class="value">
                  <font color="white">
                    {this.state.pug_bnb_clp_wallet_balance}
                  </font>
                </span>
              </div>

              <div class="row">
                <div class="farms-card-item">
                  <div class="icon">
                    <div
                      class="card-icon no-select"
                      style={{ height: "120px", width: "120px" }}
                    >
                      <img src={pugBnb} alt="icon" />
                    </div>
                  </div>
                  <div></div>
                  <div class="label" align="right">
                    <span>
                      $<font color="white">{pair_4}</font>
                    </span>{" "}
                  </div>
                  <div class="rates">
                    <span class="apy">
                      {this.state.reward_pug_bnb_pdt_ammo == 0 ? (
                        <font>
                          {this.state.pug_bnb_apy}
                          <i>
                            <font size="+1">%</font>
                          </i>
                        </font>
                      ) : (
                        <font>
                          <font>
                            <i>$</i>
                            {this.state.reward_pug_bnb_pdt_ammo}
                          </font>
                        </font>
                      )}
                    </span>
                    <span class="apr">
                      {this.state.reward_pug_bnb_pdt_ammo == 0 ? (
                        <font>
                          <font size="+1">
                            <i>APY</i>
                          </font>
                        </font>
                      ) : (
                        `$AMMO`
                      )}
                    </span>
                  </div>
                  <div class="details return" align="right">
                    <div
                      class="bunny-button clickable no-select"
                      onClick={(e) => this.withdraw_pug_bnb_clp(e)}
                    >
                      <div class="content">
                        <font
                          color={
                            this.state.depo_clp_pug_bnb_amount >= 0.0000001
                              ? "white"
                              : "gray"
                          }
                        >
                          WITHDRAW
                        </font>

                        <font size="1">
                          + <i>$</i>AMMO
                        </font>
                        <div class="subfont"></div>
                      </div>
                    </div>
                  </div>
                  <div class="details balance">
                    <span class="label">
                      <font color="white">TVL: </font>
                    </span>
                    <span class="value">
                      {" "}
                      <font color="white">
                        {this.state.tvl_pug_bnb} <i>$</i>
                      </font>
                    </span>
                  </div>
                  <div class="details total">
                    <span class="label">
                      <font color="white">Deposited: </font>
                    </span>

                    <span class="value">
                      <font color="white">
                        {" "}
                        {this.state.depo_clp_pug_bnb_amount} <i>{pair_4}</i>
                      </font>
                    </span>
                  </div>
                </div>
              </div>
              <br></br>
            </main>
            {/* Operating BOX */}
            <div
              class="token-input"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div class="token-input-wrapper" style={{ width: "75%" }}>
                <input
                  class="token-input"
                  placeholder={
                    this.state.input_lp_pug_bnb == 0
                      ? "0.0"
                      : this.state.input_lp_pug_bnb
                  }
                  onChange={this.ChangeCLP_PUG_BNB_Amount}
                />
                <span class="token-input-symbol no-select">{pair_4} CLP</span>
                <div
                  class="token-input-max clickable"
                  onClick={(e) => this.ChangeCLP_PUG_BNB_Amount(e)}
                >
                  MAX
                </div>
              </div>
            </div>

            <div class="card-content">
              <div
                class="farm-detail-control-action-wrapper"
                align="center"
                style={{ height: "5px" }}
              >
                <div class="row">
                  <div
                    class="bunny-button clickable no-select"
                    onClick={(e) =>
                      this.deposit_pug_bnb_clp(this.state.input_lp_pug_bnb)
                    }
                  >
                    <div class="content" align="center">
                      <font color="white">DEPOSIT</font>
                      <div class="subfont"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EXTRA COMMENT END */}
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
                <div
                  class="pot-item empty"
                  style={{ width: "90%", height: "70%" }}
                >
                  <img src={gngLotto} alt="cooking" />
                  <font color="grey">
                    <span>More Coming Soon</span>
                  </font>
                  <font color="grey">
                    <span>If you want to add a New Pair,</span>
                    <span>
                      <font color="fe1e70"> Contact G$wap Devs</font>
                    </span>
                  </font>
                </div>
              </div>
            </div>
            <br></br>
            {/* WBNB-PUG FARM */}

            {/* <main role="main" className="farm-list">
              <div class="ewt_balance" align="left">
                <span class="label">
                  <font color="ec6998">
                    <b>
                      WALLET <font color="white"></font> BALANCE:
                    </b>
                  </font>{" "}
                </span>
                <span class="value">
                  <font color="white">
                    {this.state.pug_susu_clp_wallet_balance}
                  </font>
                </span>
              </div>

              <div class="row">
                <div class="farms-card-item">
                  <div class="icon">
                    <div
                      class="card-icon no-select"
                      style={{ height: "120px", width: "120px" }}
                    >
                      <img src={ammoPug} alt="icon" />
                    </div>
                  </div>
                  <div></div>
                  <div class="label" align="right">
                    <span>
                      $<font color="white">{pair_5}</font>
                    </span>
                  </div>
                  <div class="rates">
                    <span class="apy">
                      {this.state.reward_pug_susu_pdt_ammo == 0
                        ? "$AMMO"
                        : `$${this.state.reward_pug_susu_pdt_ammo}`}
                    </span>
                    <span class="description">
                      {this.state.reward_pug_susu_pdt_ammo == 0 ? "Earn" : `$AMMO`}
                    </span>
                  </div>
                  <div class="details return" align="right">
                    <div
                      class="bunny-button clickable no-select"
                      onClick={(e) => this.withdraw_pug_susu_clp(e)}
                    >
                      <div class="content">
                        <font
                          color={
                            this.state.depo_clp_ammo_usdc_amount != 0
                              ? "white"
                              : "gray"
                          }
                        >
                          WITHDRAW
                        </font>
                        <div class="subfont"></div>
                      </div>
                    </div>
                  </div>
                  <div class="details total" align="right">
                    <span class="label">Deposited:</span>
                    <span class="value">
                      {this.state.depo_clp_ammo_usdc_amount} {pair_5}
                    </span>
                  </div>
                </div>
              </div>
              <br></br>
            </main> */}
            {/* Operating BOX */}
            {/* <div
              class="token-input"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div class="token-input-wrapper" style={{ width: "75%" }}>
                <input
                  class="token-input"
                  placeholder={
                    this.state.input_lp_pug_susu == 0
                      ? "0.0"
                      : this.state.input_lp_pug_susu
                  }
                  onChange={this.ChangeCLP_PUG_SUSU_Amount}
                />
                <span class="token-input-symbol no-select">{pair_5} CLP</span>
                <div
                  class="token-input-max clickable"
                  onClick={(e) => this.ChangeCLP_PUG_SUSU_Amount(e)}
                >
                  MAX
                </div>
              </div>
            </div>

            <div class="card-content">
              <div
                class="farm-detail-control-action-wrapper"
                align="center"
                style={{ height: "5px" }}
              >
                <div class="row">
                  <div
                    class="bunny-button clickable no-select"
                    onClick={(e) =>
                      this.deposit_pug_susu_clp(this.state.input_lp_pug_susu)
                    }
                  >
                    <div class="content" align="center">
                      <font color="white">DEPOSIT</font>
                      <div class="subfont"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <br></br>

            <br></br>

            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
