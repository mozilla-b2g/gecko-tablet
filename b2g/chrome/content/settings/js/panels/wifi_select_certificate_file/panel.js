/**
 * DialogManager is a singleton that will help DialogService to load panels
 * and control any transitions on panels.
 *
 * API:
 *
 * DialogManager.open(dialog, options);
 * DialogManager.close(dialog, options);
 *
 * @module DialogManager
 */
 /* global SpatialNavigationHelper */
define('modules/dialog_manager',['require','modules/panel_cache','shared/lazy_loader'],function(require) {
  'use strict';

  var PanelCache = require('modules/panel_cache');
  var LazyLoader = require('shared/lazy_loader');

  var DialogManager = function() {
    this.OVERLAY_SELECTOR = '.settings-dialog-overlay';

    this._overlayDOM = document.querySelector(this.OVERLAY_SELECTOR);
  };

  DialogManager.prototype = {
    /**
     * load panel based on passed in panelId
     *
     * @memberOf DialogManager
     * @access private
     * @param {String} panelId
     * @return {Promise}
     */
    _loadPanel: function dm__loadPanel(panelId) {
      var promise = new Promise(function(resolve, reject) {
        var panelElement = document.getElementById(panelId);
        if (panelElement.dataset.rendered) { // already initialized
          resolve();
          return;
        }

        panelElement.dataset.rendered = true;

        // XXX remove SubPanel loader once sub panel are modulized
        if (panelElement.dataset.requireSubPanels) {
          // load the panel and its sub-panels (dependencies)
          // (load the main panel last because it contains the scripts)
          var selector = 'section[id^="' + panelElement.id + '-"]';
          var subPanels = document.querySelectorAll(selector);
          for (var i = 0, il = subPanels.length; i < il; i++) {
            LazyLoader.load([subPanels[i]]);
          }
          LazyLoader.load([panelElement], resolve);
        } else {
          LazyLoader.load([panelElement], resolve);
        }
      });
      return promise;
    },

    /**
     * promised version of PanelCache.get()
     *
     * @memberOf DialogManager
     * @access private
     * @param {String} panelId
     * @return {Promise}
     */
    _getPanel: function dm__getPanel(panelId) {
      var promise = new Promise(function(resolve) {
        PanelCache.get(panelId, function(panel) {
          resolve(panel);
        });
      });
      return promise;
    },

    /**
     * this is used to control visibility of overlayDOM
     *
     * @memberOf DialogManager
     * @access private
     * @param {Boolean} show
     */
    _showOverlay: function dm__showOverlay(show) {
      this._overlayDOM.hidden = !show;
    },

    /**
     * It is used to control the timing of transitions so that we can make sure
     * whether animation is done or not.
     *
     * @memberOf DialogManager
     * @access private
     * @param {String} method
     * @param {BaseDialog} dialog
     * @param {Object} options
     * @return {Promise}
     */
    _transit: function dm__transit(method, dialog, options) {
      var promise = new Promise(function(resolve) {
        var panel = dialog.panel;

        panel.addEventListener('transitionend', function paintWait(evt) {
          if ((method === 'close' || method === 'open') &&
            evt.propertyName === 'visibility') {
              // After transition, we have to `hide` the panel, otherwise
              // the panel would still exist on the layer and would block
              // the scrolling event.
              if (method === 'close') {
                panel.hidden = true;
              }
              panel.removeEventListener('transitionend', paintWait);
              resolve();
          }
        });

        // Before transition, we have to `show` the panel, otherwise
        // the panel before applying transition class.
        if (method === 'open') {
          panel.hidden = false;
        }

        // We need to apply class later otherwise Gecko can't apply
        // this transition and 150ms is an approximate number after doing
        // several rounds of manual tests.
        setTimeout(function() {
          if (method === 'open') {
            // Let's unhide the panel first
            panel.classList.add('current');
          } else {
            panel.classList.remove('current');
          }
        }, 150);
      });
      return promise;
    },

    /**
     * Do necessary works to open panel like loading panel, doing transition
     * and call related functions.
     *
     * @memberOf DialogManager
     * @access private
     * @param {BaseDialog} dialog
     * @param {Object} options
     * @return {Promise}
     */
    _open: function dm__open(dialog, options) {
      var self = this;
      var foundPanel;

      return Promise.resolve()
      .then(function() {
        // 1: load panel
        return self._loadPanel(dialog.panel.id);
      })
      .then(function() {
        // 2: Get that panel
        return self._getPanel(dialog.panel.id);
      })
      .then(function(panel) {
        // 3: call beforeShow
        foundPanel = panel;
        return foundPanel.beforeShow(dialog.panel, options);
      })
      .then(function() {
        // 4. UI stuffs + transition
        dialog.init();
        dialog.initUI();
        dialog.bindEvents();

        if (dialog.TRANSITION_CLASS === 'zoom-in-80') {
          self._showOverlay(true);
        }

        return self._transit('open', dialog, options);
      })
      .then(function() {
      })
      .then(function() {
        // 5. show that panel as a dialog
        return foundPanel.show(dialog.panel, options);
      });
    },

    /**
     * Do necessary works to close panel like loading panel, doing transition
     * and call related functions.
     *
     * @memberOf DialogManager
     * @access private
     * @param {BaseDialog} dialog
     * @param {Object} options
     * @return {Promise}
     */
    _close: function dm__close(dialog, options) {
      var self = this;
      var foundPanel;
      var cachedResult;

      return Promise.resolve()
      .then(function() {
        // 1: Get that panel
        return self._getPanel(dialog.panel.id);
      })
      .then(function(panel) {
        // 2: Let's validate to see whether we can close this dialog or not.
        foundPanel = panel;

        var promise;
        // custom dialog - onSubmit
        if (foundPanel.onSubmit && options._type === 'submit') {
          promise = foundPanel.onSubmit();
        // custom dialog - onCancel
        } else if (foundPanel.onCancel && options._type === 'cancel') {
          promise = foundPanel.onCancel();
        // if no onSubmit & onCancel, pass directly
        } else {
          promise = Promise.resolve();
        }

        return promise;
      })
      .then(function(result) {
        cachedResult = result;

        // 3: call beforeHide
        return foundPanel.beforeHide();
      })
      .then(function() {
        // 4. transition
        return self._transit('close', dialog, options);
      })
      .then(function() {
        // 5. call hide
        return foundPanel.hide();
      })
      .then(() => {
      })
      .then(function() {
        // 6. Get result and cleanup dialog
        var result;

        // for prompt dialog, we have to get its own result from input text.
        if (dialog.DIALOG_CLASS === 'prompt-dialog') {
          result = dialog.getResult();
        } else if (cachedResult) {
          result = cachedResult;
        }

        dialog.cleanup();

        if (dialog.TRANSITION_CLASS === 'zoom-in-80') {
          self._showOverlay(false);
        }

        return result;
      });
    },

    /**
     * It is a bridge to call open or close function.
     *
     * @memberOf DialogManager
     * @access private
     * @param {String} method
     * @param {BaseDialog} dialog
     * @param {Object} options
     * @return {Promise}
     */
    _navigate: function dm__navigate(method, dialog, options) {
      method = (method === 'open') ? '_open' : '_close';
      return this[method](dialog, options);
    },

    /**
     * DialogService would use this exposed API to open dialog.
     *
     * @memberOf DialogManager
     * @access public
     * @param {BaseDialog} dialog
     * @param {Object} options
     * @return {Promise}
     */
    open: function dm_open(dialog, options) {
      return this._navigate('open', dialog, options);
    },

    /**
     * DialogService would use this exposed API to close dialog.
     *
     * @memberOf DialogManager
     * @access public
     * @param {BaseDialog} dialog
     * @param {Object} options
     * @return {Promise}
     */
    close: function dm_close(dialog, type, options) {
      options._type = type;
      return this._navigate('close', dialog, options);
    }
  };

  var dialogManager = new DialogManager();
  return dialogManager;
});

