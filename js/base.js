(function(){
   'use strict';

  // Constructor {{{
  function HeaderMenuComponent(container) {
    var page_name = $('[data-page]').data('page');
    var menu_items = container.find('.header-menu-item');

    function setMenuItemSelected() {
      for (var i = 0; i < menu_items.length; i++) {
        var item = menu_items.eq(i);
        if (item.data('target') == page_name) {
          item.addClass('selected');
          break;
        }
      };
    }

    $(setMenuItemSelected);

  }
  //}}}

  function onReady() {
    new HeaderMenuComponent($('.header-menu'));
  }

  $(onReady);

})();