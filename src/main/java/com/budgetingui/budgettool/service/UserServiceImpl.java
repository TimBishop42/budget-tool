package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.config.SecurityConfig;
import com.budgetingui.budgettool.firebase.auth.FirebaseAuthenticationToken;
import com.budgetingui.budgettool.firebase.auth.RegisterUserInit;
import com.budgetingui.budgettool.model.Role;
import com.budgetingui.budgettool.model.User;
import com.budgetingui.budgettool.repository.RoleRepository;
import com.budgetingui.budgettool.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.security.Principal;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    public final static String NAME = "UserService";
    private final static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userDao;

    @Autowired
    private RoleRepository roleRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails userDetails = userDao.findByUsername(username);
        if (userDetails == null) {
            logger.info("This user does not exist, as they are authenticated, we will create them in our DB without any roles");
            saveNewUser()

        }

        Set<GrantedAuthority> grantedAuthorities = new HashSet<GrantedAuthority>();
        for (GrantedAuthority role : userDetails.getAuthorities()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getAuthority()));
        }

        return new org.springframework.security.core.userdetails.User(userDetails.getUsername(),
                userDetails.getPassword(), userDetails.getAuthorities());
    }

    private ResponseEntity<?> saveNewUser(Principal principal) {
        FirebaseAuthenticationToken auth = (FirebaseAuthenticationToken)principal;
        User user = new User(auth.getName(), "fake@email");
        try {
            user = userDao.save(user);
        }
        catch(Exception e) {
            logger.error("Unable to save new user");
            return new ResponseEntity<>("Unable to save user, error :"+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Override
    @Transactional
    @Secured(value = SecurityConfig.Roles.ROLE_ANONYMOUS)
    public User registerUser(RegisterUserInit init) {

        User userLoaded = userDao.findByUsername(init.getUserName());

        if (userLoaded == null) {
            User user = new User();
            user.setUsername(init.getUserName());
            user.setEmail(init.getEmail());

            user.setAuthorities(getUserRoles());
            // TODO firebase users should not be able to login via username and
            // password so for now generation of password is OK
            user.setPassword(UUID.randomUUID().toString());
            userDao.save(user);
            logger.info("registerUser -> user created");
            return user;
        } else {
            logger.info("registerUser -> user exists");
            return userLoaded;
        }
    }

    @PostConstruct
    public void init() {

        //If there are no users in the DB - set some default users
        if (userDao.count() == 0) {
            User adminEntity = new User();
            adminEntity.setUsername("8BnRCy2pkTPn0PVYwlW2rpNLi6J2");
            adminEntity.setPassword("fakePassword");
            adminEntity.setEmail("bishoptim453@gmail.com");

            adminEntity.setAuthorities(getAdminRoles());
            userDao.save(adminEntity);

            User user = new User();
            user.setUsername("user1");
            user.setPassword("fakePassword");
            user.setEmail("laurenjohnson42@gmail.com");
//            user.setAuthorities(getUserRoles());
            user.setAuthorities(getUserRoles());

            userDao.save(user);
        }
    }

    private List<Role> getAdminRoles() {
        return Collections.singletonList(getRole(SecurityConfig.Roles.ROLE_ADMIN));
    }

    private List<Role> getUserRoles() {
        return Collections.singletonList(getRole(SecurityConfig.Roles.ROLE_USER));
    }

    /**
     * Get or create role
     *
     * @param authority
     * @return
     */
    private Role getRole(String authority) {
        return new Role(authority);
    }
}
