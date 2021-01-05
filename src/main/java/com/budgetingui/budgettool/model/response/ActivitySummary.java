package com.budgetingui.budgettool.model.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Setter
@Getter
@ToString
public class ActivitySummary {

    String username;
    double points;
}
