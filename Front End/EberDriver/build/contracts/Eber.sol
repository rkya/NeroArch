pragma solidity ^0.4.0;

/*
Simple escrow contract that mediates disputes using a trusted arbiter
*/
contract Eber {

    enum State {IDLE, FINDING_DRIVER, AWAITING_PAYMENT, AWAITING_DESTINATION, COMPLETE}
    State public currentState;
    mapping (address => uint) public balances;
    bytes32 STRING_COMPLETE = "Complete";
    bytes32 STRING_PARTIAL = "Partial";

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

    function assignDriver() customerOnly inState(State.IDLE) public {
        //arbiter.transfer(this.balance);
        currentState = State.FINDING_DRIVER;
    }

    function confirmAmount(uint amount) driverOnly inState(State.FINDING_DRIVER) public returns (bool ) {
        //driver has set this amount and user has accepted this fare, return true if customer has sufficient balance
        if(balances[customer] < amount) {
            return false;
        }
        currentState = State.AWAITING_DESTINATION;
        balances[arbiter] += amount;
        balances[customer] -= amount;
        return true;
    }

    function destinationReached(bytes32 journey) arbiterOnly inState(State.AWAITING_DESTINATION) public returns (bool) {
        if(stringsEqual(journey, STRING_COMPLETE)) {
            balances[driver] += balances[arbiter];
            balances[arbiter] = 0;
        } else if (stringsEqual(journey, STRING_PARTIAL)) {
            balances[driver] += balances[arbiter] / 2;
            balances[customer] += balances[arbiter] / 2;
            balances[arbiter] = 0;
        } else {
            return false;
        }
        currentState = State.COMPLETE;
        return true;
    }

    function addBalance(uint amount, address entity) public {
        balances[entity] += amount;
    }

    function stringsEqual(bytes32 a, bytes32 b) internal pure returns (bool) {
        if (a.length != b.length) {
            return false;
        }

        for (uint i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
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

    /*function setCustomer(address c) public {
        customer = c;
    }

    function setDriver(address d) public {
        driver = d;
    }

    function setArbiter(address a) public {
        arbiter = a;
    }*/

    /*function create(address receiver, uint amount) public {
        if(receiver != driver && receiver != customer) {
            return;
        }
        balances[receiver] += amount;
    }*/

    /*function refundBuyer() arbiterOnly inState(State.AWAITING_DESTINATION) payable public {
        customer.transfer(this.balance);
        currentState = State.AWAITING_PAYMENT;
    }*/
}
