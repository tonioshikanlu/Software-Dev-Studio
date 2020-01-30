var dictionary;
var grid =  [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["I", "J", "K", "L"], ["A", "B", "C", "D"]];
//var dictionary =  ["ABEF", "AFJIEB", "DGKD", "DGKA"];
//var trie = require('/Users/tonioshikanlu/Documents/GitHub/Software-Dev-Studio/boggle/node_modules/trie-prefix-tree');
// try {
//    var data = require('./full-wordlist.json');
//    var dictionary = data['words']
// } catch ( err ) {
//    // handle your file not found (or other error) here
// }
//var dictionary;
//var trie = require('/Users/tonioshikanlu/Documents/GitHub/Software-Dev-Studio/boggle/node_modules/trie-prefix-tree');
//var myTrie = trie(dictionary)

// function dict_checker(strng, result) {
//     //  We need to only check strings gretater than 3 exist in the dictionary.
//     if (strng.length >= 3) {
//             if (dictionary.has(strng)) {
//                 result.push(strng);
//         }
      
//     }
//     return;
// }

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
            trie.insert(dictionary[i]);
        }
    }

function dict_checker(strng, result) {
    //  We need to only check strings gretater than 3 exist in the dictionary.
    if (strng.length >= 3) {
        if (trie.startsWith(strng) == true){
            if (trie.search(strng)) {
                result.push(strng);
        }
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
    strng += grid[i][j].toLowerCase();
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
console.log(findAllSolutions(grid))

module.exports = findAllSolutions

// var myTrie = trie(dictionary)

// function dict_checker(strng, result) {
//     //  We need to only check strings gretater than 3 exist in the dictionary.
//     if (strng.length >= 3) {
//         if (myTrie.isPrefix(strng) == true){
//             if (myTrie.hasWord(strng)) {
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
    
//        dict_checker(strng, result) 
    
    
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
// console.log(findAllSolutions(grid))
// module.exports = findAllSolutions