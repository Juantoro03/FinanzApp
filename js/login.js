import {getUsers,saveUsers,getUser,getIndex} from'./localStorage.js'
import {User} from './user.js'

let btn=document.getElementById("send")

// validamos si el correo y la contraseña son correctos para iniciar sesion y si lo son creamos un token 
export function login(){
    let users=getUsers()
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let user= users.filter(user=> user.email ==email && user.password==password)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos electrónicos

    if (!emailRegex.test(email)) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "Ingresa un correo electronico!",
            icon: "warning",
            timer: 3000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return; // Detenemos la ejecución si el correo no es válido
    }
    if(password.length<1){
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "¡ingresa una contraseña!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
          return;
    }
    if(user.length==0){
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "Contraseña o correo incorrecto!",
            icon: "error",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
          return;
    }
    
    localStorage.removeItem('token')
    localStorage.setItem('token',user[0].id)//+Math.random().toString(36).substr(2)
    Swal.fire({
        title: "¡Bienvenido!",
        text: "Disfruta de todas las herramientas que te ofrecemos!",
        icon: "success",
        timer: 4000, // Tiempo en milisegundos (3 segundos)
        showConfirmButton: false, // Oculta el botón de confirmación
        });
        setTimeout(()=>{window.location.href = "/index.html";},4000)

   
}
// login()
btn.addEventListener('click',()=>{login()})