define('modules/dialog/base_dialog',['require'],function(require) {
  'use strict';

  var BaseDialog = function(panelDOM, options) {
    this.panel = panelDOM;
    this._options = options || {};
  };

  BaseDialog.prototype.DIALOG_CLASS = 'dialog';
  BaseDialog.prototype.TRANSITION_CLASS = 'fade';
  BaseDialog.prototype.SUBMIT_BUTTON_SELECTOR = '[type="submit"]';
  BaseDialog.prototype.CANCEL_BUTTON_SELECTOR = '[type="reset"]';
  BaseDialog.prototype.MESSAGE_SELECTOR = '.settings-dialog-message';
  BaseDialog.prototype.TITLE_SELECTOR = '.settings-dialog-title';

  BaseDialog.prototype.init = function bd_init() {
    // We can override animation class from options
    this.TRANSITION_CLASS = this._options.transition || this.TRANSITION_CLASS;
    this.panel.classList.add(this.DIALOG_CLASS);
    this.panel.classList.add(this.TRANSITION_CLASS);
  };

  BaseDialog.prototype.initUI = function bd_initUI() {
    var message = this._options.message;
    var title = this._options.title;
    var submitButton = this._options.submitButton;
    var cancelButton = this._options.cancelButton;

    this._updateMessage(message);
    this._updateTitle(title);
    this._updateSubmitButton(submitButton);
    this._updateCancelButton(cancelButton);
  };

  BaseDialog.prototype.bindEvents = function bd_bindEvent() {
    var self = this;

    this.getSubmitButton().onclick = function() {
      self._options.onWrapSubmit();
    };

    this.getCancelButton().onclick = function() {
      self._options.onWrapCancel();
    };
  };

  BaseDialog.prototype._updateMessage = function bd__updateMessage(message) {
    var messageDOM = this.panel.querySelector(this.MESSAGE_SELECTOR);
    if (messageDOM && message) {
      message = this._getWrapL10nObject(message);
      document.l10n.setAttributes(messageDOM, message.id, message.args);
    }
  };

  BaseDialog.prototype._updateTitle = function bd__updateTitle(title) {
    var titleDOM = this.panel.querySelector(this.TITLE_SELECTOR);
    if (titleDOM && title) {
      title = this._getWrapL10nObject(title);
      document.l10n.setAttributes(titleDOM, title.id, title.args);
    }
  };

  BaseDialog.prototype._updateSubmitButton = function bd__update(options) {
    var buttonDOM = this.getSubmitButton();
    if (buttonDOM && options) {
      options = this._getWrapL10nObject(options);
      document.l10n.setAttributes(buttonDOM, options.id, options.args);
      buttonDOM.className = options.style || 'recommend';
    }
  };

  BaseDialog.prototype._updateCancelButton = function bd__updateText(options) {
    var buttonDOM = this.getCancelButton();
    if (buttonDOM && options) {
      options = this._getWrapL10nObject(options);
      document.l10n.setAttributes(buttonDOM, options.id, options.args);
      buttonDOM.className = options.style || '';
    }
  };

  BaseDialog.prototype._getWrapL10nObject =
    function bd__getWrapL10nObject(input) {
      if (typeof input === 'string') {
        return {id: input, args: null};
      } else if (typeof input === 'object') {
        if (typeof input.id === 'undefined') {
          throw new Error('You forgot to put l10nId - ' +
            JSON.stringify(input));
        } else {
          return {id: input.id, args: input.args || null, style: input.style};
        }
      } else {
        throw new Error('You are using the wrong L10nObject, ' +
          'please check its format again');
      }
  };

  BaseDialog.prototype.getDOM = function bd_getDOM() {
    return this.panel;
  };

  BaseDialog.prototype.getSubmitButton = function bd_getSubmitButton() {
    return this.panel.querySelector(this.SUBMIT_BUTTON_SELECTOR);
  };

  BaseDialog.prototype.getCancelButton = function bd_getCancelButton() {
    return this.panel.querySelector(this.CANCEL_BUTTON_SELECTOR);
  };

  BaseDialog.prototype.cleanup = function bd_cleanup() {
    // We only have to restore system-wise panels instead of custom panels
    if (this.DIALOG_CLASS !== 'panel-dialog') {
      this._updateTitle('settings-' + this.DIALOG_CLASS + '-header');
      this._updateSubmitButton('ok');
      this._updateCancelButton('cancel');
    }

    // clear all added classes
    this.panel.classList.remove(this.DIALOG_CLASS);
    this.panel.classList.remove(this.TRANSITION_CLASS);
  };

  return BaseDialog;
});

