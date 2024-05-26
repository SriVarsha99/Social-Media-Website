INSERT INTO user(user_id, name, email, dob, username, password) 
VALUES ('111', 'simran', 'sdhawan@scu.edu', '1996-10-21', 'simr', 'password');
INSERT INTO user(user_id, name, email, dob, username, password) 
VALUES ('112', 'sihen', 'sihen@scu.edu', '1996-10-29', 'siha', 'password2');

INSERT INTO user(user_id, name, email, dob, username, password) 
VALUES ('113', 'sihenl', 'sihen2@scu.edu', '1993-10-29', 'sihan3', 'password2');

INSERT INTO friends(user_id_1, user_id_2) 
VALUES ('111', '112');

INSERT INTO friends(user_id_1, user_id_2) 
VALUES ('111', '113');

UPDATE friends
SET status = 'Request Accepted'
Where user_id_1 = '111' and user_id_2 = '112';

UPDATE friends
SET status = 'Request Declined'
Where user_id_1 = '111' and user_id_2 = '113';

INSERT INTO posts( user_id, content)
VALUES ('111', 'Validating timestamp');

INSERT INTO posts(user_id, content)
VALUES('113', 'checking auto increment feature of post_id');

INSERT INTO likes(user_id, post_id)
VALUES('112', '1');

INSERT INTO comments(user_id, post_id, text)
VALUES('113', '2', "Check comment")
