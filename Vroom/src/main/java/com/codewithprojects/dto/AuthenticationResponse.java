package com.codewithprojects.dto;

import com.codewithprojects.enums.UserRole;
import lombok.*;
@Data
public class AuthenticationResponse {

    private String jwt;

    private UserRole userRole;

    private Long userId;
}
