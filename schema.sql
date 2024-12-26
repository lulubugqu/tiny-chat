-- This file contains the create table commands you need to create mysql tables to store data in this assignment

-- stores all accounts
create table accounts (
  id int not null auto_increment,
  un text not null,
  pw text not null,
  logged_in bool not null default FALSE,
  primary key(id)        
);

-- stores all post
create table posts (
  id int not null auto_increment,
  postUser text not null,
  postMessage text not null,
  postLikes int not null default 0,
  postDate timestamp not null default CURRENT_TIMESTAMP,
  primary key(id)        
);

-- add account
-- insert into accounts (un, pw) values ('chululu43', 'apple');

-- add post
-- insert into posts (postUser, postMessage) values ('chululu43', 'Today was a great day!');
-- insert into posts (postUser, postMessage) values ('admin', 'Hi everyody, there are scheduled updates at this time!');
-- insert into posts (postUser, postMessage) values ('chululu43', 'Ugh I hate updates');

