package com.sathavahana.kalamkari.repository;
import com.sathavahana.kalamkari.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface AddressRepository extends JpaRepository<Address,Long> {
    List<Address> findAllByUserIdOrderByIdDesc(Long userId);
    Optional<Address> findByIdAndUserId(Long id, Long userId);
}
