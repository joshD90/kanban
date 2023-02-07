import mysql from "mysql2";
import mysqlPromise from "mysql2/promise";
//set up our connection config

// export const connection = mysql.createConnection({
//   host: "localhost",
//   user: "kanban",
//   database: "kanban",
//   password: process.env.DBPASSWORD,
// });

// export const asyncConn = async (): Promise<any> => {
//   const db = await mysqlPromise.createConnection({
//     host: "localhost",
//     user: "kanban",
//     database: "kanban",
//     password: process.env.DBPASSWORD,
//   });
//   return db;
// };

const pool = mysql.createPool({
  host: "localhost",
  user: "kanban",
  database: "kanban",
  password: process.env.DBPASSWORD,
  connectionLimit: 10,
  waitForConnections: true,
});

export const promisePool = pool.promise();
