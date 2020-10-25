package com.budgetingui.budgettool.firebase.auth;

import com.budgetingui.budgettool.exception.FirebaseTokenInvalidException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.util.StringUtils;

public class FirebaseParser {

    public FirebaseTokenHolder parseToken(String idToken) throws FirebaseTokenInvalidException {
        if (StringUtils.isEmpty(idToken)) {
            throw new IllegalArgumentException("FirebaseTokenBlank");
        }
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);


            return new FirebaseTokenHolder(decodedToken);
        } catch (Exception e) {
            throw new FirebaseTokenInvalidException(e.getMessage());
        }
    }
}
