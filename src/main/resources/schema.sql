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
    ID_ INT AUTO_INCREMENT  PRIMARY KEY,
    AUTHORITY_ VARCHAR(255),
    USERID_ INT,
    constraint fk_authorities_user foreign key(USERID_) references user(ID_)
);

CREATE TABLE activity (
id INT AUTO_INCREMENT  PRIMARY KEY,
activity_name VARCHAR(50) NOT NULL,
points FLOAT NOT NULL,
activity_user VARCHAR(250) NOT NULL,
activity_date datetime not null
);

INSERT INTO purchase (id, name, description, category, cost, purchase_date) VALUES(100, 'purchase1', 'this was a cost for something', 'Alcohol',100.00, '2012-09-17');
