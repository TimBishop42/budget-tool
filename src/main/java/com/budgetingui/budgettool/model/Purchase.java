package com.budgetingui.budgettool.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
public class Purchase {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private BigDecimal cost;

    @Temporal(TemporalType.DATE)
    private Date purchaseDate;

    public void setPurchaseDate(String dateString) {
        try {
            this.purchaseDate = new SimpleDateFormat("ddMMyyyy").parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        };
    }

}
