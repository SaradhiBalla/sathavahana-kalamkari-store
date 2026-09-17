package com.sathavahana.kalamkari.repository;
import com.sathavahana.kalamkari.domain.Payment; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface PaymentRepository extends JpaRepository<Payment,Long>{Optional<Payment> findByIdempotencyKey(String key); Optional<Payment> findByOrderId(Long id);}
