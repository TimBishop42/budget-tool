--Not required - H2 generates a database automatically from @Entity

--DROP TABLE IF EXISTS PURCHASES;
--
--CREATE TABLE PURCHASES (
--  id INT AUTO_INCREMENT  PRIMARY KEY,
--  name VARCHAR(50) NOT NULL,
--  description VARCHAR(250) NOT NULL,
--  cost DECIMAL DEFAULT NULL
--
--);
INSERT INTO PURCHASE (id, name, description, category, cost, purchase_date) VALUES(100, 'purchase1', 'this was a cost for something', 'Alcohol',100.00, '2012-09-17');
-- INSERT INTO PURCHASE (id, name, description, category, cost, purchase_date) VALUES(2, 'purchase2', 'this was a cost for something', 'Alcohol', 150.00, '2012-09-17');
-- INSERT INTO PURCHASE (id, name, description, category, cost, purchase_date) VALUES(3, 'purchase3', 'this was a cost for something', 'Alcohol', 200.00, '2012-09-17');
-- INSERT INTO PURCHASE (id, name, description, category, cost, purchase_date) VALUES(4, 'purchase4', 'this was a cost for something', 'Alcohol', 300.00, '2012-09-17');

INSERT INTO USER (userId, username, password, email) VALUES (1, '8BnRCy2pkTPn0PVYwlW2rpNLi6J2', '', 'bishoptim453@gmail.com');
INSERT INTO ROLE (id, authority) values (1, 'user');