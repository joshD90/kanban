import mysql from "mysql2";
import config from "./config";
//set up our connection config

const pool = mysql.createPool({
  host: "localhost",
  user: "kanban",
  database: "kanban",
  password: config.db.password,
  connectionLimit: 10,
  waitForConnections: true,
});

export const promisePool = pool.promise();
