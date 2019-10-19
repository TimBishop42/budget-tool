package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.model.Purchase;
import com.budgetingui.budgettool.repository.PurchaseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class BudgetService {

    @Resource
    private PurchaseRepository purchaseRepository;

    public ResponseEntity<?> saveNewTransaction(Purchase purchase) {
        Purchase result = purchaseRepository.save(purchase);
        if(result != null) {
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
    }
}
