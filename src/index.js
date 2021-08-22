import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
import 'firebase'
import firebase from 'firebase/app';
import {createNewUser, loginOldUser} from "./auth"
import { getStorage } from "firebase/storage";
import img from "../assets/images/logo"
import "./styles/style.scss";
import {createHeader, createFooter,createloader, createTestItem} from './Post.js'
import "./scripts/backgrounds"
import './styles/style.css'
import { noop } from 'jquery';
import json from '../assets/tests.json'
import "./scripts/img"
import { select } from 'async';
import "./scripts/quiz"
import  "./scripts/result"
const firebaseConfig = {
  apiKey: "AIzaSyCH9MfvoVNpYcA7oWATB8z0ScIin0_LOMI",
  authDomain: "naurok-753fe.firebaseapp.com",
  projectId: "naurok-753fe",
  storageBucket: "naurok-753fe.appspot.com",
  messagingSenderId: "238117807155",
  appId: "1:238117807155:web:cbc2ab6f63cf2fc5de2f46"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
   
   createUsersProfile(user)
   // window.location = "http://localhost:8080/main.html"
   const uid = user.uid;
   console.log(uid)
  } else {
    
    // window.location = "http://localhost:8080/index.html"
  }
});

function createUsersProfile(user){
  const email = user.email;
  
  
  
}


window.addEventListener('load', ()=>{
  console.clear()
  json = JSON.stringify(json)
  json = JSON.parse(json)
  const tests = arrFromJson(json)
  const main = document.querySelector('main')
  const form =  main?  main.querySelector('.auth-form') : null;
  const output = document.getElementById('tests-output');
  const reslts = document.getElementById('results')
  let j = 0;
  const select =  document.getElementById('select')
  select? select.addEventListener('change', testsSort) : noop()
  createCollection(output, tests)
  const quiz =document.getElementById('quiz')

  main? main.insertAdjacentElement("beforebegin",createloader()) : quiz? quiz.insertAdjacentElement("beforebegin",createloader()) : results.insertAdjacentElement("beforebegin",createloader())
  setTimeout(()=>{
    main ? main.insertAdjacentElement("beforebegin",createHeader(img)) : noop()
    main? main.insertAdjacentElement("afterend",createFooter()):noop()
    main? main.style.opacity = 1 : quiz? quiz.style.opacity = 1 : results.style.opacity =1
    main? main.style.visibility = 'visible' : quiz? quiz.style.visibility = "visible" : results.style.visibility = "visible"
    document.querySelector('.lds-wrapper').remove()
  }, 2000)
  
  document.addEventListener('click', (e)=>{
    if(e.target.dataset.action ==="init"){
      window.location = './test.html'
    }
  })
  
 form ? form.addEventListener('submit',(e)=> {e.preventDefault();getSubmitedData(e,form)}) : noop()
 output? output.addEventListener('click', testsModalCreator) : noop()

})
function getSubmitedData(event,form){
 const btn = form.querySelector('[type = submit]')
 
  const name = form.querySelector('[data-value = name]') !== null? 
  form.querySelector('[data-value = name]').value : ''  
  const email = form.querySelector('[data-value = email]').value
  const password = form.querySelector('[data-value = password]').value

  btn.disabled = true
  if(event.target.dataset.form === "reg"){createNewUser(email, password, name, btn)}
  else if (event.target.dataset.form === "auth"){ loginOldUser(email, password ,btn)}
  else{
    noop()
  }


}

function arrFromJson(json, arr=[]){
  for (let i = 0; i < json.length; i++) {
    const element = json[i];
    arr.push(createTestItem(element))
  }
  return arr
}
function testsSort(){
 console.log(this.value,  Array.isArray(json))
 this.value == 1? json.sort((a, b) => a.questions - b.questions).reverse() : this.value == 2? json.sort((a, b) => a.visits - b.visits).reverse() : json.sort((a, b) => a.id - b.id)
 const jarr =  arrFromJson(json);
 const output =  document.getElementById('tests-output')
  output.innerHTML = '';
  createCollection(output, jarr)
  //output.querySelectorAll('')
}  

function testsModalCreator(e){
  console.log(e.target.dataset)
  let test = e.target.closest('[data-id]')
 if(test){
   console.log(test.dataset.id, json[test.dataset.id])
   const elem  = modaller(json[test.dataset.id]);
   const modal = new bootstrap.Modal(elem)
   console.log(modal)
   modal.show()

 }

}

function createCollection(output, tests, j=0){
  for (let i = 0; i < 20; i++) {
    j >= tests.length - 1 ? j = 0 : j++;
    const element = tests[j].cloneNode(true);
    output ? output.insertAdjacentElement("beforeend", element) : noop()
    output ? output.querySelectorAll('.ops').forEach((item) => {setTimeout(()=> item.style.opacity = 1), 200}) : noop()
    

  }
}

function modaller(obj){
 const modal =  document.createElement('div');
 modal.className = "modal fade"
 
 modal.insertAdjacentHTML('afterbegin', `<div class="modal-dialog tests-modal">
      <div class="modal-content ">
        <div class="modal-header tests-modal__previev d-flex flex-column">
        <button type="button" class="croos btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         <div class="tests-modal__img w-100">
          <img src="${obj.img}" class="w-100" alt="">
          <div class="tests-modal-overlay d-flex justify-content-beetween align-items-end">
            <div class="tests-modal-overlay__quests">${obj.questions} запитань</div>
            <div class="tests-modal-overlay__vievs">${obj.visits} відвідали</div>
            
          </div>
         </div>
         <div class="tests-modal__heading">
        <h3 class="tests-modal__title">${obj.text}</h3>
        <div class="tests-modal-categoies d-flex ">
          <div class="tests-modal-categoies__author">Більчевич Мийло</div>
          <div class="tests-modal-categoies__category"><span>${obj.category}</span> </div>
        </div>
      </div>
        </div>
        <div class="modal-body">
         <span>Приклади запитань</span>
         <ol class="tests-modal__list">
           <li class="tests-modal__li">1.${obj.example[0]}</li>
           <li class="tests-modal__li">2.${obj.example[1]}</li>
           <li class="tests-modal__li">3.${obj.example[2]}</li>
         </ol>
        </div>
        <div class="modal-footer">
          <button type="button" data-action="init" class="btn  text-white d-block w-100 btn-block my-3 py-2 tests-btn"><i class="bi bi-play-fill"></i>Лиш попробуй</button>
        </div>
      </div>
    </div>
  
 `)
 return modal
}