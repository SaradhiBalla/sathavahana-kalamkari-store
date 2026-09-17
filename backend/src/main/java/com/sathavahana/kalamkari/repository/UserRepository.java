package com.sathavahana.kalamkari.repository;

import com.sathavahana.kalamkari.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);
    org.springframework.data.domain.Page<User> findByEmailContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String email,String firstName,String lastName,org.springframework.data.domain.Pageable page);
    long countByRole(User.Role role);
}
