
CREATE TABLE purchase (
id INT AUTO_INCREMENT  PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(250) NOT NULL,
category VARCHAR(250) NOT NULL,
cost DECIMAL DEFAULT NULL,
purchase_date datetime null
);
CREATE  TABLE user(
    ID_ INT AUTO_INCREMENT  PRIMARY KEY,
    EMAIL_ VARCHAR(255) NOT NULL,
    PASSWORD_ VARCHAR(255) NOT NULL,
    USERNAME_ VARCHAR(255) NOT NULL
);

CREATE TABLE role(
    ID_ BIGINT AUTO_INCREMENT  PRIMARY KEY,
    AUTHORITY_ VARCHAR(255)
);

INSERT INTO purchase (id, name, description, category, cost, purchase_date) VALUES(100, 'purchase1', 'this was a cost for something', 'Alcohol',100.00, '2012-09-17');
