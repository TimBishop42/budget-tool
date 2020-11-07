package com.budgetingui.budgettool.controller;


import com.budgetingui.budgettool.model.Purchase;
import com.budgetingui.budgettool.model.RoleRequest;
import com.budgetingui.budgettool.service.BudgetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/tool/api")
public class BudgetingController {

    private static final Logger logger = LoggerFactory.getLogger(BudgetingController.class);

    @Resource
    private BudgetService budgetService;


    @RequestMapping(method = RequestMethod.POST, value = "/saveTransaction")
    public ResponseEntity<?> saveTransactions (@RequestBody Purchase purchase) {
        return budgetService.saveNewTransaction(purchase);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/getTransactions")
    public ResponseEntity<?> getTransactions () {
        logger.info("Retrieving Transaction History");
        return new ResponseEntity<List<Purchase>>(budgetService.getAllTransactions(), HttpStatus.OK);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/getRoles")
    public ResponseEntity<?> getRoles () {
        logger.info("Getting user roles for user");
        return new ResponseEntity<>(budgetService.getUserRoles(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/admin/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        logger.info("Getting a list of all users for the user admin function");
        return new ResponseEntity<>(budgetService.getAllUsers(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/admin/saveNewRole")
    public ResponseEntity<?> saveNewRole(@RequestBody RoleRequest role, Principal principal) {
        logger.info("Attempting to save a new role: {}", role);
        return budgetService.saveNewRole(role.getUserId(), role.getRequestedRole());
    }

}
