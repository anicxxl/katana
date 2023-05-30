"use strict"


//ищем бургер баттон и при клике меняем класс у .header-menu , чтобы он был активный и не активный

const burgerMenuButton = document.querySelector('.header-button');
const headerMenu = document.querySelector('.header-menu');

burgerMenuButton.addEventListener('click', () => {
  headerMenu.classList.toggle('header-menu--active');
});


const swiper = new Swiper(".main-slider", {
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    //пауза между прокруткой
    delay: 3000,
    //закончить на последнем слайде
    stopOnLastSlide: false,
    //Отключить после ручного переключения
    disableOnInteraction: false
  }
});

const chooseWeaponsMixerContainer = document.querySelector('.choose-weapons__items');

var mixer = mixitup(chooseWeaponsMixerContainer);
