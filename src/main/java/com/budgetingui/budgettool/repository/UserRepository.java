package com.budgetingui.budgettool.repository;

import com.budgetingui.budgettool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
        //Will have to tinker with the model a bit to enable jpin here
//    @Query("select * from user u, role r where u.ID_ = r.USERID_ order by u.ID_, r.AUTHORITY_")
//    List<User> findAllOrderedByUserIDAndRoleName();
}
