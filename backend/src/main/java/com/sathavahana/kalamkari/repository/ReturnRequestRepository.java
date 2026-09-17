package com.sathavahana.kalamkari.repository;
import com.sathavahana.kalamkari.domain.ReturnRequest; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ReturnRequestRepository extends JpaRepository<ReturnRequest,Long>{Optional<ReturnRequest> findByOrderId(Long id);}
