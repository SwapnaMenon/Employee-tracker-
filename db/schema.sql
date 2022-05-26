drop table if exists departments;
drop table if exists role; 
drop table if exists employees; 

create table departments(
    id int primary key auto_increment,
    name varchar(30)
);
create table role(
    id int primary key auto_increment,
    title varchar(30) not null,
    salary decimal(10,2) not null, 
    department_id int, 
    constraint role_fk foreign key (department_id) references departments(id)
);
create table employees(
    id int primary key auto_increment,
    firstname varchar(15) not null, 
    lastname varchar(15) not null, 
    role_id int, 
    constraint employee_fk foreign key (role_id) references role(id),
    manager_id int, 
    constraint manager_fk foreign key (manager_id) references employees(id)
);


