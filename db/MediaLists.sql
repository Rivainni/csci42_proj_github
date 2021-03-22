CREATE DATABASE medialists;
USE medialists;

CREATE TABLE user(
    username VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    pwd VARCHAR(255) NOT NULL CHECK (pwd REGEXP '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
    login_status INT NOT NULL DEFAULT 0 CHECK (login_status=0 OR login_status=1)
);

CREATE TABLE media(
    media_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    tmdb_id INT NOT NULL,
    media_type CHAR(1) NOT NULL CHECK (media_type='M' OR media_type='T' OR media_type='E'),
    season_no INT NOT NULL DEFAULT -1,
    episode_no INT NOT NULL DEFAULT -1
);

CREATE TABLE comment(
    comment_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    comment_text VARCHAR(255) NOT NULL,
    comment_date DATE NOT NULL,
    like_no INT NOT NULL DEFAULT 0,
    media_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY (media_id) REFERENCES media(media_id) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE
);

CREATE TABLE history(
    history_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (username) references user(username) ON DELETE CASCADE
);

CREATE TABLE media_history(
    history_id INT NOT NULL,
    media_id INT NOT NULL,
    watch_date DATE NOT NULL,
    PRIMARY KEY (history_id, media_id),
    FOREIGN KEY (history_id) REFERENCES history(history_id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(media_id) ON DELETE CASCADE
);

CREATE TABLE list(
    list_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    list_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE
);

CREATE TABLE media_list(
    list_id INT NOT NULL,
    media_id INT NOT NULL,
    PRIMARY KEY (list_id, media_id),
    FOREIGN KEY (list_id) REFERENCES list(list_id) ON DELETE CASCADE,
    FOREIGN KEY (media_id) REFERENCES media(media_id) ON DELETE CASCADE
);

CREATE TABLE rating(
    rating_id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    score INT NOT NULL CHECK (score>0 AND score<=10),
    rating_date DATE NOT NULL,
    media_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    FOREIGN KEY (media_id) REFERENCES media(media_id) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE
);