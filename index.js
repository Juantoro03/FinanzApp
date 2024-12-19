document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    let index = 0;
  
    setInterval(() => {
      index = (index + 1) % 3; // Total de 3 slides
      slider.style.transform = `translateX(-${index * 100}%)`;
    }, 3000); // Cambia cada 3 segundos
  });
  