(function() {
  'use strict';

  function menuComponent(container) {
    var menu_title = container.querySelector('.menu-title');

    menu_title.addEventListener('click', toggleMenu, false);

    function toggleMenu() {
      var dropdown_menu = container.classList.contains('show') ? container.classList.remove('show') :
                          container.classList.add('show');
    }
  }

  function onDocumentLoaded() {
    var nav = document.querySelector('[role="navigation"]');
    menuComponent(nav);

    FastClick.attach(document.body);
  }

  document.addEventListener('DOMContentLoaded', onDocumentLoaded, false);
})();