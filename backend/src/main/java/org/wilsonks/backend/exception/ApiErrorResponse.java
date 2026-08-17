package org.wilsonks.backend.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.OffsetDateTime;

public record ApiErrorResponse(
        int status,
        String message,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
        OffsetDateTime timestamp,
        String path
) {
    //Compact constructor to ensure timestamp is set to current time if not provided
    public ApiErrorResponse(int status, String message, String path) {
        this(status, message, OffsetDateTime.now(), path);
    }
}
