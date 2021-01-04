package com.budgetingui.budgettool.repository;

import com.budgetingui.budgettool.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FitnessActivityRepository extends JpaRepository<Activity, Long> {
}
