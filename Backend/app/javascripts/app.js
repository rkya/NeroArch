// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Eber contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Eber abstraction. We will use this abstraction
 * later to create an instance of the Eber contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import eber_artifacts from '../../build/contracts/Eber.json'

var Eber = contract(eber_artifacts);

let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

window.add_balance = function(candidate) {
  let amount = $("#argument_add_balance_amount").val();
  let entity = $("#argument_add_balance_entity").val();
  try {
    $("#output_add_balance").html("Balance is being added. The balance will increase as soon as the it is recorded on the blockchain. Please wait...")
    $("#argument_add_balance_amount").val("");
    $("#argument_add_balance_entity").val("");

    /* Eber.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    //Voting.deployed().then(function(contractInstance) {contractInstance.voteForCandidate('Rama').then(function(v) {console.log(v)})})
    Eber.deployed().then(function(contractInstance) {
      contractInstance.addBalance(amount, entity, {gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        $("#output_add_balance").html("Balance added successfully...");
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.book_cab = function(candidate) {
  let amount = $("#argument_book_cab_amount").val();
  try {
    //$("#msg").html("Amount has been confirmed. Please wait...")
    $("#output_book_cab").html("Finding your ride. Please wait...")

    //let driver = '0xcb043114719eecd68bc1b9345b2d7775844d1a0b';
    Eber.deployed().then(function(contractInstance) {
      contractInstance.customer({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        let customer = v.toString();
	    console.log('amount = $' + amount);
	    console.log('customer address = ' + customer);
	    Eber.deployed().then(function(contractInstance) {
	      contractInstance.bookCab(amount, {gas: 1400000, from: customer + ''}).then(function(v) {
	        $("#output_book_cab").html('Amount confirmed...');
	      });
	    });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.assign_driver = function() {
  try {
    //$("#msg").html("");
    //let cust = '';
    Eber.deployed().then(function(contractInstance) {
      contractInstance.arbiter({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        //return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
          let arbaddress= v.toString();
          //$("#candidate-2").html("");
        //});
        //cust = v.toString();
	    console.log("Arbiter address:"+arbaddress);
	    Eber.deployed().then(function(contractInstance) {
	      contractInstance.assignDriver({gas: 140000, from: arbaddress}).then(function(v) {
	        /*return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
	          $("#candidate-19").html(v.toString());
	          $("#candidate-2").html("");
	        });*/
	        $("#output_assign_driver").html('Driver Assigned...');
	      });
	    });
      });
    });
    
  } catch (err) {
    console.log(err);
  }
}

window.start_ride=function(){
    try {
      //$("#msg").html("");
      //let cust = '';
      Eber.deployed().then(function(contractInstance) {
        contractInstance.driver({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
          //return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
            let drivaddress= v.toString();
            //$("#candidate-2").html("");
          //});
          //cust = v.toString();
  	    console.log("Driver address:"+drivaddress);
  	    Eber.deployed().then(function(contractInstance) {
  	      contractInstance.startRide({gas: 140000, from: drivaddress}).then(function(v) {
  	        /*return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
  	          $("#candidate-19").html(v.toString());
  	          $("#candidate-2").html("");
  	        });*/
  	        $("#output_start_ride").html('Ride started ...');
  	      });
  	    });
        });
      });
    
    } catch (err) {
      console.log(err);
    }
}

