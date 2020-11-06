package com.budgetingui.budgettool.service;


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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collection;
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

    public List<SimpleGrantedAuthority> getUserRoles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Collection<SimpleGrantedAuthority> roles = (Collection<SimpleGrantedAuthority>) auth.getAuthorities();
        return (List)roles;
    }

    public List<User> getAllUsers() {
        List <User> users = userRepository.findAll();
        logger.info("Found list of all users of size: {}", users.size());
        return users;
    }

    public ResponseEntity<?> saveNewRole(String role) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userName = auth.getName();
        Role newRole = new Role();
        newRole.setUserId(1L);
        try {
            roleRepository.save(newRole);
            logger.info("Successfully saved new role for user :{}", userName);
        }
        catch(Exception e) {
            logger.info("We got an exception while trying to save a new role: {}", e.getMessage());
        }
        return new ResponseEntity<>(roleRepository.findByUserId(1L), HttpStatus.OK);

    }
}
