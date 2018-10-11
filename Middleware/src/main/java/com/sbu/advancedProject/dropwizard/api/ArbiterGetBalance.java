package com.sbu.advancedProject.dropwizard.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigInteger;

public class ArbiterGetBalance {
//    private long id;

    //    @Length(max = 3)
    private BigInteger balance;

    public ArbiterGetBalance() {
        // Jackson deserialization
    }

    public ArbiterGetBalance(BigInteger balance) {
//        this.id = id;
        this.balance = balance;
    }

//    @JsonProperty
//    public long getId() {
//        return id;
//    }

    @JsonProperty
    public BigInteger getBalance() {
        return balance;
    }
}
