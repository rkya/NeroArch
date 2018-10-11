package com.sbu.advancedProject.dropwizard.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ArbiterAssignDriver {
//    private long id;

    //    @Length(max = 3)
    private String returnString;

    public ArbiterAssignDriver() {
        // Jackson deserialization
    }

    public ArbiterAssignDriver(String returnString) {
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
