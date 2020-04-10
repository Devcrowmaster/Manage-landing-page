const burger = document.getElementById('burger');
const main_navbar = document.querySelector('.menu-navbar');

burger.addEventListener('click',() => {

  burger.classList.toggle('toggle');
  main_navbar.classList.toggle('open');

});

window.addEventListener('scroll',() => {
  let navbar = document.getElementById('main-navbar');
  
  let windowPosition = window.scrollY > 0;

  navbar.classList.toggle('nav-scrolled',windowPosition);
})

