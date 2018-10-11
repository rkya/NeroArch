package com.sbu.advancedProject.dropwizard.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigInteger;

public class ArbiterState {
//    private long id;

    //    @Length(max = 3)
    private BigInteger state;

    public ArbiterState() {
        // Jackson deserialization
    }

    public ArbiterState(BigInteger state) {
//        this.id = id;
        this.state = state;
    }

//    @JsonProperty
//    public long getId() {
//        return id;
//    }

    @JsonProperty
    public BigInteger getState() {
        return state;
    }
}
