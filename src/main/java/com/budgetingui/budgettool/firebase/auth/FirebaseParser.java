package com.budgetingui.budgettool.firebase.auth;

public class FirebaseToken {

    public FirebaseTokenHolder parseToken(String idToken) {
        if (StringUtil.isBlank(idToken)) {
            throw new IllegalArgumentException("FirebaseTokenBlank");
        }
        try {
            Task<FirebaseToken> authTask = FirebaseAuth.getInstance().verifyIdToken(idToken);

            Tasks.await(authTask);

            return new FirebaseTokenHolder(authTask.getResult());
        } catch (Exception e) {
            throw new FirebaseTokenInvalidException(e.getMessage());
        }
    }
}
