package sfeir.petstore.configs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "sfeir.petstore")
public class PetStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetStoreApplication.class, args);
    }
}
