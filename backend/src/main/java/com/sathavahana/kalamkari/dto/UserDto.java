package com.sathavahana.kalamkari.dto;

import com.sathavahana.kalamkari.domain.User;

public record UserDto(Long id, String name, String email, String phone, String role) {
    public static UserDto of(User user) {
        String name = user.getFirstName() + (user.getLastName() == null ? "" : " " + user.getLastName());
        return new UserDto(user.getId(), name, user.getEmail(), user.getPhone(), user.getRole().name());
    }
}
