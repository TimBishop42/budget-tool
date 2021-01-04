package com.budgetingui.budgettool.config;

import com.budgetingui.budgettool.firebase.auth.FirebaseAuthenticationProvider;
import com.budgetingui.budgettool.firebase.filter.FirebaseFilter;
import com.budgetingui.budgettool.service.FirebaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.annotation.Resource;

@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    public static class Roles {
        public static final String ANONYMOUS = "ANONYMOUS";
        public static final String USER = "USER";
        static public final String ADMIN = "ADMIN";
        static public final String TEST = "TEST";

        private static final String ROLE_ = "ROLE_";
        public static final String ROLE_ANONYMOUS = ROLE_ + ANONYMOUS;
        public static final String ROLE_USER = ROLE_ + USER;
        static public final String ROLE_ADMIN = ROLE_ + ADMIN;
        static public final String ROLE_TEST = ROLE_ + TEST;
    }

    @Order(Ordered.HIGHEST_PRECEDENCE)
    @Configuration
    @Profile("!local")
    protected static class AuthenticationSecurity extends GlobalAuthenticationConfigurerAdapter {

        @Resource
        private UserDetailsService userService;

//        @Value("${rs.pscode.firebase.enabled}")
        private Boolean firebaseEnabled = true;

        @Autowired
        private FirebaseAuthenticationProvider firebaseProvider;

        @Override
        public void init(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userService);
            if (firebaseEnabled) {
                auth.authenticationProvider(firebaseProvider);
            }
        }
    }

    @Configuration
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    @Profile("!local-api")
    protected static class ApplicationSecurity extends WebSecurityConfigurerAdapter {

//        @Value("${rs.pscode.firebase.enabled}")
        private Boolean firebaseEnabled = true;

        private static final Logger logger = LoggerFactory.getLogger(ApplicationSecurity.class);

        @Override
        public void configure(WebSecurity web) {
            web.ignoring().antMatchers("/v2/api-docs", "/configuration/ui", "/swagger-resources",
                    "/configuration/security", "/swagger-ui.html", "/webjars/**", "/v2/swagger.json");
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            if (firebaseEnabled) {
                http.addFilterBefore(tokenAuthorizationFilter(), BasicAuthenticationFilter.class).authorizeRequests()//
                        .antMatchers("/").permitAll() //For returning static content - maybe unsafe?
                        .antMatchers("/tool/api/getTransactions").hasAnyRole(Roles.ADMIN, Roles.USER)
                        .antMatchers("/tool/api/getRoles").permitAll()
                        .antMatchers("/tool/api/saveTransaction").hasAnyRole(Roles.ADMIN, Roles.USER)
                        .antMatchers("/tool/admin/**").hasAnyRole(Roles.ADMIN)//
                        .antMatchers("/tool/api/fitness/**").hasAnyRole(Roles.ADMIN, Roles.USER)
                        .antMatchers("/health/**").hasAnyRole(Roles.ADMIN)//
                        .antMatchers("/h2-console").permitAll()
//                        .antMatchers("/**").denyAll()//
                        .and().csrf().disable()// h2
                        .anonymous().authorities(Roles.ROLE_ANONYMOUS);
                http.csrf().disable();
                http.headers().frameOptions().sameOrigin(); //for h2-db
            } else {
                http.httpBasic().and().authorizeRequests()//

                        .antMatchers("/api/open/**").hasAnyRole(Roles.ANONYMOUS)//
                        .antMatchers("/api/client/**").hasRole(Roles.USER)//
                        .antMatchers("/api/admin/**").hasAnyRole(Roles.ADMIN)//
                        .antMatchers("/health/**").hasAnyRole(Roles.ADMIN)//
                        .antMatchers("/**").denyAll()//
                        .and().csrf().disable()//
                        .anonymous().authorities(Roles.ROLE_ANONYMOUS);//
            }
        }

        @Autowired(required = false)
        private FirebaseService firebaseService;

        private FirebaseFilter tokenAuthorizationFilter() {
            return new FirebaseFilter(firebaseService);
        }

    }
}
