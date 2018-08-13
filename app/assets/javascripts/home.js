(function() {
  'use strict';

  $( document ).ready(function() {
    window.sections = {};
    var section = document.querySelectorAll(".section");
    Array.prototype.forEach.call(section, function(e) {
      console.log(e.id, e.offsetTop)
      window.sections[e.id] = e.offsetTop;
    });

    $("li.spy-button").click(function() {
      var target = $(this).children("a").attr("data-target");
      document.querySelector('.active').setAttribute('class', ' ');
      document.querySelector('a[data-target*=' + target + ']').setAttribute('class', 'active');
      closeNav();
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + target).offset().top + 10
      }, 0);
    });

    $("#openNav").click(function() {
      openNav();
    });

    $("#closeNav").click(function() {
      closeNav();
    });

    $("#sidenavBack").click(function() {
      closeNav();
    });

    $("#expandDelegators").click(function() {
      document.querySelector('.team-delegators').classList.toggle("unfold");
      $(this).css("display", "none");
    });

    function openNav() {
      document.getElementById("sidenavBack").style.display = "block";
      document.getElementById("sidenavBack").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      document.getElementById("mySidenav").style.marginLeft = "100vw";
    }

    function closeNav() {
      document.getElementById("sidenavBack").style.display = "none";
      document.getElementById("sidenavBack").style.backgroundColor = "rgba(0, 0, 0, 0)";
      document.getElementById("mySidenav").style.marginLeft = "0px";
    }
  });

  var i = 0;
  var beforeScroll;
  window.onscroll = function() {
    const scrollPosition = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
    for (i in window.sections) {
      if ((scrollPosition !== 0) && (window.sections[i] <= scrollPosition)) {
        document.querySelector('.spy-left ul li .active').setAttribute('class', ' ');
        document.querySelector('.spy-left ul li a[data-target*=' + i + ']').setAttribute('class', 'active');
        document.querySelector('.sidenav-body ul li .active').setAttribute('class', ' ');
        document.querySelector('.sidenav-body ul li a[data-target*=' + i + ']').setAttribute('class', 'active');
      } else if (scrollPosition === 0) {
        document.querySelector('.spy-left ul li .active').setAttribute('class', ' ');
        document.querySelector('.spy-left ul li a[data-target*=landing]').setAttribute('class', 'active');
        document.querySelector('.sidenav-body ul li .active').setAttribute('class', ' ');
        document.querySelector('.sidenav-body ul li a[data-target*=landing]').setAttribute('class', 'active');
      }
    }

    if (document.querySelector('#landing').offsetHeight < scrollPosition) {
      document.querySelector('.spy-left').setAttribute('class', 'spy-left spy-fixed');
      document.querySelector('.spy-right').setAttribute('class', 'spy-right spy-fixed');
      document.querySelector('.mobile-menu-container').setAttribute('class', 'mobile-menu-container mobile-menu-container-fixed');
      if (typeof beforeScroll !== 'undefined' && document.querySelector('#landing').offsetHeight + 500 < scrollPosition) {
        if (beforeScroll > scrollPosition){
          document.querySelector('.mobile-menu-container').style.opacity = "1";
        } else {
          document.querySelector('.mobile-menu-container').style.opacity = "0";
        }
      } else {
        document.querySelector('.mobile-menu-container').style.top = "0px";
      }
    } else {
      document.querySelector('.spy-left').setAttribute('class', 'spy-left');
      document.querySelector('.spy-right').setAttribute('class', 'spy-right');
      document.querySelector('.mobile-menu-container').setAttribute('class', 'mobile-menu-container');
      document.querySelector('.mobile-menu-container').style.top = "100vh";
    }
    beforeScroll = scrollPosition;
  };
})();
