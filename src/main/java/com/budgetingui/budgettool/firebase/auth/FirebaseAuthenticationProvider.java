package com.budgetingui.budgettool.firebase.auth;

import com.budgetingui.budgettool.exception.FirebaseUserNotExistsException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class FirebaseAuthenticationProvider implements AuthenticationProvider {

    @Resource
    UserDetailsService userDetailsService;


    public boolean supports(Class<?> authentication) {
        return (FirebaseAuthenticationToken.class.isAssignableFrom(authentication));
    }

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (!supports(authentication.getClass())) {
            return null;
        }

        FirebaseAuthenticationToken authenticationToken = (FirebaseAuthenticationToken) authentication;
        UserDetails details = userDetailsService.loadUserByUsername(authenticationToken.getName());
        if (details == null) {
            throw new FirebaseUserNotExistsException();
        }

        authenticationToken = new FirebaseAuthenticationToken(details, authentication.getCredentials(),
                details.getAuthorities());

        return authenticationToken;
    }
}
