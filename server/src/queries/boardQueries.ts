// Need to set up a many to many relationship between boards and users
// the story to board relationship is one to one
// need to create a third board which connects userid and boardid
// call this user_boards by convention.
// user is id, email, fName, lName
// board is id, name, panel1, panel2, panel3

export const createBoardTable =
  "CREATE TABLE IF NOT EXISTS boards (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, panel1 STRING NOT NULL, panel2 STRING NOT NULL, panel3 STRING NOT NULL, participants )";

export const addBoard =
  "INSERT INTO boards (name, headers, participants) VALUES (?,?,?)";
