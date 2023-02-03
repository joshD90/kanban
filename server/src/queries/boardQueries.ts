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

// export const getSingleBoard =
//   "SELECT * FROM boards JOIN stories ON boards.id = stories.board_id WHERE boards.id = ?";

// export const getSingleBoard =
//   "SELECT boards.*, (SELECT JSON_ARRAYAGG(stories.*) FROM stories WHERE stories.board_id = boards.id ) as stories FROM boards WHERE boards.id = ?";

export const getSingleBoard =
  "SELECT boards.*, stories_for_board.stories FROM boards LEFT JOIN (SELECT board_id, GROUP_CONCAT(JSON_OBJECT('id',id,'title',title,'description',description,'status_panel',status_panel)) AS stories FROM stories GROUP BY board_id) AS stories_for_board ON stories_for_board.board_id = boards.id WHERE boards.id = ?";
