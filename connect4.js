/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 var WIDTH = 7;
 var HEIGHT = 6;
 
 var currPlayer = 1; // active player: 1 or 2
 var board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   /*
   const board =  [
         [null,   null,   null,   null,   null,   null,  null],
         [null,   null,   null,   null,   null,   null,  null],
         [null,   null,   null,   null,   null,   null,  null],
         [null,   null,   null,   null,   null,   null,  null],
         [null,   null,   null,   null,   null,   null,  null],
         [null,   null,   null,   null,   null,   null,  null]
   ]
   */
   // make this board dynamic, consider the height of the board, and push it to empty array named board
 
     // for (let height = 0; height < 6; height++) {
     for (let height = 0; height < HEIGHT; height++) {
         boardObject = {length: 7};
          // convert this to an array and push it to an empty array to represent each row
         toArray = Array.from(boardObject);
          // push it to baord
         board.push(toArray);
     }
 
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"   
 //   let htmlBoard = document.querySelector('board');    // select/retrieve table from div html element
     let htmlBoard = document.getElementById('board');  
 
   // TODO: add comment for this code
     var top = document.createElement('tr');  // create table row
     top.setAttribute("id", "column-top");    // set attribute of id to table row
     top.addEventListener("click", handleClick);  //listen to the click event at table topmost row, when clicked drop to the bottom most row
 
     for (var x = 0; x < WIDTH; x++) {  // x < 7, this code appends 7 table data cell to the top row
         var headCell = document.createElement("td");  // create table data for the top row
         headCell.setAttribute("id", x);     // set id to be x for table dat cell
         top.append(headCell);   // append this to top row 
     }
     htmlBoard.append(top);    // append top table row to the html table(table is inside div element)
 
     // TODO: add comment for this code
     for (var y = 0; y < HEIGHT; y++) {    // y < 6, it appends table data cell to each row
         const row = document.createElement("tr"); // create a row in html table
         for (var x = 0; x < WIDTH; x++) {   // x < 7
         const cell = document.createElement("td"); // create table data cell
         cell.setAttribute("id", `${y}-${x}`); //creates id for each data cell id = y-x(i.e, like 0-0, 0-1, 0-2, 0-3, 0-4, 0-5, 0-6, 1-0, 1-1, 1-2 ...)
         row.append(cell);
         }
         htmlBoard.append(row); // it creates each row, then appends table data cell to that row. Then appends that row to the html table, and conitnues until all is done
     }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   // we need to get coordinates for each node. So, get value for height of column
 //   for (let x = 0; x<WIDTH, x++)
     // tableCell = document.getElementsByTagName("td")
     // for(let i = 0; i <tableCell.length; i++){  // this is td
         // get the column of the cell you click on, add eventlistener for it
     //     tableCell[i].addEventListener('click', (e) => {
     //         console.log(`${(e.target.parentElement.rowIndex)}, ${e.target.cellIndex}`);
          // you may have to return this if needed
     //     })
     // }
 
     // get height of board, keep decrementing it until you get to the bottom most row
     // if xy coordinate is not found, return value of vertical(y) coordinate, then return null
     for (let height = HEIGHT - 1; height >= 0; height--) {
             // if no cordinate is found in board array, return the input(height)
         if (!board[height][x]) {
         return height;
         }
     }
     // if xy coordinate is found, return null
     return null;
 
 //   return 0;  
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
     let newDiv = document.createElement('div');
   // retrieve table cell, piece is a class defined in css file, use it here // tableCell = document.querySelector('')
 // add a class named piece to it
     newDiv.classList.add('piece');
     // create another class and add it to indicate a player number 1 or 2
     newDiv.classList.add(`player${currPlayer}`);
     // retrieve an element by its id bcoz there are many of these ones
     let slotInTable = document.getElementById(`${y}-${x}`);
     // now put newDiv into this one
     slotInTable.append(newDiv);
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   // just adding an alert statement should do for this
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   var x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   var y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   // add this line, see if it works board[y][x] = currPlayer;
     board[y][x] = currPlayer;
     placeInTable(y, x);
 
   // check for win
     if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
     }
 
     // checkForWin() && endGame(`Congratulations! Player ${currPlayer} won!`);
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
 
   // if all the cells in the table are filled and no one wins, its a tie, check the array board, some good array methods to use are forEach, some, every, find, findIndex
   // every method: iterates through an array, runs a callback on each value in the array, if callback returns false for any single value, then it returns false; otherwise returns true
   // the resul to callback is always a boolean value, it takes function as an argument
     if(board.every(row => row.every(cell => cell))){
         return endGame("DRAW");
     }
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
     currPlayer = currPlayer === 1 ? 2 : 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
     for (var y = 0; y < HEIGHT; y++) {
         for (var x = 0; x < WIDTH; x++) {
             var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
             var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
             var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
             var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
             if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
             return true;
             }
         }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 