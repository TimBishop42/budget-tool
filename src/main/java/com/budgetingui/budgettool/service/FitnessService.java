package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.dao.ActivityDao;
import com.budgetingui.budgettool.firebase.auth.FirebaseAuthenticationToken;
import com.budgetingui.budgettool.model.Activity;
import com.budgetingui.budgettool.model.points.PointMapping;
import com.budgetingui.budgettool.model.request.ActivityRequest;
import com.budgetingui.budgettool.model.response.ActivitySummary;
import com.budgetingui.budgettool.model.response.AggregateActivity;
import com.budgetingui.budgettool.repository.FitnessActivityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.security.Principal;
import java.util.*;

@Service
public class FitnessService {

    @Resource
    private FitnessActivityRepository fitnessActivityRepository;

    @Resource
    private ActivityDao activityDao;

    public PointMapping pointMapping = new PointMapping();

    private static final Logger logger = LoggerFactory.getLogger(FitnessService.class);

    public ResponseEntity<?> saveUserActivity(ActivityRequest activityRequest, Principal principal) {
        if(activityRequest.getActivityNames() == null) {
            return new ResponseEntity<>("You cannot attempt to save an empty list of activities!", HttpStatus.BAD_REQUEST);
        }
        List<Activity> activities = null;
        try {
            activities = getActivitiesFromRequest(activityRequest, (FirebaseAuthenticationToken) principal);
        }
        //Todo: detirmine what exception we want to catch
        catch (Exception e) {
            logger.error("Failed to unmarshal list of activities from request: {}", activityRequest);
            return new ResponseEntity<>("Failed to unmarshal list of activities from request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            List<Activity> activityResponse = fitnessActivityRepository.saveAll(activities);
            return new ResponseEntity<>("Successfully saved all activities", HttpStatus.OK);
        }
        catch (Exception e) {
            logger.error("We had an issue saving the list of activities to the DB. List: {}", activities);
            logger.error("Exception: {}", e);
            return new ResponseEntity<>("We had an issue saving the list of activities to the DB", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    private List<Activity> getActivitiesFromRequest(ActivityRequest activityRequest, FirebaseAuthenticationToken principal) {
        List<Activity> activities = new ArrayList<Activity>();
        for(String activityName : activityRequest.getActivityNames()) {
            activities.add(new Activity()
                    .setActivityDate(activityRequest.getActivityDate())
                    .setActivityName(activityName)
                    .setActivityUser(principal.getName())
                    .setPoints(pointMapping.getPointValue(activityName, activityRequest.getActivityDate())));
        }
        return activities;
    }

    public ResponseEntity<?> getAcivitySummary() {
        try {
            logger.info("Trying to request activities");
            List<ActivitySummary> activitySummaries = activityDao.findActivitySummarries();
            for(ActivitySummary activitySummary : activitySummaries) {
                logger.info("Found activity summary to return to UI: {}", activitySummary);
            }
            return new ResponseEntity<>(activityDao.findActivitySummarries(), HttpStatus.OK) ;
        }
        catch(DataAccessException e) {
            logger.error("Unable to retrieve activity summary. Cause: {}", e.getCause());
            return new ResponseEntity<>("Unable to retrieve activity summary", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getAggregateActivities() {
        logger.info("Retrieving activities");
        List<AggregateActivity> activityList = activityDao.findAggregateActivities();
        if(activityList.size() == 0) {
            return new ResponseEntity<>("No Activities to display", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("Found {} activities", activityList.size());
        return new ResponseEntity<>(splitActivities(activityList), HttpStatus.OK);
    }

    private List<List<AggregateActivity>> splitActivities(List<AggregateActivity> activityList) {
        List<AggregateActivity> timList = new ArrayList<>();
        List<AggregateActivity> lozList = new ArrayList<>();
        List<List<AggregateActivity>> recombinedList = new ArrayList<>();
        for(AggregateActivity activity : activityList) {
            if(activity.userName.equals("Tim")) {
                timList.add(activity);
            }
            else if(activity.userName.equals("Loz")) {
                lozList.add(activity);
            }
        }
        recombinedList.add(timList);
        recombinedList.add(lozList);
        recombinedList.add(sumActivitiesForUser(timList));
        recombinedList.add(sumActivitiesForUser(lozList));
        return recombinedList;
    }

    public List<AggregateActivity> sumActivitiesForUser(List<AggregateActivity> userList) {
        double rollingSummary = 0;
        List<AggregateActivity> summedList = new ArrayList<>();
        for(AggregateActivity activity: userList) {
            rollingSummary += activity.aggregatePoints;
            summedList.add(new AggregateActivity().setAggregatePoints(rollingSummary).setSummaryDate(activity.summaryDate).setUserName(activity.getUserName()));
        }
        return summedList;
    }

}
