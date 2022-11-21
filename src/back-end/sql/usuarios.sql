CREATE DATABASE users;
USE users;

CREATE TABLE user (
    id int auto_increment NOT NULL,
    email varchar(255) UNIQUE not null,
    user_name varchar(255) not null,
    password_hash varchar(255) not null,
) ENGINE='InnoDB';

INSERT INTO user (email, user_name, password_hash) VALUES ("admin@admin.com","admin", admin);