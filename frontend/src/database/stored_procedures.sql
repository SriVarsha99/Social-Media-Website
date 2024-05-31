use  project_social_media;

DELIMITER $$

CREATE PROCEDURE update_user_age(user_id INT)
BEGIN
    UPDATE user
    SET age = TIMESTAMPDIFF(YEAR, dob, CURDATE())
    WHERE user_id = user_id;
END$$

DELIMITER ;