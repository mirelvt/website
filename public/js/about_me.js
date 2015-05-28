(function() {
  'use strict';

    //@Constructor PhotosComponent {{
    /*
    * When the viewport reach a certain size, 2 more images are
    * inserted. By a small viewport the 2 side images are removed.
    */
  function PhotosComponent(container) {
    var img_left = document.createElement('img'),
        img_right = document.createElement('img');

    if (window.matchMedia('(max-width: 862px)').matches) {
        var photos = container.getElementsByClassName('photo-side');
        for (var i = 0; i < photos.length; i++) {
          container.removeChild(photos[i]);
        }
    } else {
        if (container.children.length === 1) {
            setImageAttrs(img_left, 'aboutme-left.jpg');
            setImageAttrs(img_right, 'aboutme-right.jpg');

            container.insertBefore(img_right, container.firstChild);
            container.insertBefore(img_left, container.firstChild);
        }
    }

    // Set image attributes
    function setImageAttrs(elm, src) {
      elm.className = 'photo-side';
      elm.src = 'img/' + src;
      elm.alt = 'At work';
    }
  }
  // }}

  function onDocumentLoaded() {
    new PhotosComponent(document.querySelector('.photos'));
  }

  document.addEventListener('DOMContentLoaded', onDocumentLoaded, false);
  window.addEventListener('resize', onDocumentLoaded, false);
})();