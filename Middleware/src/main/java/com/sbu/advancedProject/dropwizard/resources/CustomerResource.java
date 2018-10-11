package com.sbu.advancedProject.dropwizard.resources;

import com.sbu.advancedProject.contracts.connections.EberConnection;
import com.sbu.advancedProject.dropwizard.api.CustomerAddress;
import com.sbu.advancedProject.dropwizard.api.CustomerBookCab;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.math.BigInteger;

@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
public class CustomerResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerResource.class);

    @GET
    @Path("/address")
    public CustomerAddress getAddress() {
        return new CustomerAddress(EberConnection.getEberConnection().getCustomerAddress());
//        return new Saying(2);
    }

    @GET
    @Path("/bookCab")
    public CustomerBookCab bookCab(@QueryParam("amount") BigInteger amount) {
        EberConnection.getEberConnection().bookCab(amount);
        return new CustomerBookCab("Cab booked successfully");
    }

    /*@POST
    public void receiveHello(@Valid Saying saying) {
        LOGGER.info("Received a saying: {}", saying);
    }

    @GET
    @Path("/date")
    @Produces(MediaType.TEXT_PLAIN)
    public String receiveDate(@QueryParam("date") Optional<DateTimeParam> dateTimeParam) {
        if (dateTimeParam.isPresent()) {
            final DateTimeParam actualDateTimeParam = dateTimeParam.get();
            LOGGER.info("Received a date: {}", actualDateTimeParam);
            return actualDateTimeParam.get().toString();
        } else {
            LOGGER.warn("No received date");
            return null;
        }
    }*/
}
