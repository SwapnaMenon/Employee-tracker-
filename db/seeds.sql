insert into departments(name)
values 
      ("Accounting"), 
      ("Sales"),
      ("Software"), 
      ("HR");

insert into role(title, salary, department_id)
values 
      ("Accountant", 360000.00, 1), 
      ("Sales Associate", 10000.00, 2), 
      ("Software", 1000000.00, 3), 
      ("Recruiter", 950000.00, 4);

insert into employees(firstname, lastname, role_id, manager_id)
values
      ("John", "Doe", 1, null),
      ("Jane", "Doe", 1, 1), 
      ("Micheal", "Scott", 2, null), 
      ("Jim", "Buttler", 2, 3);

