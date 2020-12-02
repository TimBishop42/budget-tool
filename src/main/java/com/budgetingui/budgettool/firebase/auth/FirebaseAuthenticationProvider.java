package com.budgetingui.budgettool.firebase.auth;

import com.budgetingui.budgettool.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class FirebaseAuthenticationProvider implements AuthenticationProvider {

    private final static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Resource
    private UserServiceImpl userService;


    public boolean supports(Class<?> authentication) {
        return (FirebaseAuthenticationToken.class.isAssignableFrom(authentication));
    }

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (!supports(authentication.getClass())) {
            return null;
        }

        FirebaseAuthenticationToken authenticationToken = (FirebaseAuthenticationToken) authentication;
        UserDetails details = userService.loadUserByUsername(authenticationToken.getName());
        if (details == null) {
            logger.info("This user does not exist, as they are authenticated, we will create them in our DB without any roles");
            details = userService.saveNewUser(authenticationToken);
        }

        authenticationToken = new FirebaseAuthenticationToken(details, authentication.getCredentials(),
                details.getAuthorities());

        return authenticationToken;
    }
}
