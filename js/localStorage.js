//obtenemos el array con todos nuestros usuarios registrados y lo parseamos para poder ser utilizado
import {User} from './user.js'
export  function getUsers(){
    //validamos si ya hay una lista de usuarios en el localStorage de lo contrario la creamos y la devolvemos
    if(!localStorage.getItem('users')){
        localStorage.setItem('users',JSON.stringify([]))  
    }
    return JSON.parse(localStorage.getItem('users'))
}

//esta funcion toma la lista de los usuarios modificada y la guarda
export  function saveUsers(list){
    localStorage.removeItem('users')
    localStorage.setItem('users',JSON.stringify(list))
}

// localStorage.removeItem('users')

//esta funcion nos permite obtener el usuario logueado actualmente
export  function getUser(){
    let users=getUsers()
    let token=getToken()
    let user=users.filter(user=>user.id==token) 
    return user[0]
}

// getUser()

//esta funcion nos permite conocer la posicion del usuario en la lista para que pueda ser modificado
export  function getIndex(){
    let users=getUsers()
    let user=getUser()
    let index=users.findIndex(userToFind=>userToFind.id===user.id)
    return index

}
// getIndex()

export function getToken(){
    let token=localStorage.getItem('token')==null?'no hay token':localStorage.getItem('token')

    return token

}
