(function() {
  'use strict';

  $(window).on('load', function() {
    window.sections = {};
    Array.prototype.forEach.call($('.section'), function(e) {
      window.sections[e.id] = e.offsetTop;
    });
  });

  $(document).ready(function() {
    $('li.spy-button').click(function() {
      var target = $(this).children('a').attr('data-target');
      closeNav();
      $([document.documentElement, document.body]).animate({ scrollTop: $('#' + target).offset().top + 10 }, 300);
    });

    $('#openNav').click(function() { openNav() });
    $('#closeNav').click(function() { closeNav() });
    $('#sidenavBack').click(function() { closeNav() });
    $('#expandDelegators').click(function() {
      $('.team-delegators').addClass('unfold');
      $(this).hide();
    });

    function openNav() {
      $('#sidenavBack').show().css('backgroundColor', 'rgba(0, 0, 0, 0.5)');
      $('#mySidenav').css('marginLeft', '100vw');
    }

    function closeNav() {
      $('#sidenavBack').hide().css('backgroundColor', 'rgba(0, 0, 0, 0)');
      $('#mySidenav').css('marginLeft', '0');
    }

    var i = 0;
    var beforeScroll;
    var $mobileMenu = $('.mobile-menu-container');
    var $menuItems = $('.menu-items');
    var $spys = $('.spy-left, .spy-right');
    var $landingPage = $('#landing');

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
