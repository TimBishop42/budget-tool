package com.budgetingui.budgettool.model.response;


import lombok.*;

import java.util.Date;


@Data
public class AggregateActivity {

    public String userName;
    public double aggregatePoints;
    public Date summaryDate;

    private void setUserFriendlyUsername (String userName) {
        if(userName.equals("cr8NLpuIukclBpc9Ecol455zSQa2")) {
            this.userName = "Loz";
        }
        else if(userName.equals("8BnRCy2pkTPn0PVYwlW2rpNLi6J2")) {
            this.userName = "Tim";
        }
    }

    public AggregateActivity setUserName (String userName) {
        setUserFriendlyUsername(userName);
        return this;
    }

    public AggregateActivity setAggregatePoints (double points) {
        this.aggregatePoints = points;
        return this;
    }

    public AggregateActivity setSummaryDate(Date date) {
        this.summaryDate = date;
        return this;
    }
}