/* global SpatialNavigationHelper */
define('modules/dialog/panel_dialog',['require','modules/dialog/base_dialog'],function(require) {
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
    // Support keyboard navigation in PanelDialog
    dialog.spatialNavigationId = dialog.DIALOG_CLASS;
    return dialog;
  };
});

/* global SpatialNavigationHelper */
define('modules/dialog/alert_dialog',['require','modules/dialog/base_dialog'],function(require) {
  'use strict';

  var BaseDialog = require('modules/dialog/base_dialog');

  var AlertDialog = function(panelDOM, options) {
    BaseDialog.call(this, panelDOM, options);
  };

  AlertDialog.prototype = Object.create(BaseDialog.prototype);
  AlertDialog.prototype.constructor = AlertDialog;
  AlertDialog.prototype.DIALOG_CLASS = 'alert-dialog';
  AlertDialog.prototype.TRANSITION_CLASS = 'fade';

  AlertDialog.prototype.bindEvents = function() {
    var self = this;

    this.getSubmitButton().onclick = function() {
      self._options.onWrapSubmit();
    };
  };

  return function ctor_alertDialog(panelDOM, options) {
    var dialog = new AlertDialog(panelDOM, options);
    const SN_ROOT = 'body.spatial-navigation .current.' + dialog.DIALOG_CLASS;
    dialog.spatialNavigationId = dialog.DIALOG_CLASS;
    return dialog;
  };
});

