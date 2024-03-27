import jQuery from './assets/animation/slick/jquery-1.11.0.min.js';
import jQueryMigrate from './assets/animation/slick/jquery-migrate-1.2.1.min.js';
import slick from './assets/animation/slick/slick.min.js';
import './assets/animation/slick/slick.css';
import './assets/animation/slick/slick-theme.css';

document.addEventListener('DOMContentLoaded', function() {
  const $ = document.querySelector.bind(document);
  $('.image__slider__container').slick({
    arrows: true,
    centerMode: true,
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          slidesToShow: 1
        }
      },
    ]
  });
});
