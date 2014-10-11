(function() {
  'use strict';

  function MenuComponent(container) {
    var menu_title = container.querySelector('.menu-title');

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

  function onDocumentLoaded() {
    var nav = document.querySelector('[role="navigation"]');
    new MenuComponent(nav);

    FastClick.attach(document.body);
  }

  document.addEventListener('DOMContentLoaded', onDocumentLoaded, false);
})();