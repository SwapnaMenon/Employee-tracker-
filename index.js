const inquire=require ("inquirer");
const { connect } = require("./db/connection");
const Connection= require ("./db/connection")

function menu(){
    return inquire.prompt([
        {
            type:"list",
            name:"choice",
            message:"What would you like to do",
            choices:["view all departments","view all roles","view all employees", "add a department","add a role", "add an employee", "update an employee role","exit"]

        
        }
    ])
    .then(function(data){
       if (data.choice==="view all roles"){
           viewrole ()
       }
       if (data.choice==="view all departments"){
        viewdepartments ()
    }
    if (data.choice==="view all employees"){
        viewemployees ()
    }
    
    if (data.choice==="update an employee role"){
        updateRole ()
    }
    if (data.choice==="add a department"){
        adddepartments()
    }
    if (data.choice==="add an employee"){
        addanemployee()
    }
    })
}
function viewrole (){
    const sql ="select * from role";
    Connection.query(sql,function(error, result){
        console.table (result);
        setTimeout (()=>{
            menu()  
        },2000)
        
    })
}
function viewdepartments (){
    const sql ="select * from departments";
    Connection.query(sql,function(error, result){
        console.table (result);
        menu()
    })
}
function viewemployees (){
    const sql ="select * from employees";
    Connection.query(sql,function(error, result){
        console.table (result);
        menu()
    })
}
function adddepartments (){
    return inquire.prompt([
        {
            type:"input",
            name:"name",
            message:"what is the department you want to add?",
        }
    ])
    .then (function(userinput){
        const sql ="insert into departments (name) values(?)";
        Connection.query(sql,[userinput.name],function(error, result){
            console.table (result);
            menu() 
        }) 
    })
}
function addanemployee() {
    return inquire.prompt([
        {
            type:"input",
            name:"firstname", 
            message:" enter your first name", 
        },
        {
            type:"input", 
            name:"lastname", 
            message:" enter your last name", 
        },
        {
            type:"list", 
            name:"roleid", 
            message:"what is the employee role id",
            choices:["1","2","3","4"], 
        }, 
        {
            type:"list", 
            name:"managerid", 
            message:"what is the manager id",
            choices:["1","2"],   
        }, 
    ])
    .then (function(userinput){
        //console.log (userinput)//
        const sql=`insert into employees (firstname, lastname, role_id, manager_id) values(?,?,?,?)`
        Connection.query (sql, [userinput.firstname, userinput.lastname, userinput.roleid, userinput.managerid], (error,results) =>{
            console.log ("employee has been added")
        })
        menu()
    })
}
function updateRole (){
    return inquire.prompt([
        {
            type:"input",
            name:"empId",
            message:"which employee id's role id is being updated?",
        },
        {
            type:"input",
            name:"roleId",
            message:"what is the new role id?",
        }
    ])
    .then (function(userinput){
        const sql ="update employees set role_id=? where id=? ";
        Connection.query(sql,[userinput.roleId,userinput.empId],function(error, result){
            console.table (result);
            menu() 
        }) 
    })
}        
menu()