(function() {
  'use strict';

  $(window).on('load', function() {
    window.sections = {};
    Array.prototype.forEach.call($('.section'), function(e) {
      window.sections[e.id] = e.offsetTop;
    });
  });

  $(document).ready(function() {
    $('li.spy-button').click(function(e) {
      const target = $(this).children('a').data('target');
      closeNav(e);
      $([document.documentElement, document.body]).animate({ scrollTop: $('#' + target).offset().top + 10 }, 300);
    });

    $('.section-link').click(function() {
      const target = $(this).data('target');
      $([document.documentElement, document.body]).animate({ scrollTop: $('#' + target).offset().top + 10 }, 300);
    });

    $('#openNav').click(function() { openNav() });
    $('#closeNav').click(closeNav);
    $('#sidenavBack').click(closeNav);
    $('#expandDelegators').click(function() {
      $('.team-delegators').addClass('unfold');
      $(this).hide();
    });

    function openNav() {
      $('#sidenavBack').show().css('backgroundColor', 'rgba(0, 0, 0, 0.5)');
      $('#mySidenav').css('marginLeft', '100vw');
    }

    function closeNav(e) {
      e.stopPropagation();
      $('#sidenavBack').hide().css('backgroundColor', 'rgba(0, 0, 0, 0)');
      $('#mySidenav').css('marginLeft', '0');
    }

    var i = 0;
    var beforeScroll;
    var $thumbnailContainer = $('.thumbnail-container');
    var $mobileMenu = $('.mobile-menu-container');
    var $menuItems = $('.menu-items');
    var $spys = $('.spy-left');
    var $landingPage = $('#landing');
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var amplitude = 15;

    $('#landing').mousemove(function(e) {
      var mx = e.pageX;
      var my = e.pageY;
      if ((mx <= vw) && (my <= vh * 3)) {
        var moveX = (((vw/2) - mx) / (vw/2)) * amplitude;
        var moveY = (((vh/2) - my) / (vh/2)) * amplitude;
        var transformTo = 'translateX(' + moveX.toString() + 'px) translateY(' + moveY.toString() + 'px)'
        $thumbnailContainer.css('transform', transformTo)
      } else {
        $thumbnailContainer.css('transform', 'translateX(0px) translateY(0px)')
      }
    });

    $(window).scroll(function() {
      const scrollPosition = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

      for (i in window.sections) {
        if ((scrollPosition !== 0) && (window.sections[i] <= scrollPosition)) {
          $menuItems.find('li .active').removeClass('active');
          $menuItems.find('li a[data-target*=' + i + ']').addClass('active');
        } else if (scrollPosition === 0) {
          $menuItems.find('li .active').removeClass('active');
          $menuItems.find('li a[data-target*=landing]').addClass('active');
        }
      }

      if ($landingPage.outerHeight() < scrollPosition) {
        $spys.addClass('spy-fixed');
        $mobileMenu.addClass('fixed');
        if (typeof beforeScroll !== 'undefined' && $landingPage.outerHeight() + 500 < scrollPosition) {
          if (beforeScroll > scrollPosition){
            $mobileMenu.css('opacity', 1);
          } else {
            $mobileMenu.css('opacity', 0);
          }
        } else {
          $mobileMenu.css('top', '0');
        }
      } else {
        $spys.removeClass('spy-fixed');
        $mobileMenu.removeClass('fixed').css('top', '100vh');
      }

      beforeScroll = scrollPosition;
    });
  });
})();
