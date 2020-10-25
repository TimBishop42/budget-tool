package com.budgetingui.budgettool.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FirebaseInitialize {

//    @Bean
//    public DatabaseReference firebaseDatabse() {
//        DatabaseReference firebase = FirebaseDatabase.getInstance().getReference();
//        return firebase;
//    }

    @Value("${rs.pscode.firebase.database.url}")
    private String databaseUrl;

    @Value("${rs.pscode.firebase.config.path}")
    private String configPath;

    @PostConstruct
    public void init() {

        /**
         * https://firebase.google.com/docs/server/setup
         *
         * Create service account , download json
         */
        InputStream inputStream = FirebaseInitialize.class.getClassLoader().getResourceAsStream(configPath);

        FirebaseOptions options = null;
        try {
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(inputStream))
                    .setDatabaseUrl(databaseUrl)
                    .build();
        } catch (IOException e) {
            e.printStackTrace();
        }
        FirebaseApp.initializeApp(options);

    }
}

