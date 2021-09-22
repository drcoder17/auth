create database auth;
create extension pgcrypto;

create table users(
    user_id serial not null primary key,
    username varchar(64) not null,
    password varchar(64) not null
);

insert into users(username, password) values('me', '1');