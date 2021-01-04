package com.budgetingui.budgettool.model.points;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class PointMapping {

    Map<String, Double> pointsMap;
    //Tim Tasks
    public static double RUN = 0.5;
    public static double PUSHUPS = 0.5;

    //Loz
    public static double GYM = 1;

    //Shared
    public static double TEN_K_STEPS = 1;
    public static double NO_DRINKING = 1;
    public static double NO_DRINKING_WEEKEND = 2;
    public static double DRINKING_SUNDAY = -1;






    public PointMapping () {
        pointsMap = new HashMap <String, Double>();
        pointsMap.put("RUN", RUN);
        pointsMap.put("PUSHUPS", PUSHUPS);
        pointsMap.put("GYM", GYM);
        pointsMap.put("TEN_K_STEPS", TEN_K_STEPS);
        pointsMap.put("NO_DRINKING", NO_DRINKING);
        pointsMap.put("NO_DRINKING_WEEKEND", NO_DRINKING_WEEKEND);
        pointsMap.put("DRINKING_SUNDAY", DRINKING_SUNDAY);
    }

    public double getPointValue(String activityName, Date activityDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(activityDate);
//        calendar.get
        if(activityName.equals("NO_DRINKING")) {
            //Not drinking on a Friday and Saturday is double points
            if(calendar.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY || calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY) {
                return pointsMap.get("NO_DRINKING_WEEKEND");
            }
            //Drinking on a Sunday is -1 point
            else if(calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY) {
                return pointsMap.get("DRINKING_SUNDAY");
            }
            else {
                return pointsMap.get(activityName);
            }
        }
        //Otherwise this is a standard activity points path
        else {
            return pointsMap.get(activityName);
        }
    }
}
