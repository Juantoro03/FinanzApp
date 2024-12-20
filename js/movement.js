import {getUsers,saveUsers,getUser,getIndex} from'./localStorage.js'

//creamos la clase para los movimientos que se vayan a hacer (ingresos-egresos)
export  class Movement {
    constructor(code,description, value,type) {
      this.code =code,  // Incrementa y asigna el código único
      this.description = description,
      this.value = value,
      this.type=type,
      this.date = new Date().toISOString(); // Fecha actual
    }
}

