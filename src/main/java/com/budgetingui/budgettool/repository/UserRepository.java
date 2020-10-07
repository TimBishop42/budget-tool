package com.budgetingui.budgettool.repository;

import com.budgetingui.budgettool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
