/* global SpatialNavigationHelper */
define(function(require) {
  'use strict';

  var BaseDialog = require('modules/dialog/base_dialog');

  var PanelDialog = function(panelDOM, options) {
    BaseDialog.call(this, panelDOM, options);
  };

  PanelDialog.prototype = Object.create(BaseDialog.prototype);
  PanelDialog.prototype.constructor = PanelDialog;
  PanelDialog.prototype.DIALOG_CLASS = 'panel-dialog';
  PanelDialog.prototype.TRANSITION_CLASS = 'fade';

  return function ctor_PanelDialog(panelDOM, options) {
    var dialog = new PanelDialog(panelDOM, options);
    const SN_ROOT = 'body.spatial-navigation .current.' + dialog.DIALOG_CLASS;
    dialog.spatialNavigationId = dialog.DIALOG_CLASS;
    return dialog;
  };
});
