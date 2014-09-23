(function() {
  'use strict';

  function MenuComponent(container) {
    var menu_title = container.querySelector('.menu_title');

    menu_title.addEventListener('click', function(evt) {
      toggleMenu();
    }, false);

    function toggleMenu() {
      if (container.hasAttribute('class')) {
          container.removeAttribute('class');
      }
      else {
        container.setAttribute('class', 'show');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    var nav = document.querySelector('nav');
    new MenuComponent(nav);

    FastClick.attach(document.body);
  }, false);

})();