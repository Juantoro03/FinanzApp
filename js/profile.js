import {getUsers,saveUsers,getUser,getIndex,getToken} from'./localStorage.js'
import {Movement} from './movement.js'



function logOut(){
    localStorage.removeItem("token")
    Swal.fire({
        title: "¡Adiós!",
        text: "te esperamos pronto!",
        icon: "warning",
        timer: 4000, // Tiempo en milisegundos (3 segundos)
        showConfirmButton: false, // Oculta el botón de confirmación
      });
    setTimeout(()=>{window.location.href = "/index.html"},4000)

}
let bntLogOut=document.getElementById("logOut")
bntLogOut.addEventListener('click',()=>{
    logOut()
    setTimeout(()=>{window.location.href = "/index.html";},5000)
})

 function loadUser(){
    let user=getUser()
    let name=document.getElementById("name")
    let email=document.getElementById("email")
    let amount=document.getElementById("amount")
    let image=document.getElementById("image")

    name.innerHTML="Nombre: "+user.name;
    image.innerHTML=user.name.toUpperCase().charAt(0)
    email.innerHTML="E-mail: "+user.email;
    amount.innerHTML="Monto Actual: "+user.amount;
 }
 window.onload=loadUser()

 function egreso(){
    let users=getUsers()
    let description=document.getElementById("descriptionEgreso").value
    let value=document.getElementById("valueEgreso").value
    let type='egreso'
    if (!value || isNaN(value) || Number(value) <= 0) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "¡Por favor, ingresa un valor válido en el campo.!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return; // Detener la ejecución si la validación falla
    }
    if (!description  || description.length <= 0) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "¡Por favor, ingresa un valor válido en el campo.!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return; // Detener la ejecución si la validación falla
    }
    let token=getToken()
    let user=users.filter(user=>user.id==token) // obtenemos el objeto por medio del token
    let code=user[0].movements.length //obtenemos el codigo del ultimo moviento realizado
    user[0].movements.push(new Movement(code+1,description,value,type)) //al array de movimientos del usuario logueado le vamos a agregar el nuevo movimiento
    let index=getIndex() //buscamos al usuario en la lista por medio de su index
    users[index]=user[0] //modificamos el array users con el nuevo usuario en el indice indicado
    saveUsers(users)
    Swal.fire({
        title: "Información",
        text: "¡Egreso Creado!",
        icon: "success",
        confirmButtonText: "ok",
    });
    loadTable()

  }
  let btnEgreso=document.getElementById("btnEgreso")
  btnEgreso.addEventListener('click',()=>{egreso()})

  function ingreso(){
    let users=getUsers()
    let description=document.getElementById("descriptionIngreso").value
    let value=document.getElementById("valueIngreso").value

    let type='ingreso'
    if (!value || isNaN(value) || Number(value) <= 0) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "¡Por favor, ingresa un valor válido en el campo.!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return; // Detener la ejecución si la validación falla
    }
    if (!description  || description.length <= 0) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "¡Por favor, ingresa un valor válido en el campo.!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return; // Detener la ejecución si la validación falla
    }
    let token=getToken()
    let user=users.filter(user=>user.id==token) // obtenemos el objeto por medio del token
    let code=user[0].movements.length //obtenemos el codigo del ultimo moviento realizado
    user[0].movements.push(new Movement(code+1,description,value,type)) //al array de movimientos del usuario logueado le vamos a agregar el nuevo movimiento
    let index=getIndex() //buscamos al usuario en la lista por medio de su index
    users[index]=user[0] //modificamos el array users con el nuevo usuario en el indice indicado
    saveUsers(users)
    Swal.fire({
        title: "Información",
        text: "¡Ingreso Creado!",
        icon: "succes",
        confirmButtonText: "ok",
    });
    loadTable()

  }
  let btnIngreso=document.getElementById("btnIngreso")
  btnIngreso.addEventListener('click',()=>{ingreso()})
  // movement()



//crear funcion para crear el amount y actualizarlo
export  function amount(){
    let users=getUsers()
    let user=getUser()
    let value=document.getElementById("amount").value
    if (!value || isNaN(value) || Number(value) <= 0) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "¡Por favor, ingresa un valor válido en el campo.!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return; // Detener la ejecución si la validación falla
    }
    let index=users.findIndex(userToFind=>userToFind.id===user.id) //buscamos al usuario en la lista por medio de su index
    user.amount=value
    users[index]=user //modificamos el array users con el nuevo usuario en el indice indicado
    saveUsers(users)
    loadCategories()
}
let btnAmount=document.getElementById("btnAmount")
btnAmount.addEventListener('click',()=>{amount()})


