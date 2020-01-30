var grid =  [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["I", "J", "K", "L"], ["A", "B", "C", "D"]];
var dictionary =  ["ABEF", "AFJIEB", "DGKD", "DGKA"];
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
/*
    // Returns a list of all words present in the trie.
    this.printTrie = function() {
        let words = new Array();
        let search = function(node, string) {
            if (node.children.size != 0) {
                for (let letter of node.children.keys()) {
                    search(node.children.get(letter), string.concat(letter));
                };
                if (node.isWord()) {
                    words.push(string);
                };
            } else {

                string.length > 0 ? words.push(string) : words;
                return;
            };
        };
        search(this.root, new String());
        return words.length > 0 ? words : [];
    };*/
};

var neighbour_delta = [[-1,-1],[-1,0],[-1,1],[0,-1,],[0,1],[1,-1],[1,0],[1,1]]

// Returns the neighbors for a given co-ordinates
function get_neighbours(grid,r,c){
    var n = new Array();
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

function findAllSolutions(grid, dictionary){
    // print the grid
    // console.log('Grid: ', grid);
    // console.log(dictionary)
    // Initiate the search for words in dictionary
    var trie = new Trie();

    // Generate trie
    for(var i = 0; i < dictionary.length; i++){
        if (dictionary[i].length > 2){      
            trie.insert(dictionary[i].toUpperCase());
        }
    }
   // console.log('Dictionary: ', trie.printTrie());

    // Keep track of the visited tiles
    var visited = new Array();

    // Keep track of the valid words found in the grid
    var valid = new Array();

    // Run DFS on each tile of the grid
    for(var r = 0; r < grid.length; r++){
        for(var c = 0; c < grid.length; c++){
            var letter = grid[r][c];
            dfs(grid,r,c,visited,trie,'',valid);
            var visited = new Array();
        }
    }
    //console.log(valid)
    return valid;
}

console.log(findAllSolutions(grid,dictionary))