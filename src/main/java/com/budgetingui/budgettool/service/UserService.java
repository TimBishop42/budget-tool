package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.model.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserDetailsService extends UserDetailsService {

    UserEntity registerUser(RegisterUserInit init);

}
