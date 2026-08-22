package com.ansh.api_hp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Testcontroller {

    @GetMapping("/hello")
    public String hello() {
        return "API Health Monitor Backend is running!";
    }
}