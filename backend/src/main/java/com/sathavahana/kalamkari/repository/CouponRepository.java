package com.sathavahana.kalamkari.repository;
import com.sathavahana.kalamkari.domain.Coupon; import org.springframework.data.jpa.repository.*; import java.util.*;
public interface CouponRepository extends JpaRepository<Coupon,Long>{@Query("select c from Coupon c where upper(c.code)=upper(:code)") Optional<Coupon> findByCode(String code);}
