document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      combine();
      updateElemDisp();
    }
});


var playArea = document.getElementById("playArea");
var newElemBuffer = [];
var elements = {
    0: ["Air", "lightblue"],
    1: ["Earth", "brown"],
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

var selected = [-1, -1];

function updateElemDisp () {
    document.getElementById("elemDisp").innerHTML = "(" + discovered.length + "/" + Object.keys(elements).length + ")";
}

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
        product = recipes[selected[0]][selected[1]];
        if (!discovered.includes(product) && product !== undefined) {
            discovered.push(product);
            updateDispElems();
            newElemBuffer.push(product);
            updateNewElems();
        } else if (product === undefined) {
            //Add a GUI system for this later...
            //discovered, newElemBuffer, updateDispElems, updateNewElems, elements, recipes
            let response = prompt("Undiscovered Element/Recipe! Type the name / color of the new element.");
            response = response.split("/");
            
            let elemNames = [];
            for (let i = 0; i < Object.keys(elements).length; i++) {
                elemNames.push(elements[i][0]);
            }
            
            let elemExists = false;
            if (elemNames.includes(response[0])) {
                elemExists = true;
            }
            
            if (!elemExists) {
                elements[Object.keys(elements).length] = [response[0], response[1]];
                recipes[Object.keys(elements).length - 1] = {};
                newElemBuffer.push(Object.keys(elements).length - 1);
                discovered.push(Object.keys(elements).length - 1);
            }

            recipes[selected[0]][selected[1]] = Object.keys(elements).length - 1;
            updateDispElems();
            updateNewElems();
            updateElemDisp();
        }
        
    }
    let prevSelect = selected;
    selected = [-1, -1];
    updateColor(prevSelect[0]);
    updateColor(prevSelect[1]);
    updateElemDisp();
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
function addElemToDoc(id, divid) {
    document.getElementById(divid).innerHTML += "<div class=\"elem " + elements[id][1] + "\" id=\"" + id + "\" onclick=\"set1st(id)\" oncontextmenu=\"set2nd(id);return false;\">" + elements[id][0] + "</div>";
}
function addElemToNew(id, divid) {
    document.getElementById(divid).innerHTML = "<div class=\"elem " + elements[id][1] + "\" id=\"" + id + "\">" + elements[id][0] + "</div><br>" + document.getElementById(divid).innerHTML;
}
function updateDispElems() {
    let area = document.getElementById("elementArea");
    area.innerHTML = "";
    let col = "";
    let categories = [];
    let workingID;
    for (let i = 0; i < discovered.length; i++) {
        workingID = discovered[i];
        col = elements[workingID][1]
        if (!categories.includes(col)) {
            categories.push(col);
            document.getElementById("elementArea").innerHTML += "<div id=\"" + col + "\"></div>"
        }
        addElemToDoc(workingID, col);
    }
}
function updateNewElems () {
    try {
        let len = 16;
        let workingID;
        document.getElementById("newElemsList").innerHTML = "";
        if (newElemBuffer.length < 16) {
            len = newElemBuffer.length;
        }
        for (let i = len - 1; i > -1; i--) {
            workingID = newElemBuffer[i];
            document.getElementById("newElemsList").innerHTML += "<div class=\"elem " + elements[workingID][1] + "\">" + elements[workingID][0] + "</div><br>";
        }
    } catch(err) {
        alert(err);
    }
}
updateElemDisp();
updateDispElems();
updateNewElems();