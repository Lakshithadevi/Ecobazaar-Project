package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Role;
import lombok.Data;

@Data
public class SignUpRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String username;
    private String password;
    private Role role;
}
