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

  UI.reviewSwiper = {
    slider: null,
    sliderEl: '.review-thum',
    swiper: function () {
      $(this.sliderEl).each(function (idx, el) {
        if (window.innerWidth <= 768) {
          if ($(el).find('.swiper-slide').length > 2) {
            if (!$(el).hasClass('swiper-container-initialized')) {
              this.slider = new Swiper(el, {
                slidesPerView: 'auto',
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
      _this.clickEv();
    },
    clickEv: function () {
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
        _this.clickEv(ev);
      });
    },
    clickEv: function (ev) {
      var _this = this;
      $(ev.target).closest(_this.varSet.tabBtnArea).find(_this.varSet.tabBtn).removeClass(_this.varSet.activeClassName);
      $(ev.target).addClass(_this.varSet.activeClassName);
    }
  }

  UI.sortList = {
    sortEl: '.view-sort',
    sortBtn: '.view-sort__btn',
    sortCur: '.view-sort__cur',
    sortList: '.view-sort__list',
    openName: 'is-open',
    selectName: 'sort-on',
    init: function () {
      this.openEv();
    },
    openChk: function (wrapper) {
      var chk = undefined;
      chk = wrapper.hasClass(this.openName) ? true : false;

      return chk;
    },
    openEv: function () {
      var _this = this;

      $(_this.sortCur).on('click', function (ev) {
        var $sortBox = $(ev.target).closest(_this.sortEl);

        if (_this.openChk($sortBox)) {
          $sortBox.removeClass(_this.openName);
        } else {
          $sortBox.addClass(_this.openName);
        }
      });

      _this.selectEv();
    },
    selectEv: function () {
      var _this = this;

      $(_this.sortBtn).on('click', function (ev) {
        var $sortBox = $(ev.target).closest(_this.sortEl);
        var curText = $(ev.target).text();
        $sortBox.removeClass(_this.openName).find(_this.sortCur).text(curText);
        $sortBox.find('li').removeClass(_this.selectName)
        $(ev.target).closest('li').addClass(_this.selectName);
      });
    },
    resize: function () {
      $(this.sortEl).removeClass(this.openName);
    },
  }

  UI.reviewSticky = {
    varSet: {
      replyWrap: '.reply-wrap',
      replyWriter: '.reply-writer',
      btn: '.reply-add__btn, .reply-item__util .btn',
      hideBtn: '.reply-writer .btn-close',
      activeClassName: 'is-active',
      fixedClassName: 'is-fixed',
      isVisible: false,
    },
    init: function () {
      var _this = this;
      if ($('.reply-wrap').length > 0) {
        _this.clickEv();
        _this.scroll();
      }
    },
    clickEv: function () {
      var _this = this;
      $(document).on('click', _this.varSet.btn, function () {
        var $group = $(this).closest('.reply-list-wrap').find(_this.varSet.replyWriter);
        if (!$group.hasClass(_this.varSet.activeClassName)) {
          $group.addClass(_this.varSet.activeClassName);
          _this.varSet.isVisible = true;
        }
      });

      $(document).on('click', _this.varSet.hideBtn, function () {
        var $group = $(this).closest('.reply-writer');
        if ($group.hasClass(_this.varSet.activeClassName)) {
          $group.removeClass(_this.varSet.activeClassName);
          _this.varSet.isVisible = false;
        }
      });
    },
    scroll: function () {
      var _this = this;

      $(window).on('scroll', function () {
        if (($(window).scrollTop() >= $('.reply-wrap').offset().top) && ($(window).scrollTop() < $('.reply-wrap').offset().top + $('.reply-wrap').outerHeight())) {
          if (_this.varSet.isVisible) {
            if (!$('.reply-writer').hasClass(_this.varSet.activeClassName)) {
              $('.reply-writer').addClass(_this.varSet.activeClassName);
            }
          }
        } else {
          if ($('.reply-writer').hasClass(_this.varSet.activeClassName)) {
            $('.reply-writer').removeClass(_this.varSet.activeClassName);
          }
        }
      });
    },
  }

  UI.visibleTarget = {
    varSet: {
      showBtn: '[data-role=visible_btn]',
      contWrap: '[data-role=visible_wrap]',
      cont: '[data-role=visible_cont]',
      hideBtn: '[data-role=hide_btn]',
      activeClassName: 'is-active',
    },
    init: function () {
      var _this = this;
      _this.clickEv();
    },
    clickEv: function () {
      var _this = this;

      $(document).on('click', _this.varSet.showBtn, function () {
        var $group = $(this).closest(_this.varSet.contWrap).find(_this.varSet.cont);
        if (!$group.hasClass(_this.varSet.activeClassName)) {
          $group.addClass(_this.varSet.activeClassName);
        }
      });

      $(document).on('click', _this.varSet.hideBtn, function () {
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
      lazy: true,
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
          if (swEl.options.pagination.type === 'fraction') {
            swEl.options.pagination.formatFractionCurrent = function (number) {
              if ($(swEl).attr('data-curation-type') === 'curation-b-01-02' && winWChk === 'mo') {
                const nowPage = number - 1 !== 0 ? number - 1 : $(swEl).find('.swiper-slide:not(.swiper-slide-duplicate)').length;
                return ('0' + nowPage).slice(-2);
              } else {
                return ('0' + number).slice(-2);
              }
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
            swEl.options.slidesPerView = 1;
            if (swEl.options.speed == 0) {
              swEl.options.speed = 500;
            }
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
          if (typeof swEl.options.thumbs === 'undefined') {
            swInstance = new Swiper(swEl, swEl.options);
            $(swEl).data('ui', swInstance);
          } else {
            const mappingSw = $(swEl).closest('.kv-swiper-dual').find('.kv-swiper__thumbs')[0].swiper;
            swEl.options.thumbs.swiper = mappingSw;
            swInstance = new Swiper(swEl, swEl.options);
            $(swEl).data('ui', swInstance);
          }

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

  UI.themeSw = {
    slider: null,
    sliderEl: '.theme-column',
    config: {
      observer: true,
      observeParents: true,
      slidesPerView: "auto",
      slidesPerGroup: 2,
      centeredSlides: false,
      slidesPerGroupSkip: 1,
      pagination: {
        el: ".theme-column .swiper-dot",
      },
      spaceBetween: 24,
      breakpoints: {
        1600: {
          spaceBetween: 19,
        },
        1280: {
          spaceBetween: 12,
        },
        769: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 0,
        },
      },
    },
    initClass: 'swiper-container-initialized',
    init: function () {
      if ($(this.sliderEl).length) {
        if ($(this.sliderEl).find('.swiper-slide').length > 0) {
          if (!$(this.sliderEl).hasClass(this.initClass)) {
            if ($(this.sliderEl).find('.swiper-dot').length > 0) {
              this.config.pagination.el = $(this.sliderEl).find('.swiper-dot')[0];
            } else {
              $(this.sliderEl).append('<div class="swiper-dot"></div>')
              this.config.pagination.el = $(this.sliderEl).find('.swiper-dot')[0];
            }
            this.slider = new Swiper(this.sliderEl, this.config);
          }
        }
      }
    },
    resize: function () {
      if ($(this.sliderEl).hasClass(this.initClass) && winWChk === 'pc') {
        $(this.sliderEl).find('.swiper-dot').remove();
        this.slider.destroy();
        this.init();
      }
      if (!$(this.sliderEl).hasClass(this.initClass) && winWChk === 'mo') {
        this.init();
      }
    }
  }

  // 정리 필요
  UI.lyPopup = {
    openBtn: '[data-lypop-open]',
    openClass: 'is-open',
    closeBtn: '[data-lypop-btn=close]',
    init: function () {
      this.toggle();
      this.close();
    },
    toggle: function () {
      var _this = this;
      $(_this.openBtn).on('click', function () {
        var $this = $(this),
          popName = $this.data('lypop-open'),
          names = new Array();

        names = popName.split(',');

        $.each(names, function (idx, item) {
          var $lyPop = $('[data-lypop=' + item + ']'),
            textOpen = $this.data('st-open'),
            textClose = $this.data('st-close'),
            $textBox = $this.find('.st-text');

          if ($lyPop.hasClass(_this.openClass)) {
            $lyPop.removeClass(_this.openClass);
            $textBox.text(textOpen);
          } else {
            $lyPop.addClass(_this.openClass);
            $textBox.text(textClose);
          }
        });
      });
    },
    close: function () {
      var _this = this;
      $(_this.closeBtn).on('click', function () {
        _this.destroy($(this).closest('[data-lypop]'));
      });
    },
    destroy: function (layer) {
      var _this = this;
      layer.each(function () {
        layer.removeClass(_this.openClass);
        var openText = layer.data('st-open');
        if (openText.length) {
          $(this).find('st-text').text(openText);
        }
      })
    },
    resize: function () {
      var _this = this;
      _this.destroy($('[data-lypop].' + _this.openClass));
    }
  }

  UI.searchBox = {
    sEl: '.sort-section .o-btn-search',
    init: function () {
      this.hoverEv()
    },
    hoverEv: function () {

    },
  }

  UI.deleteItem = {
    init: function (el, outer) {
      var _this = this;
      $(outer).find(el).on('click', function (ev) {
        if ($(ev.target).attr('href') == '#') {
          ev.preventDefault();
        }
        _this.clickEv(el, outer, ev);
      });
    },
    clickEv: function (el, outer, ev) {
      $(ev.target).closest(outer).remove();
    }
  }

  UI.commentSort = {
    varSet: {
      commentWrapper: '.one-line__detail',
      commentBtn: '.one-line-sub__box .btn',
      commentBtnText: '.arrow-txt',
      activeClassName: 'is-active',
    },
    init: function () {
      var _this = this;
      $(_this.varSet.commentBtn).on('click', function (ev) {
        if ($(ev.target).attr('href') == '#') {
          ev.preventDefault();
        }
        _this.click(ev);
      });
    },
    click: function (ev) {
      var _this = this;
      $(ev.target).closest('.one-line').find(_this.varSet.commentWrapper).toggleClass(_this.varSet.activeClassName);
      
      if ($(ev.target).closest('.one-line').find(_this.varSet.commentWrapper).hasClass(_this.varSet.activeClassName)) {
        $(ev.target).closest(_this.varSet.commentBtn).removeClass(_this.varSet.activeClassName);
        $(ev.target).closest('.one-line').find(_this.varSet.commentBtnText).text('한줄평 닫기');
      } else {
        $(ev.target).closest(_this.varSet.commentBtn).addClass(_this.varSet.activeClassName);
        $(ev.target).closest('.one-line').find(_this.varSet.commentBtnText).text('한줄평 열기');
      }
    }
  }

  UI.kvScroll = {
    varSet: {
      el: '.header',
      scrollChkName: 'header--scroll',
      scrollEndName: 'header--active',
    },
    scroll: function () {
      var _this = this;
      $(window).on('scroll', function () {
        _this.scrollCheckSet(window);
      });
    },
    resize: function () {
      var _this = this;
      _this.scrollCheckSet(window);
      _this.scroll();
    },
    init: function () {
      var _this = this;
      _this.scrollCheckSet(window);
      _this.scroll();
    },
    scrollCheckSet: function (obj) {
      var _this = this;
      var device = $(window).innerWidth();
      var thisScroll = $(window).scrollTop();
      var _this = $(".offer__box-r");
      var extra = $(".offer-info").outerHeight() / 2;
      var start = $(".offer-review.side").is(':visible') ? 1 : 0;
      var heightR = $(".offer-info").outerHeight() + $(".offer-review.side").outerHeight();
      var heightL = $(".offer__box-l").height();
      //var contentP = $(".content").css("paddingTop");
      var gap = parseInt(heightR - heightL);
      var num1 = heightL > heightR ? 0 : parseInt(extra);
      var num2
      if (num1 == 0) {
        num2 = 0;
      } else if (extra < gap) {
        num2 = extra;
      } else {
        num2 = gap;
      }
      if (device > 768 && start) {
        if (thisScroll > 0) {
          _this.css({
            'transform': 'translateY(-' + num1 + 'px)'
          });
          $(".kv-offer").css({
            'margin-bottom': -num2
          });
        } else {
          _this.css({
            'transform': 'translateY(' + 0 + 'px)'
          });
          $(".kv-offer").css({
            'margin-bottom': 0
          });
        }
      } else {
        _this.css({
          'transform': 'translateY(' + 0 + 'px)'
        });
        $(".kv-offer").css({
          'margin-bottom': 0
        });
      }
    },
  }

  UI.anchorScroll = {
    varSet: {
      anchorBtn: '.anchor__btn',
      clickFlag: false,
    },
    init: function () {
      var _this = this;
      $(_this.varSet.anchorBtn).on('click', function (ev) {
        if ($(ev.target).attr('href') == '#') {
          ev.preventDefault();
        }
        _this.click(ev);
      });

      if (!_this.varSet.clickFlag) {
        _this.scroll();
      }
    },
    click: function (ev) {
      var _this = this;
      var _target = $(ev.target).attr('href').split("#")[1];
      _this.varSet.clickFlag = true;
      
      $('html, body').animate({
        scrollTop: $("#" + _target).offset().top - $('.offer-anchor-wrap').outerHeight() - 20
      }, 300);

      setTimeout(() => {
        $(_this.varSet.anchorBtn).removeClass('is-active');
        $(ev.target).addClass('is-active');
      }, 500);
    },
    scroll: function () {
      var _this = this;
      $(window).on('scroll', function (ev) {
        $(document).find('[id^=section]').each(function () {
          var _this = this;
          if (($(window).scrollTop() >= $(_this).offset().top) && ($(window).scrollTop() < $(_this).offset().top + $(_this).outerHeight())) {
            $('.anchor__btn').removeClass('is-active');
            if (_this.id === 'section_review') {
              $('[href="#' + _this.id + '"]').eq(0).addClass('is-active');
            } else {
              $('[href="#' + _this.id + '"]').addClass('is-active');
            }
          }
        });
      });
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
    UI.themeSw.init()
    UI.reviewSwiper.init();
    UI.sortList.init();
    UI.lyPopup.init();
    UI.searchBox.init();
    UI.deleteItem.init('[data-role=delete-btn]', '[data-role=delete-wrap]');
    UI.deleteItem.init('.btn-del', '.select-tag');
    UI.deleteItem.init('.btn-del', '.photo-add__select');
    UI.commentSort.init();
    UI.kvScroll.init();
    UI.anchorScroll.init();
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
        UI.lyPopup.resize();
        UI.searchBox.resize();
        UI.kvScroll.resize();
      }

      if (winWChk != 'pc' && winW >= 769) { //PC 버전으로 전환할 때 1번만 실행할 코드 추가
        winWChk = 'pc';
        UI.curationSw.resize();
        UI.lyPopup.resize();
        UI.searchBox.resize();
        UI.sortList.resize();
      }
      UI.newsSw.resize();
      UI.themeSw.resize();


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