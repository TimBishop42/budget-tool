package com.budgetingui.budgettool.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date activityDate;
    private String activityName;
    private double points;
    private String activityUser;

    public Activity setActivityDate(Date activityDate){
        this.activityDate = activityDate;
        return this;
    }

    public Activity setActivityName(String activityName){
        this.activityName = activityName;
        return this;
    }

    public Activity setActivityUser(String activityUser){
        this.activityUser = activityUser;
        return this;
    }

    public Activity setPoints(Double points){
        this.points = points;
        return this;
    }


}
