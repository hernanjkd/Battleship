/***********************************************
************************************************

 USING DIFFERENT ALGORITHM FOR POSITIONING SHIPS

************************************************
************************************************/


let board_div = document.querySelector('.board');
board_div.addEventListener('click', shoot, false);
let num_rows = 6;
let num_cols = 6;

// Create board
let board = [];


    // Create Rows
    for (y=0; y<num_rows; y++) {
        let arr = [];

        // Create the row div with bootstrap
        let row = document.createElement('div');
        row.className = 'row';


        // Create Columns
        for (x=0; x<num_cols; x++) {
            arr.push(0);

            // Add a class id.. THEY CAN NOT START WITH A NUMBER!!!
            let square = document.createElement('div');
            square.className = '-'+y+x;
            row.appendChild(square);
        }

        board.push(arr);
        board_div.appendChild(row);
    }


/************************************
   ADD BATTLESHIP TO THE BOARD
*************************************
*/
function addShip(ship_length) { console.log(ship_length);

    let done = false;

    // check first vertically or horizontally
    let vh = getRandom(1);
    // check first right or left
    let rl = getRandom(1);
    // check first up or down
    let ud = getRandom(1)

    // loop until all positions are put in place, else pick another random spot and start again
    while (!done) {

        // random row, random column
        let r = getRandom(num_rows); console.log(r+' random row');
        let c = getRandom(num_cols); console.log(c+' random column');
        let orig_r = r;
        let orig_c = c;

        let arr = [[r,c]];

        // if the spot randomly selected is empty
        if (board[r][c] === 0) {
console.log(r+' '+c);
            // 1 because the first part is already available
            let availability = 1;
            let fits = true;

            while (availability < ship_length && fits) {
                r--;

                // Make sure that r doesn't go out of bounce
                if (r != -1 && board[r][c] === 0) {
                    arr.push([r,c]); console.log(r+' '+c+' if');
                    availability++;
                }
                else {
                    r = orig_r;
                    while (availability < ship_length) {
                        r++; console.log(r+' '+c+' else');

                        // Make sure that r doesn't go out of bounce
                        if (r != num_rows && board[r][c] === 0) {
                            arr.push([r,c]);
                            availability++;
                        }
                        else {
                            fits = false;
                            break;
                        }
                    }
                }

            }//while (availability)

            // If all the parts are available, position ship on the board and end the loop (done = true)
            if (availability === ship_length) {
                for (let p in arr) {
                    board[ arr[p][0] ][ arr[p][1] ] = ship_length;
                }

                done = true;
            }

        }//if (board[r][c] === 0)
    }//while (!done)
}

addShip(2);

console.log(board);
addShip(5);

console.log(board);
addShip(4);

console.log(board);
addShip(3);

console.log(board);
addShip(3);

console.log(board);




// Get a random number from 0 [up to/ not including] range
function getRandom(range) {
    if (range === 1)
        return Math.floor( Math.random() * 2 );
    return Math.floor( Math.random() * range );
}

function shoot(element) {

    let e = element.target;

    /* There's the currentTarget (element where the EventListener was added) rows and squares..
       make sure it's the squares that are being selected. I'm checking this by looking at the class.
    */
    if (e.className.substr(0,1) === '-') {
        e.style.background = 'red';
        e.innerHTML = e.className;
    }
}
