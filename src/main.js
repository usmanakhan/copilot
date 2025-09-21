import './main.scss';
import Swiper from 'swiper';
document.addEventListener('DOMContentLoaded', function () {
  // Main Swiper (single slide)
  new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Devices Swiper (3 slides at a time)
  new Swiper('.device-swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 24,
    pagination: {
      el: '.device-swiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.device-swiper .swiper-button-next',
      prevEl: '.device-swiper .swiper-button-prev',
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }
  });
});
