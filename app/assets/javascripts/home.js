(function() {
  'use strict';

  $( document ).ready(function() {
    window.sections = {};
    var section = document.querySelectorAll(".section");
    Array.prototype.forEach.call(section, function(e) {
      window.sections[e.id] = e.offsetTop;
    });

    $("li.spy-button").click(function() {
      var target = $(this).children("a").attr("data-target");
      document.querySelector('.active').setAttribute('class', ' ');
      document.querySelector('a[data-target*=' + target + ']').setAttribute('class', 'active');
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + target).offset().top
      }, 0);
    });
  });

  var i = 0;
  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollPosition);
    for (i in window.sections) {
      if ((scrollPosition !== 0) && (window.sections[i] <= scrollPosition)) {
        document.querySelector('.active').setAttribute('class', ' ');
        document.querySelector('a[data-target*=' + i + ']').setAttribute('class', 'active');
      } else if (scrollPosition === 0) {
        document.querySelector('.active').setAttribute('class', ' ');
        document.querySelector('a[data-target*=landing]').setAttribute('class', 'active');
      }
    }

    if (document.getElementById('landing').offsetHeight < scrollPosition) {
      document.querySelector('.spy-left').setAttribute('class', 'spy-left spy-fixed');
      document.querySelector('.spy-right').setAttribute('class', 'spy-right spy-fixed');
    } else {
      document.querySelector('.spy-left').setAttribute('class', 'spy-left');
      document.querySelector('.spy-right').setAttribute('class', 'spy-right');
    }
  };
})();
