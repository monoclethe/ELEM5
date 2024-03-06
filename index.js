document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      combine();
    }
});


var playArea = document.getElementById("playArea");

var elements = {
    0: ["Air", "lightblue"],
    1: ["Earth", "#743600"],
    2: ["Fire", "red"],
    3: ["Water", "blue"],
    4: ["Steam", "lightblue"],
    5: ["Cloud", "lightblue"],
    6: ["Lava", "red"],
    7: ["Obsidian", "purple"],
    8: ["Mud", "brown"],
    9: ["Dust", "gray"],
    10: ["Pollution", "green"]
};

var recipes = {
    2: {
        3: 4,
        1: 6
    },
    0: {
        4: 5
    },
    4: {
        0: 5
    },
    1: {
        2: 6,
        3: 8,
        0: 9
    },
    6: {
        3: 7
    },
    9: {
        3: 10
    }
};

var discovered = [0, 1, 2, 3];

var selected = [-1, -1]

function set1st (id) {
    if (selected[0] === -1) {
        selected[0] = id;
    } else if (selected[0] === id){
        selected[0] = -1;
    }
    console.log(selected);
    updateColor(id);
}
function set2nd (id) {
    if (selected[1] === -1) {
        selected[1] = id;
        console.log(selected);
    } else if (selected[1] === id) {
        selected[1] = -1;
    }
    console.log(selected);
    updateColor(id);
}
function combine () {
    let product = false;
    if (selected[0] !== -1 && selected[1] !== -1) {
        try {
            product = recipes[selected[0]][selected[1]];
            console.log(product);
            if (!discovered.includes(product)) {
                document.getElementById("playArea").innerHTML += "<div class=\"elem " + elements[product][1] + "\" id=\"" + product + "\" onclick=\"set1st(id)\" oncontextmenu=\"set2nd(id);return false;\">" + elements[product][0] + "</div>";
                discovered.push(product);
            }
        } catch {
            
        }
        
    }
}
function updateColor (id) {
    if (selected[0] === id && selected[1] === id) {
        document.getElementById(id).style = "border: 3px dashed purple";
    } else if (selected[0] === id) {
        document.getElementById(id).style = "border: 3px dashed red;";
    } else if (selected[1] === id) {
        document.getElementById(id).style = "border: 3px dashed blue;";
    } else {
        document.getElementById(id).style = "border: 3px solid " + elements[id][1] + ";";
    }
}