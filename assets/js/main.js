/* UI */ ;
(function (window, document, $, undefined) {
  UI.mainUI = {
    kvSlider: {
      sw: null,
      el: '.main-kv__slider',
      constrols: '.main-kv-controls',
      config: {
        slidesPerView: 1,
        effect: 'fade',
        observer: true,
        observeParents: true,
        lazy: true,
        loop: true,
        loopedSlides: 5,
        breakpoints: {
          768: {
            // initialSlide: 0,
          }
        },
        speed: 500,
        autoplay: {
          delay: 3100,
        },
        pagination: {
          el: '.main-kv__pagination',
          type: 'bullets',
        },
        navigation: {
          nextEl: $('.main-kv-controls').find('.swiper--btn-next'),
          prevEl: $('.main-kv-controls').find('.swiper--btn-prev'),
        },
        on: {
          init: function () {
            const that = this;
            UI.mainUI.kvSlider.changeEv(that, 0);
            setTimeout(function () {
              UI.mainUI.kvSlider.autoplayControl(that);
            }, 300)
          },
          beforeTransitionStart: function () {
            UI.mainUI.kvSlider.changeEv(this, null);
          },
          slideChangeTransitionEnd: function () {
            UI.mainUI.kvSlider.changeEv(this, this.activeIndex);
          }
        },
      },
      init: function () {
        if ($(this.el).length) {
          this.sw = new Swiper(this.el, this.config);
        }
      },
      changeEv: function (sw, idx) {
        if (idx === null) {
          sw.slides.find('.main-kv__thumb').removeClass('active')
          sw.$el.closest('.main-kv').find('.circle').removeClass('active')
          return false;
        }
        sw.slides.eq(idx).find('.main-kv__thumb').addClass('active');
        sw.$el.closest('.main-kv').find('.circle').addClass('active');
      },
      autoplayControl: function (sw) {
        const that = this;
        if (sw.autoplay.running) {
          that.btnState()
        } else {
          that.btnState('paused');
        }

        $(that.constrols).find('.swiper--play').off('click').on('click', function () {
          sw.autoplay.start();
          that.btnState()
        });
        $(that.constrols).find('.swiper--pause').off('click').on('click', function () {
          sw.autoplay.stop();
          that.btnState('paused');
        });
      },
      btnState: function (flag = 'play') {
        if (flag === 'play') {
          $(this.constrols).find('.swiper--play').addClass('disabled').css('display', 'none');
          $(this.constrols).find('.swiper--pause').removeClass('disabled').css('display', '');
        } else {
          $(this.constrols).find('.swiper--play').removeClass('disabled').css('display', '');
          $(this.constrols).find('.swiper--pause').addClass('disabled').css('display', 'none');
        }
      }
    },
    init: function () {
      this.kvSlider.init();
    },
    resize: function () {},
  }
  UI.mainUI.init();

})(window, document, jQuery);