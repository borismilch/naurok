import { noop } from "jquery";
import json from "../../assets/quiz.json"
import myImg from "../../assets/images/dzvon"
let c = 0;
let score = 0;
let timer = 0;
 function createQuiz(selector){
    setInterval(()=>{timer++; localStorage.setItem("timer", timer); console.log(timer)}, 1000)
    const output = document.querySelector(selector);
    const quests =  createQuizArray(json);
    localStorage.setItem('totalQuests', quests.length)
    quests.forEach((item)=> output.insertAdjacentElement("beforeend",item))
    output.insertAdjacentElement("afterbegin", createQuizHeader())

    output.addEventListener("click",quizHandler)
    goToNextTest(output)
}
setTimeout(()=> console.log(json), 2000)

document.getElementById('quiz') ? createQuiz('#quiz') : noop()


function quizHandler(e){
    const output = document.getElementById('quiz')
    console.log(e.target)
    if(e.target.classList.contains('quiz-tests__item')){
        output.removeEventListener('click', quizHandler)
        setTimeout(()=>{showTrueAnsvears(output)},500)
        setTimeout(()=> {goToNextTest(output); output.addEventListener('click',quizHandler)},2000)
    }
    if(e.target.dataset.action === "dismiss"){goToResultPage()}
    if(e.target.dataset.value == "true") score++;
    localStorage.setItem('score', score)
    
}

function createQuizArray(array, arr2 =[]){
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
       arr2.push(createQuizItem(element))
    }
    return arr2
}

function createQuizItem(obj){
    const testi = document.createElement('div');
    testi.classList.add('quiz__wrapper');
    testi.insertAdjacentHTML("afterbegin", `<div class="quiz-tests"  data-id="${obj.id}">
    <div class="quiz-tests__inner">${obj.ask}</div>
    <div class="quiz-tests__row">
        <div class="quiz-tests__item" data-value="${obj.array[0]['value']}"> ${obj.array[0]['ansvear']} </div>
        <div class="quiz-tests__item" data-value="${obj.array[1]['value']}">${obj.array[1]['ansvear']}</div>
        <div class="quiz-tests__item" data-value="${obj.array[2]['value']}"> ${obj.array[2]['ansvear']}  </div>
        <div class="quiz-tests__item" data-value="${obj.array[3]['value']}"> ${obj.array[3]['ansvear']}  </div>
    </div></div>`)
    return testi
}

function showTrueAnsvears(output){
  const testsField = output.querySelectorAll('.quiz-tests')[c]
  const uncorrect = testsField.querySelectorAll('[data-value = false]');
  const correct = testsField.querySelector('[data-value = true]');
  uncorrect.forEach(item => item.classList.add('uncorrect'));
  correct.classList.add('correct')
  
}

function goToNextTest(output){
   const items =  output.querySelectorAll('.quiz__wrapper')
   c++

   document.getElementById('counter').textContent = +c
    document.getElementById('all').textContent = items.length;
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.classList.remove('show');
        if(element.firstChild.dataset.id == c) element.classList.add('show')
    }
   
   if(c === items.length) goToResultPage();
}

function goToResultPage(){
    window.location = "./results.html"
}

function createQuizHeader(){
    const header = document.createElement('header')
    header.classList.add('quiz-header');
    header.insertAdjacentHTML('afterbegin', `<div class="quiz-header-counter"> <span class="quiz-header-counter__count" data-counter="counter" id="counter">1</span> / <span class="quiz-header-counter__all" data-counter="all" id="all"12</span> </div>
    <div class="quiz-header__logo"><img id="my-img" src="${myImg}" alt=""></i></div>
    <div class="quiz-header__dismiss" > <a href="" data-action="change">А Дислекція</a> <i data-action="dismiss" class="bi bi-x-lg"></i></div>`)
    return header
}
