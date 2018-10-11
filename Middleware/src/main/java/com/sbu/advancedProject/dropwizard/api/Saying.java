package com.sbu.advancedProject.dropwizard.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Saying {
    private long id;

//    @Length(max = 3)
//    private String content;

    public Saying() {
        // Jackson deserialization
    }

    public Saying(long id) {
        this.id = id;
//        this.content = content;
    }

    @JsonProperty
    public long getId() {
        return id;
    }

    //    @JsonProperty
//    public String getContent() {
//        return content;
//    }
}
