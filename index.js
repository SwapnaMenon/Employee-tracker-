const inquire=require ("inquirer");
const { connect } = require("./db/connection");
const Connection= require ("./db/connection")

function menu(){
    return inquire.prompt([
        {
            type:"list",
            name:"choice",
            message:"What would you like to do",
            choices:["view all departments","view all roles","view all employees", "add a department","add a role", "add an employee,", "update an employee role","exit"]

        
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