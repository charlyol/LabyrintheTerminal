// Module for interacting with the user
const readline = require('readline');

// Variables to store confirmed grid dimensions
let finalGridX = 0;
let finalGridY = 0;

// Global variable to store the grid
let grid = [];

// Number of moves
let moves = 0;

// Position of player
let playerPosition = [];

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask the user for the dimensions of the grid
function askDimensions(callback) {
  rl.question("Enter the number of columns: ", (X) => {
    rl.question("Enter the number of rows: ", (Y) => {
      console.log(`You have just created an array of -> Y : ${Y} X : ${X} `);

      rl.question("Do you confirm your choice? (yes/no): ", (answer) => {
        if (answer === 'yes' || answer === 'y' || answer === '') {
          finalGridX = parseInt(X);
          finalGridY = parseInt(Y);
          console.log(`Great! The dimensions have been confirmed -> X : ${finalGridX} Y : ${finalGridY} `);
          callback(finalGridX, finalGridY);
        } else {
          console.log("Okay, let's restart.");
          askDimensions(callback); // Call the function again to restart the process
        }
      });
    });
  });
}

// Function to create and display the grid based on confirmed dimensions
function useGridDimensions(columns, rows) {
  console.log(`Using the grid dimensions: ${columns} columns and ${rows} rows.`);

  // Create an empty 2D grid array
  grid = []; // Initialiser la variable globale `grid`
  for (let y = 0; y < rows; y++) {
    let row = []; // Create a new row
    for (let x = 0; x < columns; x++) {
      row.push(0); // Initialize each cell to 0
    }
    grid.push(row); // Add the row to the grid
  }

  // grid [Y][X]
  grid[0][0] = "S"; // Start position
  grid[2][4] = "G"; // Set Goal point

  // Define some walls in the grid
  const gridWall = [[0, 1], [1, 1], [2, 1], [4, 1], [5, 1], [1, 3], [2, 3], [4, 3], [1, 4], [3, 4], [3, 5], [5, 5], [1, 6]];
  for (const [Y, X] of gridWall) {
    grid[Y][X] = "🧱";
  }

  // Display the grid in the console as a table
  console.table(grid);
  console.log("Start the game");
  return grid;
}

function findGoalPosition() {
  let goalPosition = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "G") {
        goalPosition = [y, x];
        break;
      }
    }
    if (goalPosition.length > 0) break;
  }
  return goalPosition;
}

// Main function to manage the game logic
function gameLabyrinthe() {
  askDimensions((columns, rows) => {
    useGridDimensions(columns, rows);
    playerPosition = [2, 4];
    if (playerPosition !== findGoalPosition()) {
      setTimeout(() => {
        moves++;
        console.table(grid);
        console.log(" Moves : ", moves, "\n", "Position of Goal : " + "[" + findGoalPosition() + "]");
        rl.close();
      }, 1000);
    }
    if (playerPosition === findGoalPosition()){
    console.log("You win");
    }
  });
}

// Export the functions for use in other files
module.exports = { gameLabyrinthe };