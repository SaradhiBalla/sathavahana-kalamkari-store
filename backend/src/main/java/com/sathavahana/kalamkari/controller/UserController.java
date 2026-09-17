package com.sathavahana.kalamkari.controller;

import com.sathavahana.kalamkari.dto.UserDto;
import com.sathavahana.kalamkari.service.CurrentUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final CurrentUser currentUser;

    public UserController(CurrentUser currentUser) {
        this.currentUser = currentUser;
    }

    @GetMapping("/me")
    public UserDto me() {
        return UserDto.of(currentUser.require());
    }
}
