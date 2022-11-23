pragma solidity ^0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GLotto is Ownable {
    using SafeMath for uint256;

    mapping(address => uint256) public winnings;
    address[] public tickets;

    string public tokenName = "gLottery";
    string public tokenSymbol = "gLOT";
    uint256 public maxTickets = 100;
    uint256 public remaingTickets = 0;
    uint256 public ticketCount = 0;
    uint256 public randomNum = 0;
    address public latestWinner;
    address payable public gSwapFeeAddress;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _maximumTickets,
        address payable _gSwapFeeAddress
    ) public {
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        maxTickets = _maximumTickets;
        remaingTickets = maxTickets;
        gSwapFeeAddress = _gSwapFeeAddress;
    }

    function buy() public payable {
        require(msg.value == 1000000000000000000); //! 1 ETH
        uint256 val = msg.value / 1000000000000000000;

        require(remaingTickets - val < remaingTickets);
        remaingTickets -= val;

        tickets.push(msg.sender);
        ticketCount++;
    }

    function withdraw() public {
        require(winnings[msg.sender] > 0);

        uint256 amountToWithdraw = winnings[msg.sender];

        amountToWithdraw *= 1000000000000000000;
        uint256 gSwapFee = (amountToWithdraw * 2) / 10;
        amountToWithdraw = amountToWithdraw - gSwapFee;

        gSwapFeeAddress.transfer(gSwapFee);
        msg.sender.transfer(amountToWithdraw);
        winnings[msg.sender] = 0;
    }

    function withdrawOwner(address winnerAddress) public onlyOwner {
        require(winnings[winnerAddress] > 0);

        uint256 amountToWithdraw = winnings[winnerAddress];

        amountToWithdraw *= 1000000000000000000;
        uint256 gSwapFee = (amountToWithdraw * 2) / 10;
        amountToWithdraw = amountToWithdraw - gSwapFee;

        gSwapFeeAddress.transfer(gSwapFee);
        //Only the Owner can transfer the PRIZE (only in emergency situations)
        msg.sender.transfer(amountToWithdraw);
        winnings[winnerAddress] = 0;
    }

    function chooseWinner() public onlyOwner {
        require(ticketCount > 0);
        randomNum = uint256(blockhash(block.number - 1)) % ticketCount;

        latestWinner = tickets[randomNum];

        winnings[latestWinner] = ticketCount;
        ticketCount = 0;
        remaingTickets = maxTickets;

        delete tickets;
    }

    function ticketsLength() external view returns (uint256) {
        return tickets.length;
    }
}
