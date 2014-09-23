(function() {
  'use strict';

  var img_container = document.querySelector('.photos');

  // @Constructor AboutMeComponent {{
  function AboutMeComponent(container) {
    var img_left = document.createElement('img'),
        img_right = document.createElement('img');


    (function() {
      loadImages();
      deleteImages();
    })();

    // Create image element
    function loadImage(elm, src) {
      elm.setAttribute('src', 'img/' + src);
      elm.setAttribute('class', 'photo-side');
      elm.setAttribute('alt','Concentrated at work');
    }

    // Load left and right images when viewport > 743 and has only 1 image.
    function loadImages() {
      if (window.innerWidth >= 743 && container.children.length === 1) {
        loadImage(img_left, 'aboutme-left.jpg');
        loadImage(img_right, 'aboutme-right.jpg');

        container.insertBefore(img_right, container.firstChild);
        container.insertBefore(img_left, container.firstChild);
      }
    }

    // Remove left and right images when viewport < 743
    function deleteImages() {
      if (window.innerWidth < 743) {
        var photos = img_container.getElementsByClassName('photo-side');

        for (var i = 0; i < photos.length; i++) {
            img_container.removeChild(photos[i]);
        }
      }
    }
  }
  // }}

  document.addEventListener('DOMContentLoaded', function() {
    new AboutMeComponent(img_container);
  }, false);

  window.addEventListener('resize', function() {
    new AboutMeComponent(img_container);
  }, false);

})();