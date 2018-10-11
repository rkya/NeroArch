package com.sbu.advancedProject.dropwizard.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CustomerAddress {
//    private long id;

    //    @Length(max = 3)
    private String address;

    public CustomerAddress() {
        // Jackson deserialization
    }

    public CustomerAddress(String address) {
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
