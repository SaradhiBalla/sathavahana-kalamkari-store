package com.sathavahana.kalamkari.repository;
import com.sathavahana.kalamkari.domain.Review; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ReviewRepository extends JpaRepository<Review,Long>{List<Review> findByProductIdAndStatus(Long id,String status);}
