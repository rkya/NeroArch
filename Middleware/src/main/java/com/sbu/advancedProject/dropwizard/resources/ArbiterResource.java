package com.sbu.advancedProject.dropwizard.resources;

import com.sbu.advancedProject.contracts.connections.EberConnection;
import com.sbu.advancedProject.dropwizard.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.math.BigInteger;
import java.util.Optional;

@Path("/arbiter")
@Produces(MediaType.APPLICATION_JSON)
public class ArbiterResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(ArbiterResource.class);

    @GET
    @Path("/address")
    public ArbiterAddress getAddress() {
        return new ArbiterAddress(EberConnection.getEberConnection().getArbiterAddress());
    }

    @GET
    @Path("/state")
    public ArbiterState getState() {
        return new ArbiterState(EberConnection.getEberConnection().getCurrentState());
    }

    @GET
    @Path("/addBalance")
    public ArbiterAddBalance addBalance(@QueryParam("address") String address, @QueryParam("amount") BigInteger amount) {
        LOGGER.info("adding amount " + amount + " to address " + address);
        EberConnection.getEberConnection().addBalance(amount, address);
        return new ArbiterAddBalance("Balance added successfully.");
    }

    @GET
    @Path("/getBalance")
    public ArbiterGetBalance getBalance(@QueryParam("address") Optional<String> address) {
        return new ArbiterGetBalance(EberConnection.getEberConnection().getBalance(address.orElse(EberConnection.getEberConnection().getCustomerAddress())));
    }

    @GET
    @Path("/assignDriver")
    public ArbiterAssignDriver assignDriver() {
        EberConnection.getEberConnection().assignDriver();
        return new ArbiterAssignDriver("Driver assigned successfully.");
    }

    @GET
    @Path("/completeTransaction")
    public ArbiterCompleteTransaction completeTransaction() {
        EberConnection.getEberConnection().completeTransaction();
        return new ArbiterCompleteTransaction("Transaction completed successfully.");
    }

    @GET
    @Path("/resetState")
    public ArbiterResetState resetState() {
        EberConnection.getEberConnection().resetState();
        return new ArbiterResetState("State reset successful.");
    }
}
