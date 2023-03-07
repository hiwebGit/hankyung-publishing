/* UI */ ;
(function (window, document, $, undefined) {
  var UI = UI || {};
  var st = null;
  var winWChk = '';

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
      autoplay: {
        delay: 5000,
      },
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
    swiper: function () {
      $(this.sliderEl).each(function (idx, el) {
        if (window.innerWidth <= 768) {
          if ($(el).find('.swiper-slide').length > 1) {
            if (!$(el).hasClass('swiper-container-initialized')) {
              var _pagination = $(el).closest('.art-vt-slide__wrap').find('.art-vt-slide__pagination')[0];
              this.slider = new Swiper(el, {
                slidesPerView: '1',
                pagination: {
                  el: _pagination,
                },
                loop: false,
                observer: true,
              });
            } else {
              this.slider.update();
            }
          }
        } else {
          if ($(el).hasClass('swiper-container-initialized')) {
            this.slider.destroy();
          }
        }
      })
    },
    init: function () {
      var _this = this;
      _this.swiper();

      $(window).on('resize', function () {
        _this.swiper();
      });
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

    $(document).on('click', btnLike, function () {
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

  UI.reviewSticky = {
    varSet: {
      replyWrap: '.reply-wrap',
      replyWriter: '.reply-writer',
      btn: '.reply-add__btn',
      hideBtn: '.reply-writer .btn-close',
      activeClassName: 'is-active',
      fixedClassName: 'is-fixed',
      isVisible: false,
    },
    init: function () {
      var _this = this;
      if ($('.reply-wrap').length > 0) {
        _this.click();
        _this.scroll();
      }
    },
    click: function () {
      var _this = this;
      $(_this.varSet.btn).on('click', function () {
        var $group = $(this).closest('.reply-list-wrap').find(_this.varSet.replyWriter);
        if ($group.hasClass(_this.varSet.activeClassName)) {
          $group.removeClass(_this.varSet.activeClassName);
          _this.varSet.isVisible = false;
        } else {
          $group.addClass(_this.varSet.activeClassName);
          _this.varSet.isVisible = true;
        }
      });

      $(_this.varSet.hideBtn).on('click', function () {
        var $group = $(this).closest('.reply-writer');
        if ($group.hasClass(_this.varSet.activeClassName)) {
          $group.removeClass(_this.varSet.activeClassName);
          _this.varSet.isVisible = false;
        }
      });
    },
    scroll: function () {
      var _this = this;
      var _replyWrap = $('.reply-wrap')[0];
      var _replyWriterArea = $('.reply-writer');
      var _replyTopPosition = _replyWrap.offsetTop;
      var _replyBottomPosition = _replyWrap.offsetTop + _replyWrap.offsetHeight;

      $(window).on('scroll', function () {
        var windowScroll = $(this).height() + $(this).scrollTop();
        if ((windowScroll > _replyTopPosition) && (windowScroll <= _replyBottomPosition)) {
          if (_this.varSet.isVisible) {
            if (!_replyWriterArea.hasClass(_this.varSet.activeClassName)) {
              _replyWriterArea.addClass(_this.varSet.activeClassName);
            }
          }
        } else {
          if (_replyWriterArea.hasClass(_this.varSet.activeClassName)) {
            _replyWriterArea.removeClass(_this.varSet.activeClassName)
          }
        }
      });
    },
  }

  UI.visibleTarget = {
    varSet: {
      showBtn: '[data-role="visible_btn"]',
      contWrap: '[data-role="visible_wrap"]',
      cont: '[data-role="visible_cont"]',
      hideBtn: '[data-role="hide_btn"]',
      activeClassName: 'is-active',
    },
    init: function () {
      var _this = this;
      _this.click();
    },
    click: function () {
      var _this = this;
      $(_this.varSet.showBtn).on('click', function () {
        var $group = $(this).closest(_this.varSet.contWrap).find(_this.varSet.cont);
        if (!$group.hasClass(_this.varSet.activeClassName)) {
          $group.addClass(_this.varSet.activeClassName);
        }
      });

      $(_this.varSet.hideBtn).on('click', function () {
        var $group = $(this).closest(_this.varSet.cont);
        if ($group.hasClass(_this.varSet.activeClassName)) {
          $group.removeClass(_this.varSet.activeClassName);
        }
      });
    }
  }

  UI.curationSw = {
    sliderEl: '[data-slider="curation"]',
    defaultConfig: {
      observer: true,
      observeParents: true,
      initialSlide: 0,
      on: {
        init: function () {},
      },
    },
    setSwiper: function () {
      const that = this;
      $(this.sliderEl).each(function (idx, swEl) {
        setConfig = $(swEl).attr('data-swiper') ? JSON.parse(swEl.dataset.swiper) : {};
        swEl.options = Object.assign({}, that.defaultConfig, setConfig);

        if (typeof swEl.options.pagination !== 'undefined') {
          swEl.options.pagination.el = $(swEl).closest('.page-kv').find('.swiper-pagination')[0];
          if ($(swEl).attr('data-curation-type') === 'curation-b-01-02' || $(swEl).attr('data-curation-type') === 'curation-b-21-01') {
            swEl.options.pagination.formatFractionCurrent = function (number) {
              return ('0' + number).slice(-2);
            }
            swEl.options.pagination.formatFractionTotal = function (number) {
              return ('0' + number).slice(-2);
            }
            swEl.options.pagination.renderFraction = function (currentClass, totalClass) {
              return '<span class="' + currentClass + '"></span><span class="bar"></span><span class="' +
                totalClass + '"></span>';
            }
          }
        }

        if (swEl.options.navigation === true) {
          swEl.options.navigation = {
            nextEl: $(swEl).closest('.page-kv').find('.swiper-next'),
            prevEl: $(swEl).closest('.page-kv').find('.swiper-prev'),
          }
        }

        if (swEl.options.loop === true) {
          swEl.options.loopedSlides = $(swEl).find('.swiper-slide').length
        }

        if (swEl.options.autoplay === true) {
          swEl.options.autoplay = {
            delay: 3000,
            disableOnInteraction: false,
          }
        }

        if ($(swEl).attr('data-curation-type') === 'curation-b-01-02') {
          if (winWChk === 'mo') {
            swEl.options.slidesPerView = 1
          } else {
            swEl.options.slidesPerView = 'auto'
          }
        }

        if ($(swEl).attr('data-curation-type') === 'curation-b-21-01') {
          swEl.options.on.init = function () {
            $(swEl).find('.swiper-slide').addClass('changed');
          }
          swEl.options.on.slideChangeTransitionStart = function () {
            $(swEl).find('.swiper-slide').addClass('changing');
            $(swEl).find('.swiper-slide').removeClass('changed');
          }
          swEl.options.on.slideChangeTransitionEnd = function () {
            $(swEl).find('.swiper-slide').removeClass('changing');
            $(swEl).find('.swiper-slide').addClass('changed');
          }
        }

        if (typeof $(swEl).data('ui') === 'undefined') {
          swInstance = new Swiper(swEl, swEl.options);
          $(swEl).data('ui', swInstance);

          if (swInstance.params.autoplay.enabled === true) {
            setTimeout(function () {
              const controls = swInstance.pagination.$el.closest('.page-kv').find('.swiper-controls');

              if (controls.find('.btn-autoplay').length === 0) {
                controls.append(
                  '<button type="button" class="swiper--play btn-autoplay"><span>시작</span></button><button type="button" class="swiper--pause btn-autoplay"><span>멈춤</span></span></button>'
                );
              }
              if (swInstance.autoplay.running) {
                controls.find('.swiper--play').addClass('disabled').css('display', 'none');
                controls.find('.swiper--pause').removeClass('disabled').css('display', '');
              } else {
                controls.find('.swiper--play').removeClass('disabled').css('display', '');
                controls.find('.swiper--pause').addClass('disabled').css('display', 'none');
              }

              controls.find('.swiper--play').off('click').on('click', function () {
                swInstance.autoplay.start();
                controls.find('.swiper--play').addClass('disabled').css('display', 'none');
                controls.find('.swiper--pause').removeClass('disabled').css('display', '');
              });
              controls.find('.swiper--pause').off('click').on('click', function () {
                swInstance.autoplay.stop();
                controls.find('.swiper--play').removeClass('disabled').css('display', '');
                controls.find('.swiper--pause').addClass('disabled').css('display', 'none');
              });
            }, 300);
          }
        }
      })
    },
    init: function () {
      if ($(this.sliderEl).length > 0) {
        this.setSwiper();
      }
    },
    resize: function () {
      if ($(this.sliderEl).length) {
        const that = this;
        $(this.sliderEl).each(function (idx, swEl) {
          if ($(swEl).data('ui') !== 'undefined') { //case: swiper initialized
            if ($(swEl).data('ui').$el.attr('data-curation-type') === 'curation-b-01-02') {
              if (typeof $(swEl).data('ui') !== 'undefined') {
                if ($(swEl).data('ui').$el.attr('data-curation-type') === 'curation-b-01-02') {
                  that.defaultConfig.initialSlide = winWChk === 'mo' ? $(swEl).data('ui').realIndex + 1 : $(swEl).data('ui').realIndex - 1;
                  $(swEl).data('ui').destroy();
                  $(swEl).removeData('ui');
                  setTimeout(function () {
                    that.setSwiper();
                  }, 300)
                }
              }
            }
          }
        });
      }
    },
  }

  UI.newsSw = {
    slider: null,
    sliderEl: '.top-news-wrapper',
    config: {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: null,
      }
    },
    initClass: 'swiper-container-initialized',
    init: function () {
      if ($(this.sliderEl).length) {
        if ($(this.sliderEl).find('.swiper-slide').length > 0 && winWChk === 'mo') {
          if (!$(this.sliderEl).hasClass(this.initClass)) {
            if ($(this.sliderEl).find('.swiper-pagination').length > 0) {
              this.config.pagination.el = $(this.sliderEl).find('.swiper-pagination')[0];
            } else {
              $(this.sliderEl).append('<div class="swiper-pagination"></div>')
              this.config.pagination.el = $(this.sliderEl).find('.swiper-pagination')[0];
            }
            this.slider = new Swiper(this.sliderEl, this.config);
          }
        }
      }
    },
    resize: function () {
      if ($(this.sliderEl).hasClass(this.initClass) && winWChk === 'pc') {
        $(this.sliderEl).find('.swiper-pagination').remove();
        this.slider.destroy();
      }
      if (!$(this.sliderEl).hasClass(this.initClass) && winWChk === 'mo') {
        this.init();
      }
    }
  }

  UI.init = function () {
    const winW = window.innerWidth;
    if (winWChk != 'mo' && winW <= 768) {
      winWChk = 'mo'
    }

    if (winWChk != 'pc' && winW >= 769) {
      winWChk = 'pc'
    }
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
    UI.reviewSticky.init();
    UI.visibleTarget.init();
    UI.curationSw.init();
    UI.newsSw.init();
  }

  UI.resize = function () {
    if (st !== null) {
      clearTimeout(st);
    }
    const winW = window.innerWidth;
    st = setInterval(function () {
      const winW = window.innerWidth;
      if (winWChk != 'mo' && winW <= 768) { //모바일 버전으로 전환할 때 1번만 실행할 코드 추가
        winWChk = 'mo';
        UI.curationSw.resize();
      }

      if (winWChk != 'pc' && winW >= 769) { //PC 버전으로 전환할 때 1번만 실행할 코드 추가
        winWChk = 'pc';
        UI.curationSw.resize();
      }
      UI.newsSw.resize();

      clearTimeout(st);
      st = null;
    }, 150);
  }

  UI.scroll = function () {}

  window.UI = UI;

})(window, document, jQuery);

$(function () {
  UI.init();
  $(window).on('resize', function () {
    UI.resize();
  })

  $(window).on('scroll', function () {
    UI.scroll();
  })

  //임시 
  $(".faq__btn").on("click", function () {
    $(this).closest('.faq__item').toggleClass("is-on");
  })
});