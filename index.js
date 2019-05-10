
let num_rows = 10;
let num_cols = 10;
let missed_shots_available = 5;


let board_div = document.querySelector('.board');

// Position board in the middle
board_div.style.width = (num_cols * 40) + 'px';
board_div.style.height = (num_rows * 40) + 'px';
board_div.style.margin = '5% auto 0px auto';

// Add event listeners
board_div.addEventListener('click', shoot);

let ready_button = document.querySelector('.ready');
ready_button.addEventListener('click', show);

// Set global variables. Adding each ship will increment the number of hits to win
let number_of_hits_to_win = 0;




/***************************
        CREATE BOARD
****************************/
let board = [];

    // Create Rows
for (r=0; r<num_rows; r++) {
    let arr = [];

    // Create the row div with bootstrap
    let row = document.createElement('div');
    row.className = 'row';


    // Create Columns
    for (c=0; c<num_cols; c++) {
        arr.push(0);

        // Add a class id.. THEY CAN NOT START WITH A NUMBER NOR WITH '-' !!!
        // Add the squares to the row
        let square = document.createElement('div');
        square.className = 'cell-'+r+c;
        row.appendChild(square);
    }

    // Add the rows to the board
    board.push(arr);
    board_div.appendChild(row);
}




/************************************
    ADD SHIP TO THE BOARD RANDOMLY
*************************************
*/

addShip(5); // Carrier
addShip(4); // Battleship
addShip(3); // Destroyer
addShip(3); // Submarine
addShip(2); // Patrol Boat
console.log(board);


function addShip(ship_length) {

    let done = false;

    // Loop until all positions are put in place, else pick another random spot and start again
    while (!done) {

        // First position randomly picked.. row and column
        let r = getRandom(num_rows);
        let c = getRandom(num_cols);

        let ship_position = [[r,c]];

        // If the spot randomly selected is empty
        if (board[r][c] === 0) {

            ship_position = position(r, c, ship_length);

            let available = checkAvailability(ship_position);


            // If the spot is available, position ship on the board and end the loop (done = true)
            if (available) {
                for (p in ship_position) {
                    board[ ship_position[p][0] ][ ship_position[p][1] ] = ship_length;
                }

                number_of_hits_to_win += ship_length;
                done = true;
            }

        }//if (board[r][c] === 0)
    }//while (!done)
}





/****************************
 Show the board for a second
*****************************/

function show() {
    ready_button.style.zIndex = '-1';
    showShips('red');
    setTimeout( () => showShips('#0ca4ff'), 2000); // setTimeOut( function () { showShips('green'); }, 1000);
}

function showShips(color) {
    for (r in board)
        for (c in board[r])
            if (board[r][c] !== 0)
                document.querySelector('.cell-'+r+c).style.background = color;
}






/****************************
         TAKE A SHOT
*****************************/

function shoot(element) {

    let e = element.target;

    /* There's the currentTarget (element where the EventListener was added) rows and squares..
       make sure it's the squares that are being selected. I'm checking this by looking at the class.
    */
    if (e.className.indexOf('cell') !== -1) {

        // Extract row and column from class name
        let r = e.className.substr(5,1);
        let c = e.className.substr(6,1);

        // HIT
        if (board[r][c] > 0) {
            e.style.background = 'red';
            board[r][c] = -1;
            number_of_hits_to_win--;
        }

        // MISSED
        else if (board[r][c] !== -1) {
            e.style.background = 'gray';
            setTimeout( () => e.style.background = '#0ca4ff', 5000);
            missed_shots_available--;
        }

        // Check to see if the player won or lost
        if (missed_shots_available === 0) {
            window.alert('TRY AGAIN.. RELOAD PAGE');
            location.reload();
        }

        else if (number_of_hits_to_win === 0)
            window.alert("YOU'VE WON!");
    }
}





// Get a random number from 0 [up to/ not including] range
// If range is 1 only pick between 0-1
function getRandom(range) {
    if (range === 1)
        return Math.floor( Math.random() * 2 );
    return Math.floor( Math.random() * range );
}

// After the first position of the ship was picked randomly, place the ship in the middle of that position.
function position(r, c, ship_length) {

    let arr = [[r,c]];

    // Position the ship vertically or horizontally
    let vh = getRandom(1);

    // This will position the ship in the middle of the first position that was picked
    let side = false;

    for (i=1; i<ship_length; i++) {

        // Vertically
        if (vh) {
            if (side) {
                r += i;
                arr.push([r, c]);
                side = false;
            }
            else {
                r -= i;
                arr.push([r, c]);
                side = true;
            }
        }

        // Horizontally
        else {
            if (side) {
                c += i;
                arr.push([r, c]);
                side = false;
            }
            else {
                c -= i;
                arr.push([r, c]);
                side = true;
            }
        }
    }
    return arr;
}

// Goes through every position in the board to see if it is taken or out of bounce
function checkAvailability(arr) {
    for (i in arr) {
        let r = arr[i][0];
        let c = arr[i][1];
        if (r >= num_rows || r < 0 || c >= num_cols || c < 0 ||  board[r][c] !== 0)
            return false;
    }
    return true;
}