window.confirm_transaction = function() {
  try {
    //$("#msg").html("Balance has been added. The balance will increase as soon as the it is recorded on the blockchain. Please wait...")
    //$("#argument_destination_reached_journey").val("");
    $("#output_confirm_transaction").html("Amount paid to the driver. Ride completed")
    Eber.deployed().then(function(contractInstance) {
      contractInstance.arbiter({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        let arbiter = v.toString();
    	console.log('arbiter address = ' + arbiter);
    	Eber.deployed().then(function(contractInstance) {
     	  contractInstance.completeTransaction({gas: 1400000, from: arbiter + ''}).then(function(v) {
       		$("#output_confirm_transaction").html('Destination reached...');
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.cancleRide_Driver = function() {
  try {
    //$("#msg").html("Balance has been added. The balance will increase as soon as the it is recorded on the blockchain. Please wait...")
    //$("#argument_destination_reached_journey").val("");
    $("#output_cancleRide_Driver").html("Ride canceled by Driver")
    Eber.deployed().then(function(contractInstance) {
      contractInstance.driver({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        let driver = v.toString();
    	console.log('driver address = ' + arbiter);
    	Eber.deployed().then(function(contractInstance) {
     	  contractInstance.cancelRideByDriver({gas: 1400000, from: driver + ''}).then(function(v) {
       		$("#output_cancleRide_Driver").html('Ride Canceled');
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.cancleRide_Customer = function() {
  try {
    //$("#msg").html("Balance has been added. The balance will increase as soon as the it is recorded on the blockchain. Please wait...")
    //$("#argument_destination_reached_journey").val("");
    $("#output_cancleRide_Customer").html("Ride canceled by Customer")
    Eber.deployed().then(function(contractInstance) {
      contractInstance.customer({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        let customer = v.toString();
    	console.log('Customer address = ' + customer);
    	Eber.deployed().then(function(contractInstance) {
     	  contractInstance.cancelRideByDriver({gas: 1400000, from: customer + ''}).then(function(v) {
       		$("#output_cancleRide_Customer").html('Ride Canceled');
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.balances = function(candidate) {
  try {
    //$("#msg").html("");
    let entity = $("#argument_balances_address").val();
    /*Eber.deployed().then(function(contractInstance) {
      contractInstance.customer({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        /!*return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
          $("#candidate-19").html(v.toString());
          $("#candidate-2").html("");
        });*!/
        cust = v.toString();
      });
    });*/
    
    Eber.deployed().then(function(contractInstance) {
      contractInstance.balances(entity,{gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        /*return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
          $("#candidate-19").html(v.toString());
          $("#candidate-2").html("");
        });*/
        $("#output_balances").html(v.toString());
      });
    });
  } catch (err) {
    console.log(err);
  }
}


window.set_cust= function(candidate) {
  let entity = $("#argument_setcust_address").val();
  try {$("#msg").html("Custtomer has been set. Please wait for update.")
	  
    //$("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    //$("#candidate-19").val("");

    /* Eber.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    //Voting.deployed().then(function(contractInstance) {contractInstance.voteForCandidate('Rama').then(function(v) {console.log(v)})})
    Eber.deployed().then(function(contractInstance) {
      contractInstance.setCustomer(entity + '', {gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {console.log(v)})})
        return contractInstance.customer.call().then(function(v) {
          //$("#candidate-19").html(v.toString());
          //$("#candidate-2").html("");
		  
        });
		$("#output_setcust").html("Customer set");
  } catch (err) {
    console.log(err);
  }
}
window.set_drv= function(candidate) {
  let entity = $("#argument_setdrv_address").val();
  try {$("#msg").html("Driver has been set. Please wait for update.")
	  
    //$("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    //$("#candidate-19").val("");

    /* Eber.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    //Voting.deployed().then(function(contractInstance) {contractInstance.voteForCandidate('Rama').then(function(v) {console.log(v)})})
    Eber.deployed().then(function(contractInstance) {
      contractInstance.setDriver(entity + '', {gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {console.log(v)})})
        return contractInstance.driver.call().then(function(v) {
          //$("#candidate-19").html(v.toString());
          //$("#candidate-2").html("");
		  
        });
		$("#output_setdrv").html("Driver set");
  } catch (err) {
    console.log(err);
  }
}

window.set_arb= function(candidate) {
  let entity = $("#argument_setarb_address").val();
  try {$("#output_setarb").html("Arbiter has been set. Please wait for update.")
	  
    //$("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    //$("#candidate-19").val("");

    /* Eber.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    //Voting.deployed().then(function(contractInstance) {contractInstance.voteForCandidate('Rama').then(function(v) {console.log(v)})})
    Eber.deployed().then(function(contractInstance) {
      contractInstance.setArbiter(entity + '', {gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {console.log(v)})})
        return contractInstance.arbiter.call().then(function(v) {
          //$("#candidate-19").html(v.toString());
          //$("#candidate-2").html("");
		  
        });
		$("#output_setarb").html("Driver set");
  } catch (err) {
    console.log(err);
  }
}


window.arbiter = function() {
  try {
    Eber.deployed().then(function(contractInstance) {
      contractInstance.arbiter({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        $("#output_arbiter").html(v.toString());
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.reset_state = function() {
  try {
    Eber.deployed().then(function(contractInstance) {
      contractInstance.resetState({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        $("#output_reset_state").html('Reset successful');
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.current_state = function() {
  try {
    /* Eber.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Eber.deployed().then(function(contractInstance) {
      contractInstance.currentState({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        /*return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
          $("#candidate-19").html(v.toString());
          $("#candidate-2").html("");
        });*/
        $("#output_current_state").html(v.toString());
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.driver = function() {
  try {
    /* Eber.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Eber.deployed().then(function(contractInstance) {
      contractInstance.driver({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        /*return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
          $("#candidate-19").html(v.toString());
          $("#candidate-2").html("");
        });*/
        $("#output_driver").html(v.toString());
      });
    });
  } catch (err) {
    console.log(err);
  }
}

window.customer = function() {
  try {
    /* Eber.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Eber.deployed().then(function(contractInstance) {
      contractInstance.customer({gas: 140000, from: web3.eth.accounts[0]}).then(function(v) {
        /*return contractInstance.totalVotesFor.call(candidateName).then(function(v) {
          $("#candidate-19").html(v.toString());
          $("#candidate-2").html("");
        });*/
        $("#output_customer").html(v.toString());
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Eber.setProvider(web3.currentProvider);
  Eber.deployed().then(function(contractInstance) {
    contractInstance._arbiter.call().then(function(v) {
      $("#" + candidates[name]).html(v.toString());
    });
  })
  /*let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    Eber.deployed().then(function(contractInstance) {
      contractInstance.totalVotesFor.call(name).then(function(v) {
        $("#" + candidates[name]).html(v.toString());
      });
    })
  }*/
});