/* global SpatialNavigationHelper */
define('modules/dialog/confirm_dialog',['require','modules/dialog/base_dialog'],function(require) {
  'use strict';

  var BaseDialog = require('modules/dialog/base_dialog');

  var ConfirmDialog = function(panelDOM, options) {
    BaseDialog.call(this, panelDOM, options);
  };

  ConfirmDialog.prototype = Object.create(BaseDialog.prototype);
  ConfirmDialog.prototype.constructor = ConfirmDialog;
  ConfirmDialog.prototype.DIALOG_CLASS = 'confirm-dialog';
  ConfirmDialog.prototype.TRANSITION_CLASS = 'fade';

  ConfirmDialog.prototype.bindEvents = function() {
    var self = this;

    this.getSubmitButton().onclick = function() {
      self._options.onWrapSubmit();
    };

    this.getCancelButton().onclick = function() {
      self._options.onWrapCancel();
    };
  };

  return function ctor_confirmDialog(panelDOM, options) {
    var dialog = new ConfirmDialog(panelDOM, options);
    const SN_ROOT = 'body.spatial-navigation .current.' + dialog.DIALOG_CLASS;
    dialog.spatialNavigationId = dialog.DIALOG_CLASS;
    return dialog;
  };
});

/* global SpatialNavigationHelper */
define('modules/dialog/prompt_dialog',['require','modules/dialog/base_dialog'],function(require) {
  'use strict';

  var BaseDialog = require('modules/dialog/base_dialog');

  var PromptDialog = function(panelDOM, options) {
    BaseDialog.call(this, panelDOM, options);
  };

  PromptDialog.prototype = Object.create(BaseDialog.prototype);
  PromptDialog.prototype.constructor = PromptDialog;
  PromptDialog.prototype.DIALOG_CLASS = 'prompt-dialog';
  PromptDialog.prototype.TRANSITION_CLASS = 'fade';
  PromptDialog.prototype.INPUT_SELECTOR = '.settings-dialog-input';

  PromptDialog.prototype.bindEvents = function() {
    var self = this;

    this.getSubmitButton().onclick = function() {
      self._options.onWrapSubmit();
    };

    this.getCancelButton().onclick = function() {
      self._options.onWrapCancel();
    };
  };

  PromptDialog.prototype.initUI = function() {
    BaseDialog.prototype.initUI.call(this);
    this.getInput().value = this._options.defaultValue || '';
  };

  PromptDialog.prototype.getInput = function() {
    return this.panel.querySelector(this.INPUT_SELECTOR);
  };

  PromptDialog.prototype.getResult = function() {
    return this.getInput().value;
  };

  return function ctor_promptDialog(panelDOM, options) {
    var dialog = new PromptDialog(panelDOM, options);
    const SN_ROOT = 'body.spatial-navigation .current.' + dialog.DIALOG_CLASS;
    // Support keyboard navigation in PromptDialog
    dialog.spatialNavigationId = dialog.DIALOG_CLASS;
    return dialog;
  };
});

