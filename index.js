/* jshint node: true */
'use strict';

// For ember-cli < 2.7 findHost doesnt exist so we backport from that version
// for earlier version of ember-cli.
//https://github.com/ember-cli/ember-cli/blame/16e4492c9ebf3348eb0f31df17215810674dbdf6/lib/models/addon.js#L533
function findHostShim() {
  let current = this;
  let app;
  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));
  return app;
}

module.exports = {
  name: 'ember-cli-bootstrap-colorpicker',

  included: function(appOrAddon) {
    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);

    this._super.included.apply(this, arguments);

    app.import(app.bowerDirectory + '/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js');
    app.import(app.bowerDirectory + '/mjolnic-bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css');
    app.import('vendor/ember-cli-bootstrap-colorpicker/bs-colorpicker.css');

    app.import(app.bowerDirectory + '/mjolnic-bootstrap-colorpicker/dist/img/bootstrap-colorpicker/alpha-horizontal.png', { destDir: 'img/bootstrap-colorpicker' });
    app.import(app.bowerDirectory + '/mjolnic-bootstrap-colorpicker/dist/img/bootstrap-colorpicker/alpha.png', { destDir: 'img/bootstrap-colorpicker' });
    app.import(app.bowerDirectory + '/mjolnic-bootstrap-colorpicker/dist/img/bootstrap-colorpicker/hue-horizontal.png', { destDir: 'img/bootstrap-colorpicker' });
    app.import(app.bowerDirectory + '/mjolnic-bootstrap-colorpicker/dist/img/bootstrap-colorpicker/hue.png', { destDir: 'img/bootstrap-colorpicker' });
    app.import(app.bowerDirectory + '/mjolnic-bootstrap-colorpicker/dist/img/bootstrap-colorpicker/saturation.png', { destDir: 'img/bootstrap-colorpicker' });
  }
};
