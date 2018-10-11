package com.sbu.advancedProject.dropwizard.resources;

import com.sbu.advancedProject.contracts.connections.EberConnection;
import com.sbu.advancedProject.dropwizard.api.DriverAddress;
import com.sbu.advancedProject.dropwizard.api.DriverStartRide;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/driver")
@Produces(MediaType.APPLICATION_JSON)
public class DriverResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(DriverResource.class);

    public static void main(String[] args) {
//        new DriverResource().startRide();
        TransactionReceipt tr = EberConnection.getEberConnection().startRide();
        tr.getClass();
    }

    @GET
    @Path("/address")
    public DriverAddress getAddress() {
        return new DriverAddress(EberConnection.getEberConnection().getDriverAddress());
    }

    @GET
    @Path("/startRide")
    public DriverStartRide startRide() {
        EberConnection.getEberConnection().assignDriver();
        EberConnection.getEberConnection().startRide();
        return new DriverStartRide("Ride started successfully.");
    }
}
