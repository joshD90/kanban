export const createUserTable =
  "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, fName VARCHAR(255) NOT NULL, lName VARCHAR(255) NOT NULL, hashedPW VARCHAR(1000) NOT NULL);";

export const addUser =
  "INSERT INTO users (email, fName, lName, hashedPW) VALUES (?,?,?,?);";

export const getUser = "SELECT * FROM users WHERE email = ?";