/**
 * DialogService is a singleton that provides few ways for you to show/hide
 * dialogs. Here, we predefined alert/confirm/prompt dialogs to replace
 * window.alert/window.confirm/window.prompt if you want any further controls
 * of animations and UI.
 *
 * And also, there is one more dialog called panelDialog that would be used
 * when you are going to show any predefined panel in dialog way.
 *
 * API:
 *
 * 1. Alert dialog
 *
 * DialogService.alert({
 *   id: 'MessageId',
 *   args: {}
 * }, {
 *   title: { id: 'TitleId', args: {} }
 * })
 * .then(function(result) {
 *   var type = result.type;
 * });
 *
 * NOTE:
 * If there is no args in locales, you can direclty pass l10nId without args.
 *
 * DialogService.alert('MessageId', {
 *   title: 'TitleId'
 * })
 * .then(function(result) {
 *   var type = result.type;
 * });
 *
 * 2. Confirm dialog
 *
 * DialogService.confirm({
 *   id: 'MessageId',
 *   args: {}
 * }, {
 *   title: { id: 'TitleId', args: {} },
 *   submitButton: { id: 'SubmitButtonId', args: {}, style: 'recommend' },
 *   cancelButton: { id: 'CancelButtonId', args: {} }
 * })
 * .then(function(result) {
 *   var type = result.type;
 * });
 *
 * 3. Prompt dialog
 * 
 * DialogService.prompt({
 *   id: 'MessageId',
 *   args: {}
 * }, {
 *   title: { id: 'TitleId', args: {} },
 *   defaultValue: 'e.g. test@mozilla.com',
 * }).then(function(result) {
 *   var type = result.type;
 *   var value = result.value;
 * });
 *
 * 4. Panel dialog
 *
 * DialogService.show('screen-lcok', {
 *   transition: 'zoom-in',
 * }).then(function(result) {
 *   // type would be submit or cancel
 *   var type = result.type;
 *   var value = result.value;
 * });
 *
 * NOTES:
 * We support some customized options for each dialog, please check the API
 * below to know what you can customize !
 *
 * @module DialogService
 */
