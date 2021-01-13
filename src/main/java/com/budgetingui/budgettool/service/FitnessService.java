package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.dao.ActivityDao;
import com.budgetingui.budgettool.firebase.auth.FirebaseAuthenticationToken;
import com.budgetingui.budgettool.model.Activity;
import com.budgetingui.budgettool.model.points.PointMapping;
import com.budgetingui.budgettool.model.request.ActivityRequest;
import com.budgetingui.budgettool.model.response.ActivitySummary;
import com.budgetingui.budgettool.repository.FitnessActivityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

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
        List<Activity> activityList = fitnessActivityRepository.findAll();
        if(activityList.size() == 0) {
            return new ResponseEntity<>("No Activities to display", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("Found {} activities", activityList.size());
        return new ResponseEntity<>(sortAndAggregateResponse(activityList), HttpStatus.OK);
    }

    private List<List<ActivitySummary>> sortAndAggregateResponse(List<Activity> activityList) {
        List<ActivitySummary> timList;
    }
}
