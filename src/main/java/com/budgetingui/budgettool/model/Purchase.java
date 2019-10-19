package com.budgetingui.budgettool.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
@Data
public class Purchase {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private BigDecimal cost;

}
