package com.sathavahana.kalamkari.repository;
import com.sathavahana.kalamkari.domain.Shipment; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ShipmentRepository extends JpaRepository<Shipment,Long>{Optional<Shipment> findByOrderId(Long id);}
