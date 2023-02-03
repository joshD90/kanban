//create a new story table if it doesn't exist already
export const createStoryTable =
  "CREATE TABLE IF NOT EXISTS stories (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description VARCHAR(1000) NOT NULL, board_id INT NOT NULL, status_panel INT DEFAULT 1, FOREIGN KEY (board_id) REFERENCES boards(id))";

export const addStory =
  "INSERT INTO stories (title, description, status_panel, board_id) VALUES (?,?,?,?)";
