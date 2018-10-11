pragma solidity ^0.4.0;

/*
Simple escrow contract that mediates disputes using a trusted arbiter
*/
contract Eber_v2 {

    enum State {IDLE, FINDING_DRIVER, DRIVER_ASSIGNED, AWAITING_DESTINATION, COMPLETE}
    mapping(address => uint) public balances;
    mapping(address => bool) public customer;
    mapping(address => bool) public driver;
    modifier customerOnly() {require(customer[msg.sender]);
        _;}
    modifier driverOnly() {require(driver[msg.sender]);
        _;}
    modifier arbiterOnly() {require(msg.sender == arbiter);
        _;}
    modifier inState(Transac t, State expectedState) {require(t.currentState == expectedState);
        _;}
    mapping(int64 => Transac) public transactions;
    address public arbiter;
    int64 public rideIdentifier = 1;

    struct Transac {
        bool initialized;
        address customer;
        address driver;
        uint amount;
        State currentState;
    }

    function Eber_v2(address _customer, address _driver, address _arbiter) public {
        customer[_customer] = true;
        driver[_driver] = true;
        arbiter = _arbiter;
    }

    function addCustomer(address _customer) public {
        customer[_customer] = true;
    }

    function addDriver(address _driver) public {
        driver[_driver] = true;
    }

    event ridebooked(address _customer, int64 id);

    function bookCab(uint amount) customerOnly public returns (int64) {

        Transac storage t = transactions[rideIdentifier++];

        if (balances[msg.sender] < amount) {
            return - 1;
        }

        if (!t.initialized) {
            t.initialized = true;
            t.customer = msg.sender;
            t.currentState = State.FINDING_DRIVER;
            t.amount = amount;
        }

        balances[arbiter] += amount;
        balances[t.customer] -= amount;

        emit ridebooked(msg.sender, rideIdentifier);

        return rideIdentifier;
    }


    function assignDriver(int64 id, address _driver) arbiterOnly inState(transactions[id], State.FINDING_DRIVER) public {
        Transac storage t = transactions[id];

        if (t.initialized)
        {
            t.driver = _driver;
            t.currentState = State.DRIVER_ASSIGNED;
        }
    }

    function startRide(int64 id) driverOnly inState(transactions[id], State.DRIVER_ASSIGNED) public {
        transactions[id].currentState = State.AWAITING_DESTINATION;
    }

    function completeTransaction(int64 id) arbiterOnly inState(transactions[id], State.AWAITING_DESTINATION) public returns (bool) {
        Transac storage t = transactions[id];
        balances[t.driver] += t.amount;
        balances[arbiter] -= t.amount;

        t.currentState = State.COMPLETE;
        delete transactions[id];

        return true;
    }

    function cancelRideByCustomer(int64 id) customerOnly inState(transactions[id], State.FINDING_DRIVER) inState(transactions[id], State.DRIVER_ASSIGNED) public {
        Transac storage t = transactions[id];

        t.currentState = State.IDLE;
        balances[t.customer] += t.amount;
        balances[arbiter] -= t.amount;

        delete transactions[id];
    }

    function cancelRideByDriver(int64 id) driverOnly inState(transactions[id], State.DRIVER_ASSIGNED) public {
        Transac storage t = transactions[id];

        t.currentState = State.IDLE;
        balances[t.customer] += t.amount;
        balances[arbiter] -= t.amount;

        delete transactions[id];
    }

    function addBalance(uint amount, address entity) public {
        balances[entity] += amount;
    }

    function setArbiter(address arbiterAddress) public {
        arbiter = arbiterAddress;
    }
}
