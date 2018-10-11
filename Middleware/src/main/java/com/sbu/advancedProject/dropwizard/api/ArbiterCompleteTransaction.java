package com.sbu.advancedProject.dropwizard.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ArbiterCompleteTransaction {
//    private long id;

    //    @Length(max = 3)
    private String returnString;

    public ArbiterCompleteTransaction() {
        // Jackson deserialization
    }

    public ArbiterCompleteTransaction(String returnString) {
//        this.id = id;
        this.returnString = returnString;
    }

//    @JsonProperty
//    public long getId() {
//        return id;
//    }

    @JsonProperty
    public String getReturnString() {
        return returnString;
    }
}
