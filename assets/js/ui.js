/* UI */ ;
(function (window, document, $, undefined) {
  var UI = UI || {};

  $.fn.scrollStopped = function (callback) {
    var that = this,
      $this = $(that);

    $this.scroll(function (ev) {
      clearTimeout($this.data('scrollTimeout'));
      $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
    });
  };

  //header ppbox show/hide
  UI.headerPP = function () {
    let ppBox = '.pp-box',
      activeName = 'pp-box--active';

    $('.header-pp-button').on('click', function () {
      $(ppBox).addClass(activeName);
    });

    $('.pp-box__close').on('click', function () {
      $(ppBox).removeClass(activeName);
    });
  }

  UI.gnb = {
    varSet: {
      el: '.header',
      scrollChkName: 'header--scroll',
      scrollEndName: 'header--active',
    },
    scroll: function () {
      var _this = this;
      $(window).on('scroll', function () {
        $(_this.varSet.el).removeClass(_this.varSet.scrollEndName);
        _this.scrollCheckSet(window);
      });
    },
    init: function () {
      var _this = this;
      _this.scrollCheckSet(window);
      _this.scroll();
      //_this.scrollEnd(50);
    },
    scrollCheckSet: function (obj) {
      var _this = this;
      var scrollT = $(obj).scrollTop();
      if (scrollT > 0) {
        $(_this.varSet.el).addClass(_this.varSet.scrollChkName);
      } else {
        $(_this.varSet.el).removeClass(_this.varSet.scrollChkName);
      }
    },
    scrollEnd: function (time) {
      var _this = this;
      $(window).scrollStopped(function (ev) {
        setTimeout(() => {
          $(_this.varSet.el).addClass(_this.varSet.scrollEndName);
        }, time);
      });
    }
  }

  UI.headerBanner = {
    slider: null,
    sliderEl: '.lnb-slider',
    observer: true,
    observeParents: true,
    config: {
      slidePerView: '1',
      pagination: {
        el: '.lnb-slider__pagination',
      },
      on: {
        init: function () {}
      }
    },
    init: function () {
      if ($(this.sliderEl).find('.swiper-slide').length > 0) {
        if (!$(this.sliderEl).hasClass('swiper-container-initialized')) {
          this.slider = new Swiper(this.sliderEl, this.config);
        } else {
          // this.slider.update(); 
        }
      }
    },
  }

  UI.mainKeyvisual = {
    slider: null,
    sliderEl: '.main-kv__slider',
    config: {
      slidePerView: '1',
      pagination: {
        el: '.main-kv__pagination',
      },
      loop: true,
      // autoplay: {
      //   delay: 7000,
      // },
      on: {
        init: function () {},
        slideChange() {
          $(this.sliderEl).find('.swiper-slide-active .main-kv__thumb').addClass('active');
          // console.log('slide changed');
        }
      }
    },
    init: function () {
      if ($(this.sliderEl).find('.swiper-slide').length > 0) {
        if (!$(this.sliderEl).hasClass('swiper-container-initialized')) {
          this.slider = new Swiper(this.sliderEl, this.config);
        } else {
          this.slider.update();
        }
      }
    },
  }

  UI.adBanner = {
    slider: null,
    sliderEl: '.ad-banner',
    config: {
      slidePerView: '1',
      pagination: {
        el: '.ad-banner__pagination',
      },
      loop: true,
      // autoplay: {
      //   delay: 5000,
      // },
    },
    init: function () {
      if ($(this.sliderEl).find('.swiper-slide').length > 0) {
        if (!$(this.sliderEl).hasClass('swiper-container-initialized')) {
          this.slider = new Swiper(this.sliderEl, this.config);
        } else {
          this.slider.update();
        }
      }
    },
  }

  UI.artItem = {
    slider: null,
    sliderEl: '.art-vt-slide__content',
    config: {
      slidesPerView: 'auto',
      pagination: {
        el: '.art-vt-slide__pagination',
      },
      loop: false,
      observer: true,
      // autoplay: {
      //   delay: 5000,
      // },
    },
    init: function () {
      $(this.sliderEl).each(function (idx, el) {
        if ($(el).find('.swiper-slide').length > 0) {
          if ($(el).find('.art-vt-grid__item').length > 3) {
            if (!$(el).hasClass('swiper-container-initialized')) {
              console.log();
              // var _pagination = $(el).closest('.art-vt-slide__wrap').find('.art-vt-slide__pagination')[0];
              this.slider = new Swiper(el, {
                slidesPerView: 'auto',
                // pagination: {
                //   el: _pagination,
                // },
                loop: false,
                observer: true,
                // autoplay: {
                //   delay: 5000,
                // },
              });
            } else {
              this.slider.update();
            }
          }
        }
      })
    },
  }

  UI.pfListKeyvisual = {
    slider: null,
    sliderEl: '.pf-kv__slider',
    config: {
      slidePerView: '1',
      pagination: {
        el: '.pf-kv__pagination',
        type: 'fraction',
        formatFractionCurrent: function (number) {
          return ('0' + number).slice(-2);
        },
        formatFractionTotal: function (number) {
          return ('0' + number).slice(-2);
        },
        renderFraction: function (currentClass, totalClass) {
          return `<span class="${currentClass}"></span><span class="bar"></span><span class="${totalClass}"></span>`;
        }
      },
      observer: true,
      observeParents: true,
      loop: true,
      autoplay: {
        delay: 7000,
      },
      navigation: {
        nextEl: '.pf-kv__nav.swiper-button-next',
        prevEl: '.pf-kv__nav.swiper-button-prev',
      },
      on: {
        init: function () {},
        slideChange() {
          $(this.sliderEl).find('.swiper-slide-active .pf-kv__thumb').addClass('active');
          // console.log('slide changed');
        },

      }
    },
    init: function () {
      if ($(this.sliderEl).find('.swiper-slide').length > 0) {
        if (!$(this.sliderEl).hasClass('swiper-container-initialized')) {
          this.slider = new Swiper(this.sliderEl, this.config);
        } else {
          this.slider.update();
        }
      }
    },
  }

  UI.toggleSection = {
    el: '[data-toggle]',
    init: function () {
      var _this = this;

      $(_this.el).on('click', function () {
        var $btn = $(this),
          btnToggleName = $btn.data('toggle'),
          relName = $btn.data('toggleRel');

        if ($btn.hasClass(btnToggleName)) {
          $btn.removeClass(btnToggleName);
        } else {
          $btn.addClass(btnToggleName);
        }

        if (relName) {
          var $relSect = $('[data-section=' + relName + ']');
          var sectToggleName = $relSect.data('toggleSection');

          if ($relSect.hasClass(sectToggleName)) {
            $relSect.removeClass(sectToggleName);
          } else {
            $relSect.addClass(sectToggleName);
          }
        }
      });
    }
  }

  UI.toggleLike = function () {
    var btnLike = '.btn-fav',
      toggleLike = 'is-fav';

    $(btnLike).on('click', function () {
      if ($(this).hasClass(toggleLike)) {
        $(this).removeClass(toggleLike);
      } else {
        $(this).addClass(toggleLike);
      }
      // $(btnLike).hasClass(toggleLike) ? $(this).removeClass(toggleLike) : $(this).addClass(toggleLike);
    });
  }

  UI.snb = {
    varSet: {
      group: '.ex-snb__group',
      head: '.ex-snb__head',
      body: '.ex-snb__body',
      btn: '.ex-snb__btn',
      hideClassName: 'is-hidden',
    },
    init: function () {
      var _this = this;
      _this.click();
    },
    click: function () {
      var _this = this;
      $(_this.varSet.btn).on('click', function () {
        var $group = $(this).closest(_this.varSet.group);
        if ($group.hasClass(_this.varSet.hideClassName)) {
          $group.removeClass(_this.varSet.hideClassName);
        } else {
          $group.addClass(_this.varSet.hideClassName);
        }
      });
    }
  }

  UI.tab = {
    varSet: {
      tabWrapper: '[data-tab=tab-wrap]',
      tabBtn: '[data-tab=tab-btn]',
      tabBtnArea: '[data-tab=tab-list]',
      tabCont: '[data-tab=tab-content]',
      activeClassName: 'is-active',
    },
    init: function () {
      var _this = this;
      $(_this.varSet.tabBtn).on('click', function (ev) {
        if ($(ev.target).attr('href') == '#') {
          ev.preventDefault();
        }
        _this.click(ev);
      });
    },
    click: function (ev) {
      var _this = this;
      $(ev.target).closest(_this.varSet.tabBtnArea).find(_this.varSet.tabBtn).removeClass(_this.varSet.activeClassName);
      $(ev.target).addClass(_this.varSet.activeClassName);
    }
  }

  UI.init = function () {
    UI.headerPP();
    UI.headerBanner.init();
    UI.mainKeyvisual.init();
    UI.pfListKeyvisual.init();
    UI.gnb.init();
    UI.adBanner.init();
    UI.artItem.init();
    UI.snb.init();
    UI.tab.init();
    UI.toggleSection.init();
    UI.toggleLike();
  }

  window.UI = UI;

})(window, document, jQuery);

$(function () {
  UI.init();

});