package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.exception.FirebaseTokenInvalidException;
import com.budgetingui.budgettool.firebase.auth.FirebaseParser;
import com.budgetingui.budgettool.firebase.auth.FirebaseTokenHolder;
import org.springframework.stereotype.Service;

@Service
public class FirebaseServiceImpl implements FirebaseService {
    @Override
    public FirebaseTokenHolder parseToken(String firebaseToken) {
        try {
            return new FirebaseParser().parseToken(firebaseToken);
        } catch (FirebaseTokenInvalidException e) {
            e.printStackTrace();
            return null;
        }
    }
}

