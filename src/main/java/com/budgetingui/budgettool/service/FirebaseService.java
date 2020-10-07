package com.budgetingui.budgettool.service;

import com.budgetingui.budgettool.firebase.auth.FirebaseTokenHolder;

public interface FirebaseService {

    FirebaseTokenHolder parseToken(String idToken);

}
