package ru.gb.wtg.exceptions;

import lombok.Data;

import java.util.Date;

@Data
public class WTGError {

    private int status;
    private String message;
    private Date timestamp;

    public WTGError(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = new Date();
    }

}
