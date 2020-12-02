package com.budgetingui.budgettool.repository;

import com.budgetingui.budgettool.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByAuthority(String Authority);
    List<Role> findByUserId(Long userId);
    Role findByUserIdAndAuthority (Long userId, String authority);
}
