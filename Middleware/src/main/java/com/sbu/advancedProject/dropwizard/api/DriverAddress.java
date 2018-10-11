package com.sbu.advancedProject.dropwizard.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DriverAddress {
//    private long id;

    //    @Length(max = 3)
    private String address;

    public DriverAddress() {
        // Jackson deserialization
    }

    public DriverAddress(String address) {
//        this.id = id;
        this.address = address;
    }

//    @JsonProperty
//    public long getId() {
//        return id;
//    }

    @JsonProperty
    public String getAddress() {
        return address;
    }
}
