package com.ansh.api_hp;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableScheduling
@SpringBootApplication
public class ApiHpApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiHpApplication.class, args);
    }

}
