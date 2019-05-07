
let board_div = document.querySelector('.board');
let num_rows = 10;
let num_cols = 10;

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

            let square = document.createElement('div');
            square.className = 's'+y+x; document.write('----------'+square.className);
            //square.id=''+y+x;
            row.appendChild(square);
        }

        board.push(arr);
        board_div.appendChild(row);
    }

let test = document.querySelector('s01');
//let test = document.getElementByClassName('s01');
//test.style.backgroundColor = 'red';
console.log(test);