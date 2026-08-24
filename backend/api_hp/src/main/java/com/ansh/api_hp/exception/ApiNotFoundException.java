package com.ansh.api_hp.exception;

public class ApiNotFoundException extends RuntimeException {

    public ApiNotFoundException(Long id) {
        super("No API exists with id: " + id);
    }
}