# Introduction

This application is a middleware that connects the frontend application with the backend ie. the contract.
It connects to the blockchain and communicates with the smart contract deployed on the blockchain.
The Front End can be any application that contacts the Middleware through REST API.

# Running The Application

To run the application run the following commands.

* Initial setup :run the following 

npm install solc
        

* To build the generated Eber contract, run the following from the root directory.

        ./scripts/buildContracts.sh

* To compile.

        mvn compile

* To run the server.

        execute the java-exec plugin from the maven tab.

* Following APIs are supported.

        GET     /arbiter/addBalance (com.sbu.advancedProject.dropwizard.resources.ArbiterResource)
        GET     /arbiter/address (com.sbu.advancedProject.dropwizard.resources.ArbiterResource)
        GET     /arbiter/assignDriver (com.sbu.advancedProject.dropwizard.resources.ArbiterResource)
        GET     /arbiter/completeTransaction (com.sbu.advancedProject.dropwizard.resources.ArbiterResource)
        GET     /arbiter/getBalance (com.sbu.advancedProject.dropwizard.resources.ArbiterResource)
        GET     /arbiter/resetState (com.sbu.advancedProject.dropwizard.resources.ArbiterResource)
        GET     /arbiter/state (com.sbu.advancedProject.dropwizard.resources.ArbiterResource)
        GET     /customer/address (com.sbu.advancedProject.dropwizard.resources.CustomerResource)
        GET     /customer/bookCab (com.sbu.advancedProject.dropwizard.resources.CustomerResource)
        GET     /driver/address (com.sbu.advancedProject.dropwizard.resources.DriverResource)
        GET     /driver/startRide (com.sbu.advancedProject.dropwizard.resources.DriverResource)
