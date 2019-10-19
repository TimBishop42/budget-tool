package com.budgetingui.budgettool.controller;


import com.budgetingui.budgettool.model.Purchase;
import com.budgetingui.budgettool.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/tool/api")
public class budgetingController {

    @Resource
    private BudgetService budgetService;


    @RequestMapping(method = RequestMethod.POST, value = "/saveTransacion")
    public ResponseEntity<?> saveTransactions (@RequestBody Purchase purchase) {
        return budgetService.saveNewTransaction(purchase);
    }
}
