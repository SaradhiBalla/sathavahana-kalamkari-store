package com.sathavahana.kalamkari.repository;
import com.sathavahana.kalamkari.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface WishlistRepository extends JpaRepository<Wishlist,Long>{List<Wishlist> findByUserId(Long id); Optional<Wishlist> findByUserIdAndProductId(Long u,Long p);}
