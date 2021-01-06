package com.budgetingui.budgettool.dao;

import com.budgetingui.budgettool.model.response.ActivitySummary;
import com.budgetingui.budgettool.service.BudgetService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ActivityDao {

    private static final Logger logger = LoggerFactory.getLogger(BudgetService.class);

    private static final String SQL_ACTIVITY_SUMMARY =
            "select u.EMAIL_, sum(a.points) as points from activity a, user u" +
            " where a.activity_user = u.USERNAME_" +
                    " group by u.EMAIL_";

    private static final String POINTS_COLUMN = "points";
    private static final String USERNAME_COLUMN = "EMAIL_";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ActivitySummary> findActivitySummarries() {
        return jdbcTemplate.query(SQL_ACTIVITY_SUMMARY, (resultSet, rowNum) -> ActivitySummary.builder()
               .points(resultSet.getDouble(POINTS_COLUMN))
               .username(resultSet.getString(USERNAME_COLUMN)).build());
    }


}