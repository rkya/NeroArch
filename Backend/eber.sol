pragma solidity ^0.4.0;

/*
Simple escrow contract that mediates disputes using a trusted arbiter
*/
contract Eber {
    
    enum State {AWAITING_PAYMENT, AWAITING_DESTINATION, COMPLETE, REFUNDED}
    State public currentState;
    mapping (address => uint) public balances;

    
    modifier customerOnly() { require(msg.sender == customer); _; }
    modifier arbiterOnly() { require(msg.sender == arbiter); _; }
    modifier driverOnly() { require(msg.sender == driver || msg.sender == arbiter); _; }
    modifier inState(State expectedState) { require(currentState == expectedState); _; }
    
    address public customer;
    address public driver;
    address public arbiter;
    uint fare;
    
    function setCustomer(address _customer, uint amount)public{
        customer= _customer;
        balances[customer]+=amount;
    }
    
    function Eber(address _customer, address _driver, address _arbiter) public{
        customer = _customer;
        driver = _driver;
        arbiter = _arbiter;
    }
    
    function confirmPayment(uint amount) customerOnly inState(State.AWAITING_PAYMENT) public{
        if (balances[customer]< amount) return;
        fare=amount;
        balances[arbiter]+=amount;
        balances[customer]-=amount;
        currentState = State.AWAITING_DESTINATION;
        
    }
    
    function reachedDesti() arbiterOnly inState(State.AWAITING_DESTINATION) public payable{
        balances[arbiter]-=fare;
        balances[driver]+=fare;
        currentState = State.COMPLETE;
    }
    
    function refundBuyer() driverOnly inState(State.AWAITING_DESTINATION) public payable{
        balances[arbiter]-=fare;
        balances[customer]+=fare;
        currentState = State.REFUNDED;
    }
    
    
}