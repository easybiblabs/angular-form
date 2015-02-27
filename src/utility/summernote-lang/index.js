require('jquery');

module.exports = (function() {
  'use strict';

  if (typeof $.summernote !== 'undefined' && typeof $.summernote.lang !== 'undefined') {
    $.summernote.lang['en-US'].video.providers = '(YouTube, Vimeo, Instagram, DailyMotion)';
  }
})();
