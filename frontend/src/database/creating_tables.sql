CREATE TABLE IF NOT EXISTS User (
user_id varchar(20) NOT NULL,
name varchar(60) NOT NULL,
gender varchar(30) DEFAULT NULL,
email varchar(50) NOT NULL,
phone_num char(10) DEFAULT NULL,
address varchar(100) DEFAULT NULL,
dob date NOT NULL,
age INT DEFAULT NULL,
friend_count INT DEFAULT NULL,
username varchar(30) NOT NULL,
password varchar(30) NOT NULL,
PRIMARY KEY (user_id),
UNIQUE(username),
UNIQUE(email),
CONSTRAINT user_ibfk_1 CHECK (gender = 'male' or gender = 'female' or gender = 'transgender' or gender = 'do not define' or gender = null) ,
CONSTRAINT user_ibfk_2 CHECK(age >= 16)
) ;

CREATE TABLE IF NOT EXISTS Posts (
post_id INT AUTO_INCREMENT,
user_id varchar(20) NOT NULL,
content varchar(1000) DEFAULT NULL,
post_time timestamp DEFAULT CURRENT_TIMESTAMP,
like_count int DEFAULT NULL,
comment_count int DEFAULT NULL,
PRIMARY KEY (post_id),
CONSTRAINT post_ibfk_1 FOREIGN KEY (user_id) REFERENCES User (user_id) 
ON DELETE CASCADE
ON UPDATE CASCADE);



CREATE TABLE IF NOT EXISTS friends (
    user_id_1 VARCHAR(20) ,
    user_id_2 VARCHAR(20) ,
    status VARCHAR(20) DEFAULT 'Request Sent',
    PRIMARY KEY (user_id_1, user_id_2),
    CONSTRAINT friends_ibfk_1  FOREIGN KEY (user_id_1) REFERENCES User (user_id) 
    ON DELETE CASCADE
	ON UPDATE CASCADE ,
    CONSTRAINT friends_ibfk_2  FOREIGN KEY (user_id_2) REFERENCES User (user_id)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    CONSTRAINT friends_ibfk_3 CHECK(status = 'Request Accepted' or status ='Request Sent' or status = 'Request Declined' )
);

CREATE TABLE IF NOT EXISTS publishes (
	user_id VARCHAR (20) ,
    post_id INT,
    PRIMARY KEY (post_id, user_id),
	CONSTRAINT publish_ibfk_1 FOREIGN KEY (user_id) REFERENCES User (user_id)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    CONSTRAINT publish_ibfk_2 FOREIGN KEY (post_id) REFERENCES Posts (post_id)
    ON DELETE CASCADE
	ON UPDATE CASCADE
) ;

CREATE TABLE IF NOT EXISTS likes (
	user_id VARCHAR(20),
    post_id INT,
    PRIMARY KEY (post_id, user_id),
    CONSTRAINT likes_ibfk_1 FOREIGN KEY (user_id) REFERENCES User (user_id)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    CONSTRAINT likes_ibfk_2 FOREIGN KEY (post_id) REFERENCES Posts (post_id)
    ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
	user_id VARCHAR(20),
    post_id INT,
    text VARCHAR(300) NOT NULL,
    datetime timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id),
    CONSTRAINT comments_ibfk_1 FOREIGN KEY (user_id) REFERENCES User (user_id)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    CONSTRAINT commments_ibfk_2 FOREIGN KEY (post_id) REFERENCES Posts (post_id)
    ON DELETE CASCADE
	ON UPDATE CASCADE
);

