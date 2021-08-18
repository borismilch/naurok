import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'firebase'
import firebase from 'firebase/app';
import {createNewUser, loginOldUser} from "./auth"
import { getStorage } from "firebase/storage";
import img from "../assets/images/logo"
import "./styles/style.scss";
import {createHeader, createFooter,createloader} from './Post.js'

import './styles/style.css'

const firebaseConfig = {
  apiKey: "AIzaSyCH9MfvoVNpYcA7oWATB8z0ScIin0_LOMI",
  authDomain: "naurok-753fe.firebaseapp.com",
  projectId: "naurok-753fe",
  storageBucket: "naurok-753fe.appspot.com",
  messagingSenderId: "238117807155",
  appId: "1:238117807155:web:cbc2ab6f63cf2fc5de2f46"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);





window.addEventListener('load', ()=>{
  const main = document.querySelector('main')
  main.insertAdjacentElement("beforebegin",createloader())
  setTimeout(()=>{
    main.insertAdjacentElement("beforebegin",createHeader(img))
    main.insertAdjacentElement("afterend",createFooter());
    main.style.opacity = 1;
    document.querySelector('.lds-hourglass').remove()
  }, 2000)

 const form =  main.querySelector('.auth-form')
 form.addEventListener('submit',(e)=> {e.preventDefault();getSubmitedData(e,form)}) 
 console.log(form, main)
})
function getSubmitedData(event,form){
 const btn = form.querySelector('[type = submit]')
  btn.disabled = true
  const name = form.querySelector('[data-value = name]') !== null? 
  form.querySelector('[data-value = name]').value : ''  
  const email = form.querySelector('[data-value = email]').value
  const password = form.querySelector('[data-value = password]').value
  event.target.dataset.form === "reg" ? createNewUser(email, password, name, btn) : loginOldUser(email, password ,btn)
}


  
