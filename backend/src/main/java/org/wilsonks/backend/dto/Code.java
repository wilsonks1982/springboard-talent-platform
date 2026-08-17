package org.wilsonks.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record Code(@NotBlank @Pattern(regexp="^[0-9]{6}$") String code){}

