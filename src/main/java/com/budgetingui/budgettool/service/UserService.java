package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.firebase.auth.RegisterUserInit;
import com.budgetingui.budgettool.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User registerUser(RegisterUserInit init);

}
