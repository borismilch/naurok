export function createHeader(img){
    const header = document.createElement('nav');
    header.className = "navbar shadow-sm navbar-expand-lg navbar-light bg-light fixed-top"
    header.insertAdjacentHTML("afterbegin", `  <div class="container-md">
    <a class="navbar-brand" href="#"><img src="${img}"></a>
    <button class="header__toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="header__toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
        <li class="nav-item">
          <a class="nav-link link" href="#">Курси</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link" href="#">Вебінари</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link" href="#">Олімпіада</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link" href="#">Конкурси</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link" href="#">Тести</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link" href="#">Журнал</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link" href="#">Розклад уроків</a>
        </li>
      </ul>
      <div class="d-block d-lg-flex">
      <li class="nav-item">
          <a class="nav-link link hover" href="./index.html">Вхід</a>
        </li>
        <li class="nav-item">
          <a class="nav-link link" href="./register.html">Реєстрація</a>
        </li>
      </div>
    </div>
    </div>`)
    
    return header
    }
   export function createFooter(){
     const footer =  document.createElement('footer');
     footer.classList.add('footer');
     footer.insertAdjacentHTML("afterbegin", ` <div class="container">
     <div class="footer-table px-md-0 d-block d-md-flex">
       <div class="footer-table__item">
         <a href="" class="footer-table__link">Онлайн-курси</a>
         <a href="" class="footer-table__link">Олімпіади</a>
         <a href="" class="footer-table__link">Конкурси</a>
         <a href="" class="footer-table__link">Тести</a>
         <a href="" class="footer-table__link">Вебінари</a>
         <a href="" class="footer-table__link">Журнал</a>
       </div>
       <div class="footer-table__item">
         <a href="" class="footer-table__link">Про школу</a>
         <a href="" class="footer-table__link">Політика Конфінденційності</a>
         <a href="" class="footer-table__link">Угода користувача</a>
         <a href="" class="footer-table__link">Умови користування</a>
       <div class="footer-table-social">
         <a class="footer-table-social__item">
           <i class="bi bi-facebook"></i>
         </a>
         <a class="footer-table-social__item">
           <i class="bi bi-instagram"></i>
         </a>
         <a class="footer-table-social__item">
           <i class="bi bi-youtube"></i>
         </a>
       </div>
       </div>
       <div class="footer-table__item">
         <a href="" class="footer-table__link">Каталог курсів</a>
         <a href="" class="footer-table__link">Підготовка до ЗНО</a>
         <a href="" class="footer-table__link">Підготовка до ДПА</a>
         <a href="" class="footer-table__link">Курси з математики</a>
         <a href="" class="footer-table__link">Курси з Англвйської мови</a>
         <a href="" class="footer-table__link">Вичладачі</a>
         <a href="" class="footer-table__link">Відгуки</a>
       </div>
       <div class="footer-table__item">
         <a href="" class="footer-table__link">Контакти</a>
         <a href="" class="footer-table__link">Facebook Massenger</a>
         <a href="" class="footer-table__link">Email:builitomil@gmail.com</a>
        
       </div>
       
     </div>
     <div class="footer-copyright">
       © 2017-2021 «На Урок»
     </div>
    </div>`)
     return footer
    }
   export function createloader(){
    const loader = document.createElement('div');
    loader.classList.add('lds-hourglass')
    return loader
    
    }