define('modules/dialog_service',['require','settings','modules/defer','modules/dialog_manager','modules/dialog/panel_dialog','modules/dialog/alert_dialog','modules/dialog/confirm_dialog','modules/dialog/prompt_dialog'],function(require) {
  'use strict';

  var Settings = require('settings');
  var Defer = require('modules/defer');
  var DialogManager = require('modules/dialog_manager');

  var PanelDialog = require('modules/dialog/panel_dialog');
  var AlertDialog = require('modules/dialog/alert_dialog');
  var ConfirmDialog = require('modules/dialog/confirm_dialog');
  var PromptDialog = require('modules/dialog/prompt_dialog');

  var DialogService = function() {
    this._navigating = false;
    this._pendingRequests = [];
    this._settingsAlertDialogId = 'settings-alert-dialog';
    this._settingsBaseDialogId = 'settings-base-dialog';
    this._settingsConfirmDialogId = 'settings-confirm-dialog';
    this._settingsPromptDialogId = 'settings-prompt-dialog';
  };

  DialogService.prototype = {
    /**
     * Alert dialog with more controls.
     *
     * @memberOf DialogService
     * @access public
     * @param {String} message
     * @param {Object} userOptions
     * @return {Promise}
     */
    alert: function(message, userOptions) {
      var options = userOptions || {};
      return this.show(this._settingsAlertDialogId, {
        type: 'alert',
        message: message,
        title: options.title,
        submitButton: options.submitButton
      });
    },

    /**
     * Confirm dialog with more controls.
     *
     * @memberOf DialogService
     * @access public
     * @param {String} message
     * @param {Object} userOptions
     * @return {Promise}
     */
    confirm: function(message, userOptions) {
      var options = userOptions || {};
      return this.show(this._settingsConfirmDialogId, {
        type: 'confirm',
        message: message,
        title: options.title,
        submitButton: options.submitButton,
        cancelButton: options.cancelButton
      });
    },

    /**
     * Prompt dialog with more controls.
     *
     * @memberOf DialogService
     * @access public
     * @param {String} message
     * @param {Object} userOptions
     * @return {Promise}
     */
    prompt: function(message, userOptions) {
      var options = userOptions || {};
      return this.show(this._settingsPromptDialogId, {
        type: 'prompt',
        message: message,
        title: options.title,
        defaultValue: options.defaultValue,
        submitButton: options.submitButton,
        cancelButton: options.cancelButton
      });
    },

    /**
     * Panel dialog. If you are going to show any panel as a dialog,
     * you have to use this method to show them.
     *
     * @memberOf DialogService
     * @access public
     * @param {String} panelId
     * @param {Object} userOptions
     * @return {Promise}
     */
    show: function dm_show(panelId, userOptions, _pendingDefer) {
      var self = this;
      var defer;
      var dialog;
      var dialogDOM = document.getElementById(panelId);
      var currentPanel = Settings.currentPanel;
      var options = userOptions || {};

      if (_pendingDefer) {
        defer = _pendingDefer;
      } else {
        defer = Defer();
      }

      if (this._navigating) {
        this._pendingRequests.push({
          defer: defer,
          panelId: panelId,
          userOptions: userOptions
        });
      } else {
        if ('#' + panelId === currentPanel) {
          defer.reject('You are showing the same panel #' + panelId);
        } else {
          options.onWrapSubmit = function() {
            DialogManager.close(dialog, 'submit', options)
            .then(function(result) {
              defer.resolve({
                type: 'submit',
                value: result
              });
              self._navigating = false;
              self._execPendingRequest();
            });
          };

          options.onWrapCancel = function() {
            DialogManager.close(dialog, 'cancel', options)
            .then(function(result) {
              defer.resolve({
                type: 'cancel',
                value: result
              });
              self._navigating = false;
              self._execPendingRequest();
            });
          };

          switch (options.type) {
            case 'alert':
              dialog = AlertDialog(dialogDOM, options);
              break;
            case 'confirm':
              dialog = ConfirmDialog(dialogDOM, options);
              break;
            case 'prompt':
              dialog = PromptDialog(dialogDOM, options);
              break;
            default:
              dialog = PanelDialog(dialogDOM, options);
              break;
          }
          this._navigating = true;
          DialogManager.open(dialog, options);
        }
      }

      return defer.promise;
    },

    /**
     * This method can help us pop up any pending request and would try to
     * show it after previous request was done.
     *
     * @memberOf DialogService
     * @access private
     */
    _execPendingRequest: function() {
      var request = this._pendingRequests.pop();
      if (request) {
        this.show(request.panelId, request.userOptions, request.defer);
      }
    }
  };

  var dialogService = new DialogService();
  return dialogService;
});

