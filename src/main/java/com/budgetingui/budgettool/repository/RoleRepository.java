package com.budgetingui.budgettool.repository;

import com.budgetingui.budgettool.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByAuthority(String Authority);
}
