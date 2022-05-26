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
    if (data.choice==="add a department"){
        viewemployees ()
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
    return inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"a message",
        }
    ])
    .then (function(userinputs){
        const sql ="insert into departments (name) values(?)";
        Connection.query(sql,[userinput.name],function(error, result){
            console.table (result);
            menu() 
        }) 
    })
}
     
menu()