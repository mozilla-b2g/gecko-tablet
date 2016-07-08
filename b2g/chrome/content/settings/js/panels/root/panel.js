/* global TelephonySettingHelper */
/**
 * The module loads scripts used by the root panel. In the future these scripts
 * must be converted to AMD modules. Implementation details please refer to
 * {@link Root}.
 *
 * @module root/root
 */
define('panels/root/root',['require','shared/lazy_loader'],function(require) {
  'use strict';

  var LazyLoader = require('shared/lazy_loader');

  /**
   * @alias module:root/root
   * @class Root
   * @requires module:shared/lazy_loader
   * @returns {Root}
   */
  function Root() {}

  Root.prototype = {
    _panel: null,

    // To delay the show/hide in root panel will cause extra screen reflow,
    // it can be checked by Toggle on Developer > Flash Repainted Area.
    init: function root_init(panel) {
      this._panel = panel;
    }
  };

  return function ctor_root() {
    return new Root();
  };
});

define('panels/root/panel',['require','modules/settings_service','modules/settings_panel','panels/root/root'],function(require) {
  'use strict';

  var SettingsService = require('modules/settings_service');
  var SettingsPanel = require('modules/settings_panel');
  var Root = require('panels/root/root');

  var queryRootForLowPriorityItems = function(panel) {
    // This is a map from the module name to the object taken by the constructor
    // of the module.
    return {
      'WifiItem': panel.querySelector('#wifi-desc')
    };
  };

  return function ctor_root_panel() {
    var root;

    var activityDoneButton;

    var lowPriorityRoots = null;
    var initLowPriorityItemsPromise = null;

    return SettingsPanel({
      onInit: function rp_onInit(panel) {
        root = Root();
        root.init(panel);
      }
    });
  };
});

