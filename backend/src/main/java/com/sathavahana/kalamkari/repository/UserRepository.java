package com.sathavahana.kalamkari.repository;

import com.sathavahana.kalamkari.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);
}
