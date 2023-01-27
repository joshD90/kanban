import mysql from "mysql2";
//set up our connection config

export const connection = mysql.createConnection({
  host: "localhost",
  user: "kanban",
  database: "kanban",
  password: process.env.DBPASSWORD,
});
