
let board_div = document.querySelector('.board');
board_div.addEventListener('click', shoot, false);
let num_rows = 10;
let num_cols = 10;

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

        // Add a class id.. THEY CAN NOT START WITH A NUMBER!!!
        // Add the squares to the row
        let square = document.createElement('div');
        square.className = '-'+r+c;
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
function addShip(ship_length) {

    let done = false;  let count = 10;

    // Loop until all positions are put in place, else pick another random spot and start again
    while (!done) {
count--; if (!count) done = true;
        // First position randomly picked.. row and column
        let r = getRandom(num_rows);
        let c = getRandom(num_cols);

        let ship_position = [[r,c]];

        // If the spot randomly selected is empty
        if (board[r][c] === 0) {

            ship_position = position(r, c, ship_length); console.log(ship_position);

            let available = checkAvailability(ship_position);


            // If the spot is available, position ship on the board and end the loop (done = true)
            if (available) {
                for (p in ship_position) {
                    board[ ship_position[p][0] ][ ship_position[p][1] ] = ship_length;
                }

                done = true;
            }

        }//if (board[r][c] === 0)
    }//while (!done)
}

addShip(5);
console.log(board);

addShip(2);
console.log(board);

addShip(4);
console.log(board);

addShip(3);
console.log(board);

addShip(3);
console.log(board);




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

function checkAvailability(arr) {
    for (i in arr) {
        let r = arr[i][0];
        let c = arr[i][1];
        if (r >= num_rows || r < 0 || c >= num_cols || c < 0 ||  board[r][c] !== 0)
            return false;
    }
    return true;
}

// TAKE A SHOT
function shoot(element) {

    let e = element.target;

    /* There's the currentTarget (element where the EventListener was added) rows and squares..
       make sure it's the squares that are being selected. I'm checking this by looking at the class.
    */
    if (e.className.substr(0,1) === '-') {

        // Extract row and column from class name
        let r = e.className.substr(1,1);
        let c = e.className.substr(2,1);

        if (board[r][c] > 0) {
            e.style.background = 'red';
        }
        else
            e.style.background = 'gray';
    }
}
