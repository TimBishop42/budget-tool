package com.budgetingui.budgettool.service;


import com.budgetingui.budgettool.firebase.auth.FirebaseAuthenticationToken;
import com.budgetingui.budgettool.model.Purchase;
import com.budgetingui.budgettool.model.Role;
import com.budgetingui.budgettool.model.User;
import com.budgetingui.budgettool.repository.PurchaseRepository;
import com.budgetingui.budgettool.repository.RoleRepository;
import com.budgetingui.budgettool.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.security.Principal;
import java.util.List;


@Service
public class BudgetService {


    private static final Logger logger = LoggerFactory.getLogger(BudgetService.class);

    @Resource
    private PurchaseRepository purchaseRepository;

    @Resource
    private UserRepository userRepository;

    @Resource
    private RoleRepository roleRepository;

    public ResponseEntity<?> saveNewTransaction(Purchase purchase) {
        Purchase result = purchaseRepository.save(purchase);
        logger.info("Saved new record: {}", result.toString());
        if(result != null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    public List <Purchase> getAllTransactions() {
        logger.info("Getting all transactions");
        List <Purchase> purchases = purchaseRepository.findAll();
        logger.info("Retrieved: {}", purchases);
        return purchases;
    }

    public List<SimpleGrantedAuthority> getUserRoles(Principal principal) {
        logger.info("Using principal resolved form authenticated endpoint: {}", principal);
        FirebaseAuthenticationToken auth = (FirebaseAuthenticationToken)principal;
        return (List)auth.getAuthorities();
    }

    public List<User> getAllUsers() {
        List <User> users = userRepository.findAll();
        logger.info("Found list of all users of size: {}", users.size());
        return users;
    }

    public ResponseEntity<?> saveNewRole(Long userId, String role) {
        if (role == null) {
            return new ResponseEntity<>("Cannot Request an empty role", HttpStatus.BAD_REQUEST);
        }

        //Check if user already has this role
        if(userHasRole(userId, role)) {
            return new ResponseEntity<>("User already has this requested role", HttpStatus.NO_CONTENT);
        }
        Role newRole = new Role(userId, role);

        try {
            roleRepository.save(newRole);
            logger.info("Successfully saved new role for userId :{}", userId);
        }
        catch(Exception e) {
            logger.info("We got an exception while trying to save a new role: {}", e.getMessage());
        }
        logger.info("Now that we have performed a user update, return all users");
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    private boolean userHasRole(Long userId, String role) {
        Role userRole  = roleRepository.findByUserIdAndAuthority(userId, role);
        if(userRole == null) {
            return false;
        }
        else {
            logger.warn("User {} already has role {} - will not grant", userId, role);
            return true;
        }
    }

    public ResponseEntity<?> saveNewUser(Principal principal) {
        FirebaseAuthenticationToken auth = (FirebaseAuthenticationToken)principal;
        User user = new User(auth.getName(), "fake@email");
        try {
           user = userRepository.save(user);
        }
        catch(Exception e) {
            logger.error("Unable to save new user");
            return new ResponseEntity<>("Unable to save user, error :"+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
