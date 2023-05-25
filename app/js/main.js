"use strict"

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