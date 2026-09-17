package com.sathavahana.kalamkari.repository;
import com.sathavahana.kalamkari.domain.User;
import org.springframework.data.repository.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Set;
public interface UserRoleRepository extends Repository<User,Long> {
 @Query("select r.name from UserRoleLink x join x.role r where x.user.id = :userId") Set<String> roleNames(@Param("userId") Long userId);
 @Query("select p.name from UserRoleLink x join x.role r join RolePermissionLink rp on rp.role = r join rp.permission p where x.user.id = :userId") Set<String> permissionNames(@Param("userId") Long userId);
}
