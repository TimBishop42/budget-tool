package com.budgetingui.budgettool.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ActivityRequest {

    private Date activityDate;
    private List<String> activityNames;
//    private float points;
//    private String activityUser;
}
