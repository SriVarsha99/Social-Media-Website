use  project_social_media;

delimiter $$

CREATE TRIGGER update_likes_count
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
declare l_count INT;
Select count(*) into l_count
from likes
where likes.post_id = new.post_id;
Update posts
set posts.like_count= l_count
where new.post_id= posts.post_id;
END; $$

delimiter $$

CREATE TRIGGER update_likes_count2
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
declare l_count INT;
Select count(*) into l_count
from likes
where likes.post_id = old.post_id;
Update posts
set posts.like_count= l_count
where old.post_id= posts.post_id;
END; $$


CREATE TRIGGER update_comments_count
AFTER INSERT ON comments
FOR EACH ROW
BEGIN
declare c_count INT;
Select count(*) into c_count
from comments
where comments.post_id = new.post_id;
Update posts
set posts.comment_count = c_count
where  new.post_id = posts.post_id;
END; $$

CREATE TRIGGER update_friends_count
AFTER UPDATE ON friends
FOR EACH ROW
BEGIN 
	IF new.status = 'Request Accepted' THEN
        Update user
		SET user.friend_count = (Select count(*)
								 from friends
                                 where new.user_id_1 = friends.user_id_1 and status = 'Request Accepted')
		WHERE user.user_id = new.user_id_1;
        Update user
		SET user.friend_count =(Select count(*)
								 from friends
                                 where new.user_id_2 = friends.user_id_2 and status = 'Request Accepted')
		WHERE user.user_id = new.user_id_2;
	END IF;
END; $$

CREATE TRIGGER update_age
BEFORE INSERT ON user
FOR EACH ROW
BEGIN
     SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.dob, CURDATE());
END;$$
delimiter $$; 





