//A bunch of variables
let goalsList = []
let crossedList = []
let saveList = []
let count;

const saveBtn = document.querySelector("#save-btn")
const clearBtn = document.querySelector("#clear-btn")
const refreshBtn = document.querySelector("#refresh-btn")
const listEl = document.querySelector("#list-ul")
let inputEl = document.querySelector("#input-el")
let checkBtn = document.querySelectorAll(".check-btn")
let catchVariable;

const goalsLocalStorage = JSON.parse(localStorage.getItem("goalsList")); //save the data from the local storage in the variable


if (goalsLocalStorage) { //checks if the storage is empty or not
    goalsList = goalsLocalStorage
    render(goalsList)
    console.log(goalsList)
}
else {
    console.log("The local storage is empty")
}
checks()//To form an array anyway


//Event listeners
saveBtn.addEventListener("click", el =>{
    console.log("save button has been clicked")
    goalsList.push(inputEl.value)
    inputEl.value = null
    render(goalsList)
    checks()
})
clearBtn.addEventListener("dblclick", el =>{
    goalsList = []
    localStorage.clear()
    console.log(goalsList)
    render(goalsList)
})
refreshBtn.addEventListener("click", el =>{
    // count = 0
    // crossedList.forEach(el =>{
    //     goalsList.splice(el, 1)
    // })
    crossedList.sort() //Without this sort function it doesn't work in reversed order ( like [5, 4] )
    nuevo = goalsList
    console.log(nuevo);
    for (var i = crossedList.length - 1; i >= 0; i--)
        nuevo.splice(crossedList[i],1);
    goalsList = nuevo;
    console.log(goalsList)
    console.log(crossedList)
    localStorage.setItem("goalsList", JSON.stringify(goalsList))
    crossedList = []
    render(goalsList)
    checks()

})







//Functions ( be careful, you are entering a jungle of the wild functions ( they are so confusing and dangerous, it would be better if you do not touch them ))
function render(list) {
    listEl.innerHTML = null;
    for (let index = 0; index < list.length; index++) {
        listEl.innerHTML += `<li>
        <p id="id${index+1}">${index+1}.${list[index]}</p>
        <button class="check-btn" id="${index+1}">${"✔"}</button>
        </li>`
    }
    localStorage.setItem("goalsList", JSON.stringify(goalsList))
}

function checks() {
    checkBtn = document.querySelectorAll(".check-btn")
    checkBtn.forEach(el => {
        firstPress(el) //Method of functions, because for some reasons just adding another eventListener doesn't work properly
    })
}

function cancelFunc(el, catchVariable) {
    el.addEventListener("click", function cF(){
        console.log("works")
        el.style.backgroundColor = 'gray'
        catchVariable.style.textDecoration = 'none'
        crossedList.splice(crossedList.indexOf(el.getAttribute("id")-1), 1) //Remember IndexOf operator it's quire useful
        console.log("Crossed list: "+ crossedList )
        el.removeEventListener("click", cF)
        firstPress(el)
    })
}

function firstPress(el) {
    el.addEventListener("click", function tF(){  //Creating a click listener for each generated button
        el.style.backgroundColor = 'white'
        console.log(el)
        console.log(document.querySelector(`#id${el.getAttribute("id")}`)) //Kinda crazy, but it works WOOOHOOO
        catchVariable = document.querySelector(`#id${el.getAttribute("id")}`)
        catchVariable.style.textDecoration = 'line-through' //Change the style of the paragraph ( cross it through )
        console.log(catchVariable)
        crossedList.push(el.getAttribute("id")-1)
        saveList = crossedList;
        console.log(goalsList)
        console.log(crossedList)
        el.removeEventListener("click", tF)
        cancelFunc(el, catchVariable)
    })
}


function checkAge(el, age) {
    return age > (el.getAttribute("id")-1)
}