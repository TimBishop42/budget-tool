package com.budgetingui.budgettool.dao.mapper;

import com.budgetingui.budgettool.model.response.ActivitySummary;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AcivitySummaryRowMapper implements RowMapper<ActivitySummary> {

    private static final String POINTS_COLUMN = "points";
    private static final String USERNAME_COLUMN = "EMAIL_";

    @Override
    public ActivitySummary mapRow(ResultSet resultSet, int i) throws SQLException {
        return ActivitySummary.builder()
                .points(resultSet.getDouble(POINTS_COLUMN))
                .username(resultSet.getString(USERNAME_COLUMN)).build();
    }
}

