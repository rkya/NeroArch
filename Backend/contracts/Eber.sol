pragma solidity ^0.4.0;

/*
Simple escrow contract that mediates disputes using a trusted arbiter
*/
contract Eber {

    enum State {IDLE, FINDING_DRIVER, DRIVER_ASSIGNED, AWAITING_DESTINATION, COMPLETE}
    State public currentState;
    mapping (address => uint) public balances;

    modifier customerOnly() { require(msg.sender == customer); _; }
    modifier driverOnly() { require(msg.sender == driver); _; }
    modifier arbiterOnly() { require(msg.sender == arbiter); _; }
    modifier inState(State expectedState) { require(currentState == expectedState); _; }

    address public customer;
    address public driver;
    address public arbiter;

    function Eber(address _customer, address _driver, address _arbiter) public {
        customer = _customer;
        driver = _driver;
        arbiter = _arbiter;
    }

    function bookCab(uint amount) customerOnly inState(State.IDLE) public returns(bool) {
        if(balances[customer] < amount) {
            return false;
        }
        currentState = State.FINDING_DRIVER;
        balances[arbiter] += amount;
        balances[customer] -= amount;
        return true;
    }

    function assignDriver() arbiterOnly inState(State.FINDING_DRIVER) public {
        currentState = State.DRIVER_ASSIGNED;
    }

    function startRide() driverOnly inState(State.DRIVER_ASSIGNED) public {
        currentState = State.AWAITING_DESTINATION;
    }

    function completeTransaction() arbiterOnly inState(State.AWAITING_DESTINATION) public returns (bool) {
        balances[driver] += balances[arbiter];
        balances[arbiter] = 0;
        currentState = State.COMPLETE;
        return true;
    }

    function cancelRideByCustomer() customerOnly inState(State.FINDING_DRIVER) inState(State.DRIVER_ASSIGNED) public {
        currentState = State.IDLE;
        balances[customer] += balances[arbiter];
        balances[arbiter] = 0;
    }

    function cancelRideByDriver() driverOnly inState(State.DRIVER_ASSIGNED) public{
        currentState = State.IDLE;
        balances[customer] += balances[arbiter];
        balances[arbiter] = 0;
    }

    function addBalance(uint amount, address entity) public {
        balances[entity] += amount;
    }

    function setCustomer(address c) public {
        customer = c;
    }

    function setDriver(address d) public {
        driver = d;
    }

    function setArbiter(address a) public {
        arbiter = a;
    }

    function resetState() public {
        currentState = State.IDLE;
    }
}
