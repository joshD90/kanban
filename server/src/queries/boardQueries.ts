// Need to set up a many to many relationship between boards and users
// the story to board relationship is one to one
// need to create a third board which connects userid and boardid
// call this user_boards by convention.
// user is id, email, fName, lName
// board is id, name, panel1, panel2, panel3

export const createBoardTable =
  "CREATE TABLE IF NOT EXISTS boards (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, panel1 VARCHAR(255) NOT NULL, panel2 VARCHAR(255) NOT NULL, panel3 VARCHAR(255) NOT NULL)";

export const addBoard =
  "INSERT INTO boards (name, panel1, panel2, panel3) VALUES (?,?,?,?)";

//create a reference table to facilitate a many to many relationship between boards and users
export const createBoardUserReference =
  "CREATE TABLE IF NOT EXISTS user_boards (user_id INT, board_id INT, PRIMARY KEY (user_id, board_id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (board_id) REFERENCES boards(id))";

//adding in board reference
export const addUserBoardRef =
  "INSERT INTO user_boards (user_id, board_id) VALUES ?";

export const getAllUserBoards =
  "SELECT boards.* FROM boards JOIN user_boards ON boards.id = user_boards.board_id JOIN users ON users.id = user_boards.user_id WHERE users.id = ?";
