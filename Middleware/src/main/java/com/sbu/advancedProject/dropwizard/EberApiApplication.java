package com.sbu.advancedProject.dropwizard;

import com.sbu.advancedProject.dropwizard.resources.ArbiterResource;
import com.sbu.advancedProject.dropwizard.resources.CustomerResource;
import com.sbu.advancedProject.dropwizard.resources.DriverResource;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class EberApiApplication extends Application<EberApiConfiguration> {
    public static void main(String[] args) throws Exception {
        new EberApiApplication().run(args);
    }

    @Override
    public String getName() {
        return "advancedProject";
    }

    @Override
    public void initialize(Bootstrap<EberApiConfiguration> bootstrap) {
        // nothing to do yet
    }

    @Override
    public void run(EberApiConfiguration configuration, Environment environment) {
        /*final HelloWorldResource resource = new HelloWorldResource(
                configuration.getTemplate(),
                configuration.getDefaultName()
        );
        environment.jersey().register(resource);*/

        final CustomerResource customerResource = new CustomerResource();
        environment.jersey().register(customerResource);
        final ArbiterResource arbiterResource = new ArbiterResource();
        environment.jersey().register(arbiterResource);
        final DriverResource driverResource = new DriverResource();
        environment.jersey().register(driverResource);
    }
}
