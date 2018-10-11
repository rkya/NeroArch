package com.sbu.advancedProject.contracts.generated;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 3.3.1.
 */
public class Eber extends Contract {
    private static final String BINARY = "6060604052341561000f57600080fd5b60405160608061076383398101604052808051919060200180519190602001805160028054600160a060020a0319908116600160a060020a03978816179091556003805482169587169590951790945560048054909416941693909317909155506106e29050806100816000396000f3006060604052600436106100e55763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630c3f6acf81146100ea5780631c9c088a1461012157806327e235e3146101425780632804b2c014610173578063620c0c4b146101a25780636ecc5d62146101c15780637b71993b146101d45780637c45a5f7146101e75780637ec8a332146101fa578063b3071fbd1461020d578063b3ae1d2c14610220578063b74ffca714610247578063bdb093bf1461025d578063f9e19fa51461027f578063fc1df44214610292578063fe25e00a146102b1575b600080fd5b34156100f557600080fd5b6100fd6102c4565b6040518082600481111561010d57fe5b60ff16815260200191505060405180910390f35b341561012c57600080fd5b610140600160a060020a03600435166102cd565b005b341561014d57600080fd5b610161600160a060020a03600435166102fc565b60405190815260200160405180910390f35b341561017e57600080fd5b61018661030e565b604051600160a060020a03909116815260200160405180910390f35b34156101ad57600080fd5b610140600160a060020a036004351661031d565b34156101cc57600080fd5b61018661034c565b34156101df57600080fd5b61014061035b565b34156101f257600080fd5b6101406103f5565b341561020557600080fd5b610140610446565b341561021857600080fd5b610140610493565b341561022b57600080fd5b61023361050e565b604051901515815260200160405180910390f35b341561025257600080fd5b61023360043561059a565b341561026857600080fd5b610140600435600160a060020a036024351661064c565b341561028a57600080fd5b61014061066c565b341561029d57600080fd5b610140600160a060020a0360043516610678565b34156102bc57600080fd5b6101866106a7565b60005460ff1681565b6004805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60016020526000908152604090205481565b600254600160a060020a031681565b6002805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600354600160a060020a031681565b60025433600160a060020a0390811691161461037657600080fd5b60018060005460ff16600481111561038a57fe5b1461039457600080fd5b60028060005460ff1660048111156103a857fe5b146103b257600080fd5b50506000805460ff1916815560048054600160a060020a039081168352600160205260408084205460025483168552818520805490910190559154168252812055565b60045433600160a060020a0390811691161461041057600080fd5b60018060005460ff16600481111561042457fe5b1461042e57600080fd5b600080546002919060ff19166001835b021790555050565b60035433600160a060020a0390811691161461046157600080fd5b60028060005460ff16600481111561047557fe5b1461047f57600080fd5b600080546003919060ff191660018361043e565b60035433600160a060020a039081169116146104ae57600080fd5b60028060005460ff1660048111156104c257fe5b146104cc57600080fd5b506000805460ff1916815560048054600160a060020a039081168352600160205260408084205460025483168552818520805490910190559154168252812055565b60045460009033600160a060020a0390811691161461052c57600080fd5b60038060005460ff16600481111561054057fe5b1461054a57600080fd5b505060048054600160a060020a03908116600090815260016020819052604080832054600354851684528184208054909101905584549093168252918120819055805460ff191690921790915590565b60025460009033600160a060020a039081169116146105b857600080fd5b60008060005460ff1660048111156105cc57fe5b146105d657600080fd5b600254600160a060020a0316600090815260016020526040902054839010156106025760009150610646565b6000805460ff191660019081178255600454600160a060020a0390811683526020829052604080842080548801905560025490911683529091208054859003905591505b50919050565b600160a060020a0316600090815260016020526040902080549091019055565b6000805460ff19169055565b6003805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600454600160a060020a0316815600a165627a7a72305820b0d6339be15bcfe3a09c4f9839c3dbf1dea062b7dc64988178941271ef300c1a0029";

    protected Eber(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Eber(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public RemoteCall<BigInteger> currentState() {
        final Function function = new Function("currentState", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<TransactionReceipt> setArbiter(String a) {
        final Function function = new Function(
                "setArbiter", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(a)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<BigInteger> balances(String param0) {
        final Function function = new Function("balances", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteCall<String> customer() {
        final Function function = new Function("customer", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteCall<TransactionReceipt> setCustomer(String c) {
        final Function function = new Function(
                "setCustomer", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(c)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<String> driver() {
        final Function function = new Function("driver", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteCall<TransactionReceipt> cancelRideByCustomer() {
        final Function function = new Function(
                "cancelRideByCustomer", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> assignDriver() {
        final Function function = new Function(
                "assignDriver", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> startRide() {
        final Function function = new Function(
                "startRide", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> cancelRideByDriver() {
        final Function function = new Function(
                "cancelRideByDriver", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> completeTransaction() {
        final Function function = new Function(
                "completeTransaction", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> bookCab(BigInteger amount) {
        final Function function = new Function(
                "bookCab", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> addBalance(BigInteger amount, String entity) {
        final Function function = new Function(
                "addBalance", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(amount), 
                new org.web3j.abi.datatypes.Address(entity)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> resetState() {
        final Function function = new Function(
                "resetState", 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<TransactionReceipt> setDriver(String d) {
        final Function function = new Function(
                "setDriver", 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(d)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<String> arbiter() {
        final Function function = new Function("arbiter", 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public static RemoteCall<Eber> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String _customer, String _driver, String _arbiter) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_customer), 
                new org.web3j.abi.datatypes.Address(_driver), 
                new org.web3j.abi.datatypes.Address(_arbiter)));
        return deployRemoteCall(Eber.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    public static RemoteCall<Eber> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String _customer, String _driver, String _arbiter) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_customer), 
                new org.web3j.abi.datatypes.Address(_driver), 
                new org.web3j.abi.datatypes.Address(_arbiter)));
        return deployRemoteCall(Eber.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    public static Eber load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Eber(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    public static Eber load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Eber(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }
}
