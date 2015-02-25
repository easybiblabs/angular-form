require('./index');
require('../decorators');

require('summernote');
require('angular-summernote');
require('angular-schema-form');

describe('texteditor addon', function() {
  'use strict';

  describe('directive', function() {
    beforeEach(angular.mock.module('form-texteditor'));
    beforeEach(
      // We don't need no sanitation. We don't need no though control.
      angular.mock.module(function($sceProvider) {
        $sceProvider.enabled(false);
      })
    );

    it('should use texteditor directive when format is "editor"', function() {

      inject(function($compile, $rootScope) {
        var scope = $rootScope.$new();
        scope.person = {};

        scope.schema = {
          type: 'object',
          properties: {
            desc: {
              title: 'Description',
              type: 'string',
              format: 'editor'
            }
          }
        };

        scope.form = [{
          key: 'desc',
          options: {
            toolbar: [
              ['style', ['bold', 'italic']]
            ]
          }
        }];

        var tmpl = angular.element(
          '<form sf-schema="schema" sf-form="form" sf-model="person">' +
          '</form>'
        );

        $compile(tmpl)(scope);
        $rootScope.$apply();
        tmpl.children().length.should.be.equal(1);
        /* eslint-disable */
        tmpl.children().eq(0).children().eq(0).is('div').should.be.true;
        /* eslint-enable */
        tmpl.children().eq(0).children().eq(0)
          .find('.summernote').length.should.equal(1, 'is present');
        tmpl.children().eq(0).children().eq(0)
          .find('.summernote').attr('ng-model')
          .should.equal('model[\'desc\']');
        tmpl.find('.note-style').length
          .should.equal(1, 'has note-style feature');
        tmpl.find('.note-style').children().length
          .should.equal(2);
        tmpl.find('.note-style').find('[data-event=bold]').length
          .should.equal(1, 'has bold feature');
        tmpl.find('.note-style').find('[data-event=italic]').length
          .should.equal(1, 'has italic feature');
      });
    });
  });
});
