package com.sbu.advancedProject.contracts.connections;

import com.sbu.advancedProject.contracts.generated.Eber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Contract;
import org.web3j.tx.ManagedTransaction;

import java.io.IOException;
import java.math.BigInteger;

public class EberConnection {
    private static final Logger LOGGER = LoggerFactory.getLogger(EberConnection.class);
    private static EberConnection eberConnection;
    private Credentials driver_credentials, arbiter_credentials, customer_credentials;
    private Eber customer_contract, driver_contract, arbiter_contract;

    private EberConnection() {
        try {
            Web3j web3j = Web3j.build(new HttpService(
                    "http://localhost:8545"));  // FIXME: Enter your Infura token here;
            LOGGER.info("Connected to Ethereum client version: "
                    + web3j.web3ClientVersion().send().getWeb3ClientVersion());

            driver_credentials = WalletUtils.loadCredentials(
                    "verystrongpassword",
                    "/Users/rohan/Library/Ethereum/testnet/keystore/UTC--2018-02-26T14-58-17.468866000Z--cb043114719eecd68bc1b9345b2d7775844d1a0b");

            arbiter_credentials =
                    WalletUtils.loadCredentials(
                            "verystrongpassword",
                            "/Users/rohan/Library/Ethereum/testnet/keystore/UTC--2018-02-26T15-09-49.481226000Z--d44db053d597372d6276252cf944e1acb60d6140");
            customer_credentials =
                    WalletUtils.loadCredentials(
                            "verystrongpassword",
                            "/Users/rohan/Library/Ethereum/testnet/keystore/UTC--2018-02-26T14-44-16.019429000Z--9054075121131960318d19ebefa01c72c26f59dc");
            LOGGER.info("Credentials loaded");


            // Now lets deploy a smart contract

        /*Greeter contract = Greeter.deploy(
                web3j, credentials,
                ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT,
                "Hello blockchain world!").send();*/

            LOGGER.info("Retrieving smart contract");
            customer_contract = Eber.load("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", web3j, customer_credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);
            arbiter_contract = Eber.load("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", web3j, arbiter_credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);
            driver_contract = Eber.load("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", web3j, driver_credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);
            String contractAddress = customer_contract.getContractAddress();
            LOGGER.info("Smart contract retrieved from address " + contractAddress);
            LOGGER.info("View contract at https://ropsten.etherscan.io/tx/" + contractAddress);
        } catch (IOException | CipherException e) {
            e.printStackTrace();
        }
    }

    public static EberConnection getEberConnection() {
        if (eberConnection == null) {
            eberConnection = new EberConnection();
        }
        return eberConnection;
    }

    public static void main(String[] args) throws Exception {
        //new EberConnection().run();
//        new EberConnection().testFunctions();
        new EberConnection().resetState();
    }

    public void testFunctions() throws IOException {
        Web3j web3j = Web3j.build(new HttpService(
                "http://localhost:8545"));
        LOGGER.info("Retrieving smart contract");
        //Eber contract = Eber.load("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", web3j, customer_credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);
        System.out.println(web3j.ethGetBalance("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", DefaultBlockParameterName.LATEST).send().getBalance());
    }

    public void resetContract() throws Exception {
        Web3j web3j = Web3j.build(new HttpService(
                "http://localhost:8545"));
        LOGGER.info("Retrieving smart contract");
        Eber contract = Eber.load("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", web3j, customer_credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);
        LOGGER.info("Reset State: " + contract.resetState().send());
        LOGGER.info("Current State: " + contract.currentState().send());
    }

