(function() {
  'use strict';

  function mobileMenuComponent(nav) {
    nav.querySelector('.hamburger-wrapper').addEventListener('click', toggleMenu, false);

    // Toggle the hamburger icon + menu
    function toggleMenu(evt) {
      var elm = evt.currentTarget;
      var nav_active = nav.classList.contains('active');
      var hamburger = elm.querySelector('.hamburger');

      // toggle active class on navigation element
      nav.classList.toggle('active', !nav_active);

      // toggle hamburger icon
      hamburger.classList.toggle('active', !hamburger.classList.contains('active'));

      toggleOverlay(nav_active);
      disableScroll(nav_active);
    }

    // Show overlay if mobile menu is visible
    function toggleOverlay(active) {
      document.querySelector('.overlay').classList.toggle('active', !active);
    }

    function disableScroll(active) {
      document.body.classList.toggle('scroll-disabled', !active);
    }
  }

  function onDocumentLoaded() {
    mobileMenuComponent(document.querySelector('[role="navigation"]'));
    FastClick.attach(document.body);
  }

  document.addEventListener('DOMContentLoaded', onDocumentLoaded, false);
})();