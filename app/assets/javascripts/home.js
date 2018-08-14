(function() {
  'use strict';

  $(document).ready(function() {
    $("li.spy-button").click(function() {
      var target = $(this).children("a").attr("data-target");
      $('.active').removeClass('active');
      $('a[data-target*=' + target + ']').addClass('active');
      closeNav();
      $([document.documentElement, document.body]).animate({ scrollTop: $("#" + target).offset().top + 10 }, 0);
    });

    $("#openNav").click(function() { openNav() });
    $("#closeNav").click(function() { closeNav() });
    $("#sidenavBack").click(function() { closeNav() });
    $("#expandDelegators").click(function() {
      $('.team-delegators').classList.toggle("unfold");
      $(this).css("display", "none");
    });

    function openNav() {
      $("#sidenavBack").css('display', 'block');
      $("#sidenavBack").css('backgroundColor', 'rgba(0, 0, 0, 0.5)');
      $("#mySidenav").css('marginLeft', '100vw');
    }

    function closeNav() {
      $("#sidenavBack").css('display', 'none');
      $("#sidenavBack").css('backgroundColor', 'rgba(0, 0, 0, 0)');
      $("#mySidenav").css('marginLeft', '0');
    }
  });

  $(window).on("load", function() {
    window.sections = {};
    var section = $(".section");
    Array.prototype.forEach.call(section, function(e) {
      window.sections[e.id] = e.offsetTop;
    });
  })

  var i = 0;
  var beforeScroll;

  $(window).scroll(function() {
    const scrollPosition = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

    for (i in window.sections) {
      if ((scrollPosition !== 0) && (window.sections[i] <= scrollPosition)) {
        $('.spy-left ul li .active').removeClass('active');
        $('.spy-left ul li a[data-target*=' + i + ']').addClass('active');
        $('.sidenav-body ul li .active').removeClass('active');
        $('.sidenav-body ul li a[data-target*=' + i + ']').addClass('active');
      } else if (scrollPosition === 0) {
        $('.spy-left ul li .active').removeClass('active');
        $('.spy-left ul li a[data-target*=landing]').addClass('active');
        $('.sidenav-body ul li .active').removeClass('active');
        $('.sidenav-body ul li a[data-target*=landing]').addClass('active');
      }
    }

    if ($('#landing').outerHeight() < scrollPosition) {
      $('.spy-left').addClass('spy-left spy-fixed');
      $('.spy-right').addClass('spy-right spy-fixed');
      $('.mobile-menu-container').addClass('mobile-menu-container mobile-menu-container-fixed');
      if (typeof beforeScroll !== 'undefined' && $('#landing').outerHeight() + 500 < scrollPosition) {
        if (beforeScroll > scrollPosition){
          $('.mobile-menu-container').css('opacity', 1);
        } else {
          $('.mobile-menu-container').css('opacity', 0);
        }
      } else {
        $('.mobile-menu-container').css('top', '0');
      }
    } else {
      $('.spy-left').addClass('spy-left');
      $('.spy-right').addClass('spy-right');
      $('.mobile-menu-container').addClass('mobile-menu-container');
      $('.mobile-menu-container').css('top', '100vh');
    }

    beforeScroll = scrollPosition;
  })
})();
