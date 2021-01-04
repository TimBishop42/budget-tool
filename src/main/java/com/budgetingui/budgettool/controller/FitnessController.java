package com.budgetingui.budgettool.controller;

import com.budgetingui.budgettool.model.ActivityRequest;
import com.budgetingui.budgettool.service.FitnessService;
import com.budgetingui.budgettool.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.security.Principal;

@RestController
@RequestMapping("/tool/api/fitness")
public class FitnessController {


    private static final Logger logger = LoggerFactory.getLogger(BudgetingController.class);

    @Resource
    private FitnessService fitnessService;

    @Resource
    private UserService userService;

    @RequestMapping(method = RequestMethod.POST, value = "/saveActivities")
    public ResponseEntity<?> saveActivity(@RequestBody ActivityRequest activityRequest, Principal principal) {
        logger.info("Received request to save a new daily activity: {}", activityRequest);
        return fitnessService.saveUserActivity(activityRequest, principal);
    }

    public ResponseEntity<?> retrieveActivityBasedOnUser(Principal principal) {
        //todo impl
        return null;
    }


}
