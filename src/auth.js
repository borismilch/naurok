import firebase from "firebase";

export function createNewUser(email, password, name, button){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      localStorage.setItem('userName' , name)
      const user = userCredential.user;
      
    })
    .then(()=>{window.location = "http://localhost:8080/main.html"})
    .catch((error) => {
      alert('Причина помилки:' + error.message )
        button.disabled = false
     
    });
  
}
export function loginOldUser(email, password, button){
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    
  })
  .then(()=>{window.location = "http://localhost:8080/main.html"})
  .catch((error) => {
      button.disabled = false
    alert('Зареєструйся, чоловіче')
  });
}
