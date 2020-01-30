var dictionary;
try {
   var data = require('./full-wordlist.json');
   var dictionary = data['words']
   dictionary = new Set()
} catch ( err ) {
   // handle your file not found (or other error) here
}

function dict_checker(strng, result) {
    //  We need to only check strings gretater than 3 exist in the dictionary.
    if (strng.length >= 3) {
            if (dictionary.has(strng)) {
                result.push(strng);
        }
      
    }
    return;
}

function assert_pattern(grid, result) {
    var seen = [];
    // We need to build a correspondent grid to keep track of seen grid positions
    // So that we do not visit these positions more than once in our dfs
    for (var i = 0; i < grid[0].length; i++) {
        seen[i] = []
        for (var j = 0; j < grid.length; j++) {
            seen[i][j] = false;
        }
    }
    // We need to look at every letter in the grid and run the dfs permutation findef from it.
    var strng = "";
    for (var i = 0; i < grid[0].length; i++) {
        for (var j = 0; j < grid.length; j++) {
            permutation_finder(grid, seen, i, j, strng, result);
        }
    }

}

function permutation_finder(grid, seen, i, j, strng, result) {
    seen[i][j] = true;
    strng += grid[i][j];
    dict_checker(strng, result)
    
    // This is my neighborhood search logic.
    for (var row = i - 1; row <= i + 1 && row < grid[0].length; row++) {
        for (var col = j - 1; col <= j + 1 && col < grid.length; col++) {
            if (row >= 0 && col >= 0 && !seen[row][col]) {
                permutation_finder(grid, seen, row, col, strng, result);
            }
        }
    }
    strng = "";
    seen[i][j] = false;
}


function findAllSolutions(grid) {
    var result = []
    assert_pattern(grid, result)
    return result;
}
module.exports = findAllSolutions
