import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props){

super (props);

		const MyContract = window.web3.eth.contract([
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "name": "entity",
                        "type": "address"
                    }
                ],
                "name": "addBalance",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "assignDriver",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "bookCab",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "cancelRideByCustomer",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "cancelRideByDriver",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "completeTransaction",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "resetState",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "a",
                        "type": "address"
                    }
                ],
                "name": "setArbiter",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "c",
                        "type": "address"
                    }
                ],
                "name": "setCustomer",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "d",
                        "type": "address"
                    }
                ],
                "name": "setDriver",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "startRide",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_customer",
                        "type": "address"
                    },
                    {
                        "name": "_driver",
                        "type": "address"
                    },
                    {
                        "name": "_arbiter",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "arbiter",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balances",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "currentState",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "customer",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "driver",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]);
        window.web3.eth.defaultAccount = window.web3.eth.accounts[0];
		this.state={
			ContractInstance: MyContract.at('0x56c56502fb6508d7fed7e5d1aaffdb7daf7c89a6'),
			contractState:'',
			contractaddress:{},
			customerAddress:'',
			driverAddress:'',
			arbiterAddress:'',
			Address:'',
			Amount:'',
            List:[ ],
			
		}
		//const {balances} = this.state.ContractInstance
        //console.log(balances.call(balances(0xdcb803f942945629080b5464cfa368142f1bd089)));

		//this.querySecret =this.querySecret.bind(this);
		//this.queryContractState = this.queryContractState.bind(this);
		//this.handleContractStateSubmit=this.handleContractStateSubmit.bind(this);

		this.getDriver=this.getDriver.bind(this);
		this.getCustomer=this.getCustomer.bind(this);
		this.getArbiter=this.getArbiter.bind(this);
		this.getCurrentState=this.getCurrentState.bind(this);
		this.handlegetBalance=this.handlegetBalance.bind(this);
		this.handlesetCustomer=this.handlesetCustomer.bind(this);
		this.handlesetDriver=this.handlesetDriver.bind(this);
		this.handlesetArbiter=this.handlesetArbiter.bind(this);
        this.handlebookRide=this.handlebookRide.bind(this);
        this.handleaddbalance=this.handleaddbalance.bind(this);
        this.queryassignDriver=this.queryassignDriver.bind(this);
        this.queryStartRide=this.queryStartRide.bind(this);
        this.queryCompleteTransaction=this.queryCompleteTransaction.bind(this);
        this.cancelRideByDriver=this.cancelRideByDriver.bind(this);
        this.cancelRideByCustomer=this.cancelRideByCustomer.bind(this);
        this.resetState=this.resetState.bind(this);




    }


	/*querySecret(){
		const{getSecret} = this.state.ContractInstance;
		getSecret((err,secret)=> {
			if(err) console.error('An error occured::::',err);
			console.log('This is out contract\'s secret::::',secret);
		})
	}

	queryContractState(){
		const {getState} = this.state.ContractInstance;
		getState((err,state)=>{
			if (err) console.error('An error occured::::',err);
			console.log("This is the new state ::::",state);
		})
	}


	handleContractStateSubmit(event){
		event.preventDefault();
		const{setState}=this.state.ContractInstance;
		const {contractState: newState} =this.state;

		setState(
			newState,
			{gas:300000,
			 from:window.web3.eth.accounts[0],
			 value:window.web3.toWei(0.01,'ether')},
			(err,result)=>{
					console.log('Smart Contract state is changing');
				}
		)
	}
		*/

		handlegetBalance(event){
			event.preventDefault();

			const{Address: address} =this.state;
            const{balances} =this.state.ContractInstance;
			console.log("Address",address);

            balances(address,
				(err,amount)=> {
				if (err) console.error('An error occured::::',err);
				console.log("This is the balance ::::",amount);
			})
		}


		handlesetCustomer(event){

			event.preventDefault();
			const{setCustomer}=this.state.ContractInstance;
			const {customerAddress: address} =this.state;
			console.log("Address:",address);
			setCustomer(
				address,
				{gas:300000,
				 from:window.web3.eth.accounts[0],
				 value:window.web3.toWei(0.01,'ether')},
				(err,result)=>{
                    if (err) console.error('An error occured::::',err);
                    console.log('Customer has been set ,transaction id:::',result);
					}
			)

		}

		handlesetDriver(event){

			event.preventDefault();
			const{setDriver}=this.state.ContractInstance;
			const {driverAddress: address} =this.state;

			setDriver(
				address,
				{gas:300000,
				 from:window.web3.eth.accounts[0],
				 value:window.web3.toWei(0.01,'ether')},
				(err,result) => {
                    	if (err) console.error('An error occured::::',err);
						console.log('Driver has been set ,transaction id:::',result);
					}
			)

		}

		handlebookRide(event){

			event.preventDefault();
			const{bookCab}=this.state.ContractInstance;
			const {Amount: amount} =this.state;
			console.log("Amount:",amount);
			bookCab(
				amount,
				{gas:300000,
					from:window.web3.eth.accounts[0],
					value:window.web3.toWei(0.01,'ether')},
				(err,result)=>{
					if (err) console.error('An error occured::::',err);
					console.log('Cab booked ,transaction id:::',result);
				}
			)

		}

		handlesetArbiter(event){

			event.preventDefault();
			const{setArbiter}=this.state.ContractInstance;
			const {arbiterAddress: address} =this.state;
            console.log("Address:",address);
			setArbiter(
				address,
				{gas:300000,
				 from:window.web3.eth.accounts[0],
				 value:window.web3.toWei(0.01,'ether')},
				(err,result)=>{
                    if (err) console.error('An error occured::::',err);
                    console.log('Arbiter has been set ,transaction id:::',result);
					}
			)

		}

		handleaddbalance(event){

			event.preventDefault();
			const{addBalance}=this.state.ContractInstance;

            const {List:attr} =this.state;

			console.log(attr.slice(0,3),attr.slice(4,attr.length));
			addBalance(
                attr.slice(0,3),attr.slice(4,attr.length),
				{gas:300000,
					from:window.web3.eth.accounts[0],
					value:window.web3.toWei(0.01,'ether')},
				(err,result)=>{
					if (err) console.error('An error occured::::',err);
					console.log('Amount addded ,transaction id:::',result);
				}
			)

		}

		getDriver(){
			const{driver} =this.state.ContractInstance;
			driver((err,address)=>{
				if (err) console.error('An error occured::::',err);
				console.log("This is the driver address ::::",address);
			})
		}

		getCustomer(){
			const{customer} =this.state.ContractInstance;
			customer((err,address)=>{
				if (err) console.error('An error occured::::',err);
				console.log("This is the customer address ::::",address);
			})
		}

		getArbiter(){
			const{arbiter} =this.state.ContractInstance;
			arbiter((err,address)=>{
				if (err) console.error('An error occured::::',err);
				console.log("This is the arbiter address ::::",address);
			})
		}

		getCurrentState(){
			const{currentState} =this.state.ContractInstance;
			currentState((err,state)=>{
				if (err) console.error('An error occured::::',err);
				console.log("Current State is ::::  ",state);
			})
		}

        queryassignDriver(){
            const{assignDriver} =this.state.ContractInstance;
            assignDriver((err,result)=>{
                if (err) console.error('An error occured::::',err);
                console.log("Driver assigned::::  ",result);
            })
        }

        queryStartRide(){
            const{startRide} =this.state.ContractInstance;
            startRide((err,result)=>{
                if (err) console.error('An error occured::::',err);
                console.log("Ride Started::::  ",result);
            })
        }

        queryCompleteTransaction(){
            const{completeTransaction} =this.state.ContractInstance;
            completeTransaction((err,result)=>{
                if (err) console.error('An error occured::::',err);
                console.log("Ride Finished::::  ",result);
            })
        }

        cancelRideByCustomer(){
            const{cancelRideByCustomer} =this.state.ContractInstance;
            cancelRideByCustomer((err,result)=>{
                if (err) console.error('An error occured::::',err);
                console.log("Ride cancelled by customer::::  ",result);
            })

        }
        cancelRideByDriver(){
            const{cancelRideByDriver} =this.state.ContractInstance;
            cancelRideByDriver((err,result)=>{
                if (err) console.error('An error occured::::',err);
                console.log("Ride cancelled by driver::::  ",result);
            })

        }

        resetState(){
            const{resetState} =this.state.ContractInstance;
            resetState((err,result)=>{
                if (err) console.error('An error occured::::',err);
                console.log("You can book another ride now");
            })
        }





  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Application to Booking a ride using React and Ethereum </h1>
        </header>
        <br />
		<br/>
		<form onSubmit={ this.handlegetBalance}>
			<input
				type="text"
				name="get-balance"
				placeholder="Address"
				value = {this.state.Address}
				onChange ={event=> this.setState({Address:event.target.value})}/>
			<button type="submit"> Get balance</button>
		</form>
		<button onClick={ this.getCurrentState}> Fetch current state</button>
		<br/>
		<br/>
		<button onClick={ this.getDriver}> Fetch driver address</button>
		<br/>
		<br/>
		<button onClick={ this.getCustomer}> Fetch customer address</button>
		<br/>
		<br/>
		<button onClick={ this.getArbiter}> Fetch arbiter address</button>
		<br/>
		<br/>

	  	<form onSubmit={ this.handlebookRide}>
		  <input
			  type="text"
			  name="get-balance"
			  placeholder="Amount"
			  value = {this.state.Amount}
			  onChange ={event=> this.setState({Amount:event.target.value})}/>
		  <button type="submit"> Book ride</button>
	 	 </form>
		<button onClick={ this.queryassignDriver}> Assign Driver</button>
		<br/>
		<br/>
		<button onClick={ this.queryStartRide}>Start Ride</button>
		<br/>
		<br/>
		<button onClick={ this.queryCompleteTransaction}>Finish Ride</button>
		<br/>
		<br/>
        <button onClick={ this.cancelRideByCustomer}>Cancle Ride Customer</button>
        <br/>
        <br/>
        <button onClick={ this.cancelRideByDriver}>Cancle Ride Driver</button>
        <br/>
        <br/>
        <button onClick={ this.resetState}>RESET</button>
        <br/>
        <br/>
		<form onSubmit={ this.handlesetCustomer}>
			<input
				type="text"
				name="set-Customer"
				placeholder="Address"
				value = {this.state.customerAddress}
                onChange ={ event=> this.setState({customerAddress:event.target.value})}/>
			<button type="submit"> Customer</button>
		</form>
		<form onSubmit={ this.handlesetDriver}>
			<input
				type="text"
				name="set-driver"
				placeholder="Address"
				value = {this.state.driverAddress}
                onChange ={ event=> this.setState({driverAddress:event.target.value})}/>
			<button type="submit"> Driver</button>
		</form>

		<form onSubmit={ this.handlesetArbiter}>
			<input
				type="text"
				name="set-arbiter"
				placeholder="Address"
				value = {this.state.arbiterAddress}
				onChange={ event=> this.setState({arbiterAddress:event.target.value})}/>
			<button type="submit"> Arbiter</button>
		</form>
          <form onSubmit={ this.handleaddbalance}>
              <input
                  type="text"
                  name="add-balance"
                  placeholder="Amount,Address"
				  value = {this.state.List}
                  onChange ={ event=> this.setState({List:event.target.value})}/>
              <button type="submit"> Add balance</button>
          </form>

      </div>
    );
  }
}

export default App;
