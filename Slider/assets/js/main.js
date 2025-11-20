let swiperSlider = new Swiper('.card-container', {
  loop: false,
  slidesPerView: 'auto',
  initialSlide: 2,
  centeredSlides: true,
  spaceBetween: 20,
  grabCursor: true,
  speed: 1000,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: -90,
    depth: 600,
    modifier: 0.5,
    slideShadows: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
})
