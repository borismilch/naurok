import { noop } from "jquery";
import planet from "../../assets/images/planet.svg"
import phone from "../../assets/images/phone"
const formParent =  document.getElementById('main-form-parent') 
const mainAuth = document.getElementById('main-auth');


function backgrounder(elem, img , color = 'fff', str =''){
elem.style.background = `#${color} url(${img}) no-repeat ${str}`
}



formParent? backgrounder(formParent, planet, 'fff', 'calc(100% + 0px) calc(100%) ') : nooop()


mainAuth ? backgrounder( mainAuth, phone, 'f8f9fa', '80% 40%'  ) : nooop()

function nooop(){}