define('panels/wifi_select_certificate_file/panel',['require','modules/settings_panel','modules/settings_service','modules/dialog_service','shared/device_storage/enumerate_all','shared/wifi_helper'],function(require) {
  'use strict';

  var SettingsPanel = require('modules/settings_panel');
  var SettingsService = require('modules/settings_service');
  var DialogService = require('modules/dialog_service');
  var EnumerateAll = require('shared/device_storage/enumerate_all');
  var WifiHelper = require('shared/wifi_helper');
  var wifiManager = WifiHelper.getWifiManager();

  return function ctor_selectCertificateWifi() {
    var elements = {};

    return SettingsPanel({
      onInit: function(panel) {
        elements = {};
        elements.panel = panel;
        elements.certificateFilesList =
          panel.querySelector('.wifi-certificate-files-List');
      },
      onBeforeShow: function(panel) {
        this._cleanup();
        this._createScanList(elements.certificateFilesList);
      },
      _cleanup: function() {
        // clear the certificate files list
        while (elements.certificateFilesList.hasChildNodes()) {
          elements.certificateFilesList.removeChild(
            elements.certificateFilesList.lastChild
          );
        }
      },
      _createScanList: function(list) {
        var storages = navigator.getDeviceStorages('sdcard');
        var cursor = EnumerateAll(storages, '');

        cursor.onsuccess = function() {
          var file = cursor.result;
          if (file) {
            var extension = this._parseExtension(file.name);
            if (this._isCertificateFile(extension)) {
              var li = this._createLinkAnchor(file);
              list.appendChild(li);
            }
            cursor.continue();
          }
        }.bind(this);

        cursor.onerror = function() {
          console.warn('failed to get file:' + cursor.error.name);
        };
      },
      _setCertificateItemsEnabled: function(enabled) {
        var items = elements.certificateFilesList.querySelectorAll('li');
        var update = enabled ? function(item) {
          item.classList.remove('disabled');
        } : function(item) {
          item.classList.add('disabled');
        };
        for (var i = 0; i < items.length; i++) {
          update(items[i]);
        }
      },
      _createLinkAnchor: function(file) {
        // create anchor
        var anchor = document.createElement('a');
        var certificateName = this._parseFilename(file.name);
        anchor.textContent = certificateName;

        var li = document.createElement('li');
        li.appendChild(anchor);

        anchor.onclick = () => {
          DialogService.show('wifi-enterCertificateNickname', {
            certificateName: certificateName
          }).then((result) => {
            var type = result.type;
            var value = result.value;

            if (type === 'submit') {
              var certRequest =
                wifiManager.importCert(file, '', value.nickname);

              // Gray out all item of certificate files
              // since we are importing other file.
              this._setCertificateItemsEnabled(false);
              certRequest.onsuccess = () => {
                // direct dialog to "wifi-manageCertificates"
                SettingsService.navigate('wifi-manageCertificates');
              };

              certRequest.onerror = () => {
                DialogService.alert('certificate-import-failed-description', {
                  title: 'certificate-import-failed'
                }).then(() => {
                  // Re-enable all items of certificate files
                  // since import file process is completed.
                  this._setCertificateItemsEnabled(true);
                });
              };
            }
          });
        };
        return li;
      },
      _parseFilename: function(path) {
        return path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
      },
      _parseExtension: function(filename) {
        var array = filename.split('.');
        return array.length > 1 ? array.pop() : '';
      },
      _isCertificateFile: function(extension) {
        var cerExtension = ['cer', 'crt', 'pem', 'der'];
        return cerExtension.indexOf(extension) > -1;
      },
    });
  };
});

