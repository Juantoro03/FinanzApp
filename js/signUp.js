import {getUsers,saveUsers,getUser,getIndex,getToken} from'./localStorage.js'
import {User} from './user.js'


function loadNav(){
    let token=getToken()
    let nav=document.getElementById("nav")
    if(token==="no hay token"){
        nav.innerHTML=`<a href="../index.html">Inicio</a>
        <a href="./components/aboutUs.html">Nosotros</a>
        <a href="./components/login.html">Iniciar Sesión</a>
        `
    }else{
        nav.innerHTML=`<a href="../index.html">Inicio</a>
        <a href="./components/aboutUs.html">Nosotros</a>
        <a href="../components/profile.html">Perfil</a>
        `

    }
    
}
window.onload=loadNav();


let bnt=document.getElementById("btn")
export function signUp(){
    let users=getUsers()//aqui llamamos a la funcion para obtener los usuarios del local storage
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let confirmPassword= document.getElementById("confirmPassword").value
    let validation=users.filter(user=> user.email==email)
    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar correos electrónicos

    if (!emailRegex.test(email)) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "Ingresa un correo electronico!",
            icon: "warning",
            timer: 3000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
          console.log("error")
        return; // Detenemos la ejecución si el correo no es válido
    }
    if(password!==confirmPassword){
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "Las contraseñas no coinciden!",
            icon: "warning",
            timer: 3000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return;
    }
    if(validation.length!=0){
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "ya hay un usuario registrado con este corrreo!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
          return;
    }
    if(password.length<8){
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "la contraseña debe contener al menos 8 caracteres!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
          return;
    }
    let id=users.length==0? 0 : users[users.length-1].id //obtenemos el id del ultimo usuario registrado para asignarle un id al nuevo usuario
    users.push(new User(id+1,name,email,password))
    let newList=[...users] // copiamos la lista y la enviamos para que sea guardada en el localstorage
    saveUsers(newList)
    Swal.fire({
        title: "¡Bien hecho!",
        text: "te has registrado exitosamente!",
        icon: "success",
        timer: 4000, // Tiempo en milisegundos (3 segundos)
        showConfirmButton: false, // Oculta el botón de confirmación
        });

    
    
    
}
if(!bnt==null){
    bnt.addEventListener('click',()=>signUp())
}