//nos permite recuperar los datos del usuario e imprimirlos en pantalla
function loadCategories(){
    let user=getUser()
    if(user==='no hay token'){
        return;
    }
    let {amount,savings,investments}=user
    let textAmount=document.getElementById("textAmount")
    let textSaving=document.getElementById("textSaving")
    let textInvestment=document.getElementById("textInvestment")
    textAmount.textContent=amount ==undefined?"$"+0.00+"COP":"$"+amount+" - COP"
    textSaving.innerHTML=savings ==undefined?"$"+0.00+" COP":"$"+savings+" - COP"
    textInvestment.innerHTML=investments==undefined?"$"+0.00+" COP":"$"+investments+" - COP"
}
window.onload=loadCategories()




//crear funcion para crear la inversion y actualizar
export  function investments(){
    let users=getUsers()
    let user=getUser()
    let value=document.getElementById("investment").value
    console.log(value)
    if (!value || isNaN(value) || Number(value) <= 0) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "¡Por favor, ingresa un valor válido en el campo.!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return; // Detener la ejecución si la validación falla
    }
    let index=users.findIndex(userToFind=>userToFind.id===user.id) //buscamos al usuario en la lista por medio de su index
    user.investments=value
    users[index]=user //modificamos el array users con el nuevo usuario en el indice indicado
    saveUsers(users)
    loadCategories()
    

}
// investments()
let btnInvestment=document.getElementById("btnInvestment")
btnInvestment.addEventListener('click',()=>{investments()})


//crear funcion para crear el ahorro y actualizarlo
export  function savings(){
    let users=getUsers()
    let user=getUser()
    let value=document.getElementById("saving").value
    if (!value || isNaN(value) || Number(value) <= 0) {
        Swal.fire({
            title: "¡Oh, Oh!",
            text: "¡Por favor, ingresa un valor válido en el campo.!",
            icon: "warning",
            timer: 4000, // Tiempo en milisegundos (3 segundos)
            showConfirmButton: false, // Oculta el botón de confirmación
          });
        return; // Detener la ejecución si la validación falla
    }
    let index=users.findIndex(userToFind=>userToFind.id===user.id) //buscamos al usuario en la lista por medio de su index
    user.savings=value
    users[index]=user //modificamos el array users con el nuevo usuario en el indice indicado
    saveUsers(users)
    loadCategories()
    

}
let btnSaving=document.getElementById("btnSaving")
btnSaving.addEventListener('click',()=>{savings()})
// savings()

function loadTable(){
    let user=getUser()
    let table=document.getElementById("bodyTable")
    let result=document.getElementById("result")
    let content=''
    let ingreso=0;
    let egreso=0;
    let total=0;
    if(user.movements.length==0){
        result.innerHTML="$"+0
        return;
    }
    
    user.movements.map((movement)=>{
        if(movement.type=="egreso"){
            egreso+=parseFloat(movement.value)
        }else{
            ingreso+=parseFloat(movement.value)
        }

        let formattedDate = new Date(movement.date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        
        content+=`
        <tr>
                <td>${movement.description}</td>
                <td>$${movement.value}</td>
                <td>${movement.type}</td>
                <td>${formattedDate}</td>
                <td ><div class="delete" data-id="${movement.id}"">X</div></td>

                
                
            </tr>
        `



    })
    table.innerHTML=content
    total=ingreso-egreso
    console.log(typeof egreso)
    result.innerHTML=total
}
window.onload=loadTable()

export function deleteMovement(id){
    let users=getUsers()
    let user=getUser()
    let index=user.movements.findIndex(movement=>{movement.id==id})
    user.movements.splice(index,1)
    let indexUser=users.findIndex(userToFind=>userToFind.id===user.id) //buscamos al usuario en la lista por medio de su index
    users[indexUser]=user //modificamos el array users con el nuevo usuario en el indice indicado
    saveUsers(users)
    loadTable()
    

}
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const movementId = event.target.getAttribute("data-id");
        deleteMovement(movementId);
        loadTable()
    }
    
});
