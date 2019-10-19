package com.budgetingui.budgettool.repository;

import com.budgetingui.budgettool.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository <Purchase, Long> {

}
