document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      combine();
      updateElemDisp();
    }
});

var elemCreate = document.getElementById("elemCreate");
var elemName = document.getElementById("elemName");
var elemColor = document.getElementById("colorSelect");
elemCreate.style = "display: none;";

var playArea = document.getElementById("playArea");
var newElemBuffer = [];
var reverse = document.getElementById("reverse");
var elements = {"0":["Air","lightblue"],"1":["Earth","brown"],"2":["Fire","red"],"3":["Water","blue"],"4":["Dust","gray"],"5":["Ash","black"],"6":["Heat","red"],"7":["Lava","orangered"],"8":["Magma","orangered"],"9":["Bubble","blue"],"10":["Mist","lightblue"],"11":["Dirt","brown"],"12":["Mud","brown"]}

var recipes = {"0":{"1":4,"3":10},"1":{"0":4,"2":5,"3":12,"4":11,"6":7,"7":8},"2":{"1":5,"2":6},"3":{"0":9,"1":12,"11":12},"4":{"1":11},"5":{},"6":{"1":7},"7":{"1":8},"8":{},"9":{},"10":{},"11":{"3":12},"12":{}}

var createPopup = false;
var menu = false;

var discovered = [0, 1, 2, 3];

var selected = [-1, -1];

var product;

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
            newElemBuffer.push([product, selected[0], selected[1]]);
            updateNewElems();
            finCombine();
        } else if (product === undefined) {
            if (!menu && !createPopup) {
                selectedPrev = selected;
                elemName.classList = "elem red";
                elemCreate.style = "display: block;";
                elemName.focus();
                createPopup = true;
            }
        }
        
    }
    
}
function finCombine () {
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
    let newList = document.getElementById("newElemsList");
    newList.innerHTML = ""

    let maxLen = 16;
    if (newElemBuffer.length < maxLen) {
        maxLen = newElemBuffer.length;
    }

    for (let i = maxLen - 1; i >= 0; i--) {
        newList.innerHTML += "<div class=\"elem " + elements[newElemBuffer[i][1]][1] + "\">" + elements[newElemBuffer[i][1]][0] + "</div>" + "+" + "<div class=\"elem " + elements[newElemBuffer[i][2]][1] + "\">" + elements[newElemBuffer[i][2]][0] + "</div>" + "=" + "<div class=\"elem " + elements[newElemBuffer[i][0]][1] + "\">" + elements[newElemBuffer[i][0]][0] + "</div>" + "<br>"
    }
}
var selectedPrev = [];
function inputElemData () {
    createPopup = false;
    elemCreate.style = "display: none;";
    let response = [elemName.value, elemColor.value];
    let elemNames = [];
    for (let i = 0; i < Object.keys(elements).length; i++) {
        elemNames.push(elements[i][0]);
    }
    
    let elemExists = false;
    if (elemNames.includes(response[0])) {
        elemExists = true;
        console.log("found element exists already")
        let nameElems = reverseDict(elemNames);
        workingID = nameElems[response[0]];
        recipes[selectedPrev[0][selected[1]]] = workingID;
        newElemBuffer.push([workingID, selectedPrev[0], selected[1]]);
        if (reverse.checked) {
            recipes[selectedPrev[1][selected[0]]] = workingID;
        }
    }
    
    if (!elemExists) {
        elements[Object.keys(elements).length] = [response[0], response[1]];
        discovered.push(Object.keys(elements).length - 1);
        recipes[Object.keys(elements).length - 1] = {};
        newElemBuffer.push([Object.keys(elements).length - 1, selectedPrev[0], selectedPrev[1]]);
        recipes[selected[0]][selected[1]] = Object.keys(elements).length - 1;
    }
    
    if (reverse.checked && !elemExists) {
        if (!recipes[selected[1]][selected[0]]) {
            recipes[selected[1]][selected[0]] = Object.keys(elements).length - 1;
        }
    }
    updateDispElems();
    updateNewElems();
    updateElemDisp();
    finCombine();
    elemName.value = "";
    elemColor.value = "red";
}
function updateColorCreate () {
    elemName.classList = "elem " + elemColor.value;
}
function copyData () {
    alert("Data Copied!")
    navigator.clipboard.writeText(JSON.stringify(elements) + "\n" + JSON.stringify(recipes));
}
function showMenu () {
    if (!menu && !createPopup) {
        document.getElementById("menu").style = "display: block";
        menu = true;
    } else {
        document.getElementById("menu").style = "display: none";
        menu = false;
    }
}
function reverseDict (dict) {
    let keys = Object.keys(dict);
    let vals = Object.values(dict);
    let fin = {}
    for (let i = 0; i < keys.length; i++) {
        fin[vals[i]] = keys[i];
    }
    return fin;
}
updateElemDisp();
updateDispElems();
updateNewElems();