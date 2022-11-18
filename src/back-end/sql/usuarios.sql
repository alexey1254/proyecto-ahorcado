CREATE DATABASE users;
USE users;

CREATE TABLE user (
    id int auto_increment NOT NULL,
    correo varchar(30) not null,
    login varchar(30) not null,
    password varchar(255) not null,
) ENGINE='InnoDB';

insert into user (correo, login, password) VALUES ("admin@admin.com","admin",);