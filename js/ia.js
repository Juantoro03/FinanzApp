import { getToken } from "./localStorage.js";
async function llamarGemini(prompt) {
    const API_KEY = 'AIzaSyDNclvZ592Is0sBvT7kALtUUgU7KtPP5VA';
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  
    return  await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt }
          ]
        }]
      })
    })
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      return respuesta.json();
    })
    .then(datos => {
      const textoGenerado = datos.candidates[0].content.parts[0].text;
      
      return textoGenerado;
    })
    .catch(error => {
      console.error('Error al llamar a la API de Gemini:', error);
    });
  }
  

async function saveMessage(){
    //obtenemos el token del usuario para ponerle un identificador al chat
    let token=getToken();
    let message=document.getElementById("inputChat").value
    // Verificamos si ya existe un chat con el token en el localStorage
    let chat = JSON.parse(localStorage.getItem(token)) || [];
    
    let date=new Date()
    // Creamos un nuevo mensaje para usuario e IA
    const newMessage = {
        sender: "user", 
        text: message,
        date:date.toLocaleString("es-ES", {
            dateStyle: "short", // Fecha en formato corto (dd/mm/aa)
            timeStyle: "short", // Hora en formato corto (hh:mm)
        })
    };
    const response={
        sender: "ia", 
        text:await llamarGemini(message), //esperamos a que la Ia responda
        date: date.toLocaleString("es-ES", {
            dateStyle: "short", // Fecha en formato corto (dd/mm/aa)
            timeStyle: "short", // Hora en formato corto (hh:mm)
        })
    };
    // Agregamos los mensajes al chat
    chat.push(newMessage);
    chat.push(response)
    
    
    // Guardamos el chat actualizado en el localStorage
    localStorage.setItem(token, JSON.stringify(chat));
    getChat()

    
}

//creamos la funcion que va a obtener nuestro chat y va a reenderizar los mensajes
function getChat(){
    let token=getToken();
    let messages=JSON.parse(localStorage.getItem(token))||[]
    let chatBody=document.getElementById("chatBody")
    let content=''
    messages.map(message=>{


        if(message.sender=='user'){
            content+=`
                <div class="message user">${message.text}<span>${message.date}</span></div>
            `

        }else{
            content+=`
            <div class="message ia">${message.text}<span>${message.date}</span></div>
            `
            

        }

    })
    chatBody.innerHTML=content
    chatBody.scrollTop = chatBody.scrollHeight;
}
window.onload=getChat()

let btn=document.getElementById("btnChat")
btn.addEventListener('click',()=>saveMessage())