import { noop } from "jquery"
import myImg from "../../assets/images/dzvon"
function createResultScreen(selector){
    const resultScreen = document.querySelector(selector)
   
    resultScreen.insertAdjacentElement("afterbegin",createResultHeader())
    resultScreen.insertAdjacentElement("beforeend", createScreenPage())
  
    document.getElementById('result-submit').onclick = ()=>{
        window.location = './main.html'
    }

}

document.getElementById('results') ? createResultScreen('#results') : noop()



function createResultHeader(){
    const header = document.createElement('header')
    header.className = 'quiz-header justify-content-center result-container__header'
    header.insertAdjacentHTML('afterbegin', `<div class="quiz-header__logo"><img id="my-img" src="${myImg}" alt=""></div>`)
    return header
}

function createScreenPage(){
    const score = localStorage.getItem('score')
    const totalQuests = localStorage.getItem('totalQuests')
    const time = localStorage.getItem('timer')
    const percentage = (score / totalQuests) * 100;
    
    const block = document.createElement('div')
    block.className = 'result-container conteiner-fluid d-flex'

    block.insertAdjacentHTML("afterbegin", `<div class="result__window">
    <div class="result-head pb-5">
     <div class="result-head__testname">Дієслово</div>
     <div class="result-head__raiting">
         <span >${totalQuests}</span>
         <span>запитань</span>
     </div>
    </div>
    <div class="result-body pt-1">
        <div class="result-body__row row  d-block d-md-flex">
            <div class="result-body-item"> <div class="result-body-item__text justify-content-center justify-content-md-end"> Оцінка </div>
           <div class="result-body-item__button"><span > ${score} / ${totalQuests} </span> балів</div>
         </div>
     </div>
 
        <div class="result-body__row row d-block d-md-flex">
         <div class="result-body-item"> 
         <div class="result-body-item__text justify-content-start"> Cума балів
         </div>
         <div class="result-body-item__button">
          <span >${score} / ${totalQuests} </span></div>
 
       </div>
       <div class="result-body-item"> <div class="result-body-item__text "> Результат </div>
       <div class="result-body-item__button">
           <span >${percentage}% </span></div>
     </div>
         
        
        </div>
     </div>
     <div class="row my-3 result-body-progress d-block d-md-flex align-items-center">
         <span class="result-body__acc"> Точність</span>
          <div class="progress">
          <div class="progress-bar" role="progressbar" data-info="percents" style="width:${percentage || 9}%;"  aria-valuemin="7" aria-valuemax="100">${percentage}%</div>
        </div>
     </div>
     <div class="result-information">
  
     <div class="result-information__row">
         <div class="result-information__item"><span>${score}</span> Правельних</div>
         <div class="result-information__item"><span>${totalQuests - score}</span> Неправельних</div>
         <div class="result-information__item d-none d-md-block"><span>${score}</span> Зараховано</div>
     </div>
     <div class="result-information__row">
         <div class="result-information__item"> Всього часу <span>${time} сек</span></div>
         <div class="result-information__item"><span>${(time/totalQuests).toFixed(2)}</span> Ср. час на запитання</div>
     </div>
     </div>
     <button type="submit" id="result-submit" class="btn btn-warning text-white d-block w-100 btn-block py-2 my-4">Вернутись на головну</button>
 </div>
    
    `)
    return block
   
}