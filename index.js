import {getUsers,saveUsers,getUser,getIndex} from'./js/localStorage.js'
import {User} from './js/user.js'
import {login} from './js/login.js'
import {signUp} from './js/signUp.js'
import {Movement} from './js/movement.js'
import {savings,amount,investments,movement} from './js/profile.js'


document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    let index = 0;
  
    setInterval(() => {
      index = (index + 1) % 3; // Total de 3 slides
      slider.style.transform = `translateX(-${index * 100}%)`;
    }, 3000); // Cambia cada 3 segundos
  });

  
  