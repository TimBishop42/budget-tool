package com.budgetingui.budgettool.service;


import com.budgetingui.budgettool.model.Purchase;
import com.budgetingui.budgettool.repository.PurchaseRepository;
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
}
