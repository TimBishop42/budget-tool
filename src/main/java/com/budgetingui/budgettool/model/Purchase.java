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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private String description;
    private String name;
    private BigDecimal cost;

    @Temporal(TemporalType.DATE)
    private Date purchaseDate;

    public void setPurchaseDate(String dateString) {
        if(dateString == null) {
            this.purchaseDate = new Date();
        }
        else {
            try {
                this.purchaseDate = new SimpleDateFormat("ddMMyyyy").parse(dateString);
            } catch (ParseException e) {
                e.printStackTrace();
            };
        }
    }

}
