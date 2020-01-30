var dictionary;
//var trie = require('/Users/tonioshikanlu/Documents/GitHub/Software-Dev-Studio/boggle/node_modules/trie-prefix-tree');
let trieNode = function() {
  // Map of children
  this.children = new Map();
 
  // If true, the node is at the end
  this.word = false;

  // Check to see if the node is at the end
  this.isWord = function() {
    return this.word;
};
};

let Trie = function() {
        // Root node of trie
       this.root = new trieNode();

       // Inserts a word into the trie.
       this.insert = function(input, node = this.root) {
        if (input.length === 0) {
            node.word = true;
            return;
        } else if (!node.children.has(input[0])) {
            node.children.set(input[0], new trieNode());
            return this.insert(input.substr(1), node.children.get(input[0]));
        } else {
            return this.insert(input.substr(1), node.children.get(input[0]));
        };
       };

       // Checks if the word is in the trie.
       this.search = function(word) {
        let node = this.root;
        while (word.length > 1) {
            if (!node.children.has(word[0])) {
                return false;
            } else {
                node = node.children.get(word[0]);
                word = word.substr(1);
            };
        };
        return (node.children.has(word) && node.children.get(word).isWord()) ?
      true : false;
    };

        // Returns true if there is any word in the trie that starts with the given prefix.
       this.startsWith = function(prefix) {
        var currNode = this.root;
        var letter = prefix.slice(0,1);
        prefix = prefix.slice(1);
   
        while(letter.length > 0 ){
            if(currNode.children.has(letter)){
                currNode = currNode.children.get(letter);                              
                letter = prefix.slice(0,1);
                prefix = prefix.slice(1);                      
            } else{
                return false;
            }        
        }    
        return true;
    };
}

try {
   var data = require('./full-wordlist.json');
   var dictionary = data['words']
} catch ( err ) {
   // handle your file not found (or other error) here
}
var trie = new Trie();
for(var i = 0; i < dictionary.length; i++){
        if (dictionary[i].length > 2){      
            trie.insert(dictionary[i].toUpperCase());
        }
    }

// function dict_checker(strng, result) {
//     //  We need to only check strings gretater than 3 exist in the dictionary.
//     if (strng.length >= 3) {
//         if (trie.startsWith(strng) == true){
//             if (trie.search(strng)) {
//                 result.push(strng);
//         }
//       }
//     }
//     return;
// }

// function assert_pattern(grid, result) {
//     var seen = [];
//     // We need to build a correspondent grid to keep track of seen grid positions
//     // So that we do not visit these positions more than once in our dfs
//     for (var i = 0; i < grid[0].length; i++) {
//         seen[i] = []
//         for (var j = 0; j < grid.length; j++) {
//             seen[i][j] = false;
//         }
//     }
//     // We need to look at every letter in the grid and run the dfs permutation findef from it.
//     var strng = "";
//     for (var i = 0; i < grid[0].length; i++) {
//         for (var j = 0; j < grid.length; j++) {
//             permutation_finder(grid, seen, i, j, strng, result);
//         }
//     }

// }

// function permutation_finder(grid, seen, i, j, strng, result) {
//     seen[i][j] = true;
//     strng += grid[i][j].toLowerCase();
//     dict_checker(strng, result)
    
//     // This is my neighborhood search logic.
//     for (var row = i - 1; row <= i + 1 && row < grid[0].length; row++) {
//         for (var col = j - 1; col <= j + 1 && col < grid.length; col++) {
//             if (row >= 0 && col >= 0 && !seen[row][col]) {
//                 permutation_finder(grid, seen, row, col, strng, result);
//             }
//         }
//     }
//     strng = "";
//     seen[i][j] = false;
// }


// function findAllSolutions(grid) {
//     var result = []
//     assert_pattern(grid, result)
//     return result;
// }
//console.log(findAllSolutions(grid))
var neighbour_delta = [[-1,-1],[-1,0],[-1,1],[0,-1,],[0,1],[1,-1],[1,0],[1,1]]

// Returns the neighbors for a given co-ordinates
function get_neighbours(grid,r,c){
    var n = [];
    var l = grid.length;
    for (let i = 0; i < neighbour_delta.length; i++){
        var new_r = r + neighbour_delta[i][0];
        var new_c = c + neighbour_delta[i][1];

        if ((new_r >= l) || (new_c >= l) || (new_r < 0) || (new_c < 0)){
            continue;
        }
        n.push([new_r,new_c]);
    }
    return n;
}

// Scans the grid using DFS to check for valid words.
function dfs(grid,r,c,visited, trie, now_word, valid){
    var letter = grid[r][c];
   
    // Checks if the tile has been visited
    if (visited.length > 0){
        for (var i = 0; i < visited.length; i++){
            if (r === visited[i][0]){
                if (c === visited[i][1]){
                    return;
                }
            }
        }
    }

    //  var to check if the prefix is in the trie
    var prefix = now_word.concat(letter);
   
    if (trie.startsWith(prefix)){
        now_word = now_word.concat(letter);
        visited.push([r,c]);

        if (trie.search(now_word) && !valid.includes(now_word)){
            valid.push(now_word);
        }
       
        // Get all the valid neighbours
        var n = get_neighbours(grid,r,c);
       
        for (var i = 0; i < n.length; i++){
            dfs(grid,n[i][0], n[i][1], visited, trie, now_word, valid);  

        }
    }
}

function findAllSolutions(grid){
    // print the grid
    // console.log('Grid: ', grid);
    // console.log(dictionary)
    // Initiate the search for words in dictionary
    // var trie = new Trie();

    // // Generate trie
    // for(var i = 0; i < dictionary.length; i++){
    //     if (dictionary[i].length > 2){      
    //         trie.insert(dictionary[i]);
    //     }
    // }
   // console.log('Dictionary: ', trie.printTrie());

    // Keep track of the visited tiles
    var visited = [];

    // Keep track of the valid words found in the grid
    var valid = [];

    // Run DFS on each tile of the grid
    for(var r = 0; r < grid.length; r++){
        for(var c = 0; c < grid.length; c++){
            var letter = grid[r][c];
            dfs(grid,r,c,visited,trie,'',valid);
            var visited = [];
        }
    }
    console.log(valid)
    return valid;
}

module.exports = findAllSolutions