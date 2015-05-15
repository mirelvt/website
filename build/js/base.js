(function() {
  'use strict';

function MobileMenuComponent(mobile_menu) {
  var is_active;

  mobile_menu.querySelector('.js-toggle-menu').addEventListener('click', toggleMenu, false);

  document.addEventListener('suske-mobile-active', disableContent, false);

  function toggleMenu(evt) {
    if(mobile_menu.classList.contains('show')) {
      is_active = false;
      mobile_menu.classList.remove('show');
    }
    else {
      is_active = true;
      mobile_menu.classList.add('show');
    }

    mobile_menu.dispatchEvent(new CustomEvent('suske-mobile-active', {
        detail: is_active,
        bubbles: true
    }));
  }

  function disableContent() {
    var html_doc = document.documentElement;

    var disable_scroll = is_active == true ?
        html_doc.classList.add('disable-scroll') :
        html_doc.classList.remove('disable-scroll');
  }
}


  function onDocumentLoaded() {
   new MobileMenuComponent(document.documentElement.querySelector('.mobile-menu'))

    FastClick.attach(document.body);
  }

  document.addEventListener('DOMContentLoaded', onDocumentLoaded, false);
})();