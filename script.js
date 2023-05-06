let correction = [];
let score = 0;
let subBtn;
let clickedButton;
let i = 0;
let j;
let question1 = [];
let answer1 = [];
let type;
let category;
let index;
let currentQuestionIndex = 0;
let a;
let limit;
let res;
// let correction;
function sub() {
    container.style.display = "none";
    let t = document.getElementById("category").value;
    let d = document.getElementById("difficulty").value;
    let a = document.getElementById("number").value;
    limit = a;
    let f = fetch(`https://opentdb.com/api.php?amount=${a}&category=${t}&difficulty=${d}&type=multiple`);
    f.then((value) => {
        return value.json();
    }).then((valuee) => {
        console.log(valuee);
        for (let i = 0; i < a; i++) {
            category = valuee.results[i].category;
            question1[i] = [`${valuee.results[i].question}`];
            answer1[i] = [`${valuee.results[i].correct_answer}`, `${valuee.results[i].incorrect_answers[0]}`, `${valuee.results[i].incorrect_answers[1]}`, `${valuee.results[i].incorrect_answers[2]}`];
            shuffle(answer1[i]);
            valuee.results[i].question.answered = false;
            correction[i] = valuee.results[i].correct_answer;
        }
        displayQuestion(currentQuestionIndex)
    });
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function displayQuestion(i) {
    ihtml = `<div id="dnone">
                <div id="uppar">
                <p id="categorys">category : ${category}</p>
                <hr class="frst">
                <p id="quesnos">Question no : ${i + 1}</p>
                </div>
                <p id="questions">question : ${question1[i]}</p>
                <div id="onces" onclick="odacv()">
                    <button class="cmp" id="chk" onclick="answer(this, ${i})">${answer1[i][0]}</button>
                    <button class="cmp" id="chk1" onclick="answer(this, ${i})">${answer1[i][1]}</button>
                    <button class="cmp" id="chk2" onclick="answer(this, ${i})">${answer1[i][2]}</button>
                    <button class="cmp" id="chk3" onclick="answer(this, ${i})">${answer1[i][3]}</button>
                </div>
                <hr class="frsts">
            </div>`;
    document.getElementById("y").innerHTML = ihtml;
    if(i < limit - 1){
        i++; 
        ihtml = `<button id="next-btn" disabled onclick="displayQuestion(${i})">Next</button>`;
        document.getElementById("nex").innerHTML = ihtml;    
    }
    else{
        ihtml = `<button id="next-btn" disabled onclick="result()">Result</button>`;
        document.getElementById("nex").innerHTML = ihtml;
    }
}
function answer(clickedAnswer, item) {
    const correctAnswerBtn = document.querySelector(`#onces button:nth-of-type(${answer1[item].indexOf(correction[item]) + 1})`);
    clickedAnswer.style.color = "#FFE77AFF";
    correctAnswerBtn.style.backgroundColor = "rgb(69, 203, 69)";
    if (clickedAnswer.innerText == correction[item]) {
        document.getElementById("z").innerHTML = "Correct Answer";
        score += 10;
        document.getElementById("yz").innerHTML = "Your Score is : " + score + " points";
    } else {
        document.getElementById("z").innerHTML = "Incorrect Answer";
        score -= 5;
        document.getElementById("yz").innerHTML = "Your Score is : " + score + " points";
    }
    const nextBtn = document.getElementById("next-btn");
    nextBtn.removeAttribute("disabled");
}

function odacv() {
    subBtn = document.getElementById("chk")
    subBtn.setAttribute("disabled", "true");
    subBtn = document.getElementById("chk1")
    subBtn.setAttribute("disabled", "true");
    subBtn = document.getElementById("chk2")
    subBtn.setAttribute("disabled", "true");
    subBtn = document.getElementById("chk3")
    subBtn.setAttribute("disabled", "true");
} 
function result(){
    document.getElementById("conclusion").innerHTML = "Hope you enjoyed it very well."
    res = score;
    document.getElementById("res").innerHTML = "your final score is : " + res + " points"; 
    dnone.style.display = "none";
    z.style.display = "none";
    yz.style.display = "none";
    nex.style.display = "none";
    ihtml = ""
    ihtml += `<button id="replay" onClick="window.location.reload();">Play Again</button>`
    document.getElementById("start").innerHTML = ihtml;
}