    public String getCustomerAddress() {
        try {
            return customer_contract.customer().send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    public TransactionReceipt bookCab(BigInteger amount) {
        try {
            return customer_contract.bookCab(amount).send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getArbiterAddress() {
        try {
            return arbiter_contract.arbiter().send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    public String getDriverAddress() {
        try {
            return driver_contract.driver().send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    public TransactionReceipt startRide() {
        try {
            return driver_contract.startRide().send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public TransactionReceipt addBalance(BigInteger amount, String address) {
        try {
            return arbiter_contract.addBalance(amount, address).send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public TransactionReceipt assignDriver() {
        try {
            return arbiter_contract.assignDriver().send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public BigInteger getBalance(String address) {
        try {
            return arbiter_contract.balances(address).send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public BigInteger getCurrentState() {
        try {
            return arbiter_contract.currentState().send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public TransactionReceipt resetState() {
        try {
            return arbiter_contract.resetState().send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public TransactionReceipt completeTransaction() {
        try {
            return arbiter_contract.completeTransaction().send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private void run() throws Exception {

        // We start by creating a new web3j instance to connect to remote nodes on the network.
        // Note: if using web3j Android, use Web3jFactory.build(...

        Web3j web3j = Web3j.build(new HttpService(
                "http://localhost:8545"));
        LOGGER.info("Retrieving smart contract");
        Eber customer_contract = Eber.load("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", web3j, customer_credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);
        Eber arbiter_contract = Eber.load("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", web3j, arbiter_credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);
        Eber driver_contract = Eber.load("0x7ec57d5dde3f3f0eb8becc0865c4b53bba0dac9d", web3j, driver_credentials, ManagedTransaction.GAS_PRICE, Contract.GAS_LIMIT);
        String contractAddress = customer_contract.getContractAddress();
        LOGGER.info("Smart contract retrieved from address " + contractAddress);
        LOGGER.info("View contract at https://ropsten.etherscan.io/tx/" + contractAddress);

        LOGGER.info("Customer: " + customer_contract.customer().send());
        LOGGER.info("Arbiter: " + customer_contract.arbiter().send());
        LOGGER.info("Driver: " + customer_contract.driver().send());
        //log.info("Customer Balance: " + contract.balances(contract.customer().send()).send());
        LOGGER.info("Balance added in the customer account." + customer_contract.addBalance(BigInteger.valueOf(100), customer_contract.customer().send()).send());
        LOGGER.info("Customer Balance: " + customer_contract.balances(customer_contract.customer().send()).send());
        LOGGER.info("Arbiter Balance: " + customer_contract.balances(customer_contract.arbiter().send()).send());
        LOGGER.info("Driver Balance: " + customer_contract.balances(customer_contract.driver().send()).send());
        LOGGER.info("Current State: " + customer_contract.currentState().send());
        LOGGER.info("Book Cab: " + customer_contract.bookCab(BigInteger.valueOf(20)).send());
        LOGGER.info("Current State: " + customer_contract.currentState().send());
        LOGGER.info("Customer Balance: " + customer_contract.balances(customer_contract.customer().send()).send());
        LOGGER.info("Arbiter Balance: " + customer_contract.balances(customer_contract.arbiter().send()).send());
        LOGGER.info("Driver Balance: " + customer_contract.balances(customer_contract.driver().send()).send());
        LOGGER.info("Assign Driver: " + arbiter_contract.assignDriver().send());
        LOGGER.info("Current State: " + customer_contract.currentState().send());
        LOGGER.info("Start Ride: " + driver_contract.startRide().send());
        LOGGER.info("Current State: " + customer_contract.currentState().send());
        LOGGER.info("Complete Transaction: " + arbiter_contract.completeTransaction().send());
        LOGGER.info("Current State: " + customer_contract.currentState().send());
        LOGGER.info("Customer Balance: " + customer_contract.balances(customer_contract.customer().send()).send());
        LOGGER.info("Arbiter Balance: " + customer_contract.balances(customer_contract.arbiter().send()).send());
        LOGGER.info("Driver Balance: " + customer_contract.balances(customer_contract.driver().send()).send());
        LOGGER.info("Reset State: " + arbiter_contract.resetState().send());
        LOGGER.info("Current State: " + customer_contract.currentState().send());
    }
}
