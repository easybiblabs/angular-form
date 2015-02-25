require('./index');
require('summernote');

describe('Summernote rich text editor video providers', function() {
  'use strict';

  it('should not have Vine or Youku text', function() {
    var providers = $.summernote.lang['en-US'].video.providers;
    expect(providers).to.equal('(YouTube, Vimeo, Instagram, DailyMotion)');
  });
});