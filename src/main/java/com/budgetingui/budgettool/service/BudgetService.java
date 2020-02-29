package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.model.Purchase;
import com.budgetingui.budgettool.repository.PurchaseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.logging.Logger;


@Service
public class BudgetService {

    @Resource
    private PurchaseRepository purchaseRepository;

    public ResponseEntity<?> saveNewTransaction(Purchase purchase) {
        Purchase result = purchaseRepository.save(purchase);
        if(result != null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    public List <Purchase> getAllTransactions() {
        return purchaseRepository.findAll();
    }
}
