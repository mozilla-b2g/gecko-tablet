/**
 * WifiWps is a module that can help you manipulate wps related stuffs easily.
 *
 * @module WifiWps
 */
define('panels/wifi/wifi_wps',['require','shared/wifi_helper'],function(require) {
  'use strict';

  var WifiHelper = require('shared/wifi_helper');
  var wifiManager = WifiHelper.getWifiManager();

  var WifiWps = function() {
    var wifiWps = {
      /**
       * A flag to make sure whether we are manipulating wps.
       *
       * @type {Boolean}
       * @default false
       */
      inProgress: false,
      /**
       * An array used to keep registered listeners for statusReset event.
       *
       * @type {Array}
       * @default []
       */
      _statusResetEventListeners: [],
      /**
       * A method to trigger all registered handlers
       *
       * @type {Function}
       */
      statusReset: function() {
        this._statusResetEventListeners.forEach(function(handler) {
          handler();
        });
      },
      /**
       * Put necessary information about wps (ssid, method, pin) to connect
       * to specific wps.
       *
       * @param {Object} options
       */
      connect: function(options) {
        var self = this;
        var req;

        var onSuccess = options.onSuccess || function() {};
        var onError = options.onError || function() {};

        var bssid = options.selectedAp;
        var method = options.selectedMethod;
        var pin = options.pin;

        if (method === 'pbc') {
          req = wifiManager.wps({
            method: 'pbc'
          });
        } else if (method === 'myPin') {
          req = wifiManager.wps({
            method: 'pin',
            bssid: bssid
          });
        } else {
          req = wifiManager.wps({
            method: 'pin',
            bssid: bssid,
            pin: pin
          });
        }

        req.onsuccess = function() {
          if (method === 'myPin') {
            document.l10n.formatValue('wpsPinInput', {
              pin: req.result
            }).then(msg => {
              alert(msg);
              self.inProgress = true;
              onSuccess();
            });
          } else {
            self.inProgress = true;
            onSuccess();
          }
        };

        req.onerror = function() {
          onError(req.error);
        };
      },
      /**
       * Cancel current wps operation and will call your onSuccess / onError
       * callback when operation is done.
       *
       * @memberOf WifiWps
       * @param {Object} options
       */
      cancel: function(options) {
        var self = this;
        var onError = options.onError || function() {};
        var onSuccess = options.onSuccess || function() {};

        var req = wifiManager.wps({
          method: 'cancel'
        });

        req.onsuccess = function() {
          self.inProgress = false;
          self.statusReset();
          onSuccess();
        };

        req.onerror = function() {
          onError(req.error);
        };
      },
      /**
       * You can add your listeners when `statusreset` event is triggered.
       *
       * @memberOf WifiWps
       * @param {String} eventName
       * @param {Function} callback
       */
      addEventListener: function(eventName, callback) {
        if (eventName === 'statusreset') {
          this._statusResetEventListeners.push(callback);
        }
      },
      /**
       * Remove catched listener about `statusreset` event.
       *
       * @memberOf WifiWps
       * @param {String} eventName
       * @param {Function} callback
       */
      removeEventListener: function(eventName, callback) {
        if (eventName === 'statusreset') {
          var index = this._statusResetEventListeners.indexOf(callback);
          if (index >= 0) {
            this._statusResetEventListeners.splice(index, 1);
          }
        }
      }
    };
    return wifiWps;
  };

  return WifiWps;
});

/* global SpatialNavigationHelper */
define('panels/wifi/wifi_network_list',['require','modules/dialog_service','modules/wifi_utils','shared/wifi_helper','modules/wifi_context'],function(require) {
  'use strict';

  var DialogService = require('modules/dialog_service');
  var WifiUtils = require('modules/wifi_utils');
  var WifiHelper = require('shared/wifi_helper');
  var WifiContext = require('modules/wifi_context');
  var wifiManager = WifiHelper.getWifiManager();

  var WifiNetworkList = function(elements) {
    var list = elements.wifiAvailableNetworks;

    var wifiNetworkList = {
      _scanRate: 5000, // 5s after last scan results
      _scanning: false,
      _autoscan: false,
      _index: {}, // index of all scanned networks
      _networks: {},
      _list: elements.wifiAvailableNetworks,
      clear: function(addScanningItem) {
        // clear the network list
        this._index = {};
        this._networks = {};

        // remove all items except the text expl.
        // and the "search again" button
        var wifiItems = list.querySelectorAll('li:not([data-state])');
        var len = wifiItems.length;
        for (var i = len - 1; i >= 0; i--) {
          list.removeChild(wifiItems[i]);
        }

        list.dataset.state = addScanningItem ? 'on' : 'off';
      },
      scan: function() {
        window.performance.measure('settingsPanelWifiVisible', 'wifiListStart');

        // scan wifi networks and display them in the list
        var self = this;
        if (this._scanning) {
          return;
        }

        // stop auto-scanning if wifi disabled or the app is hidden
        if (!wifiManager.enabled || document.hidden) {
          this._scanning = false;
          return;
        }

        this._scanning = true;
        var req = WifiHelper.getAvailableAndKnownNetworks();

        req.onsuccess = function onScanSuccess() {
          self.clear(false);
          var allNetworks = req.result;
          var network;

          for (var i = 0; i < allNetworks.length; ++i) {
            network = allNetworks[i];
            var key = WifiUtils.getNetworkKey(network);
            // keep connected network first, or select the highest strength
            if (!self._networks[key] || network.connected) {
              self._networks[key] = network;
            } else {
              if (!self._networks[key].connected &&
                network.relSignalStrength >
                  self._networks[key].relSignalStrength) {
                    self._networks[key] = network;
              }
            }
          }

          var networkKeys = Object.getOwnPropertyNames(self._networks);

          // display network list
          if (networkKeys.length) {
            // sort networks by name and signal strength
            networkKeys.sort(function(a, b) {
              let barDelta =
                WifiHelper.getSignalLevel(self._networks[b]) -
                WifiHelper.getSignalLevel(self._networks[a]);
              // If two networks have the same signal strength,
              // then sort by name.
              return (barDelta ? barDelta : a.localeCompare(b));
            });

            // add detected networks
            for (var j = 0; j < networkKeys.length; j++) {
              network = self._networks[networkKeys[j]];
              var listItem = WifiUtils.newListItem({
                network: network,
                onClick: self._toggleNetwork.bind(self),
                showNotInRange: true
              });
              // put connected network on top of list
              if (WifiHelper.isConnected(network)) {
                list.insertBefore(listItem,
                  elements.infoItem.nextSibling);
              } else {
                list.insertBefore(listItem, elements.scanItem);
              }
              // add composited key to index
              self._index[networkKeys[j]] = listItem;
            }
          } else {
            // display a "no networks found" message if necessary
            list.insertBefore(
              WifiUtils.newExplanationItem('noNetworksFound'),
                elements.scanItem);
          }

          // display the "Search Again" button
          list.dataset.state = 'ready';

          window.performance.measure('settingsPanelWifiReady', 'wifiListStart');

          // auto-rescan if requested
          if (self._autoscan) {
            window.setTimeout(self.scan.bind(self), self._scanRate);
          }

          self._scanning = false;

        };

        req.onerror = function onScanError(error) {
          // always try again.
          self._scanning = false;

          window.performance.measure('settingsPanelWifiReady', 'wifiListStart');

          window.setTimeout(self.scan.bind(self), self._scanRate);

        };
      },
      getWpsAvailableNetworks: function() {
        // get WPS available networks
        var ssids = Object.getOwnPropertyNames(this._networks);
        var wpsAvailableNetworks = [];
        for (var i = 0; i < ssids.length; i++) {
          var network = this._networks[ssids[i]];
          if (WifiHelper.isWpsAvailable(network)) {
            wpsAvailableNetworks.push(network);
          }
        }
        return wpsAvailableNetworks;
      },
      set autoscan(value) {
        this._autoscan = value;
      },
      get autoscan() {
        return this._autoscan;
      },
      get scanning() {
        return this._scanning;
      },
      _toggleNetwork: function(network) {
        var self = this;

        var keys = WifiHelper.getSecurity(network);
        var security = (keys && keys.length) ? keys.join(', ') : '';
        var sl = WifiHelper.getSignalLevel(network);

        if (WifiHelper.isConnected(network)) {
          // online: show status + offer to disconnect
          DialogService.show('wifi-status', {
            sl: sl,
            network: network,
            security: security,
          }).then(function(result) {
            var type = result.type;
            if (type === 'submit') {
              WifiContext.forgetNetwork(network, function() {
                self.scan();
              });
            }
          });
        } else if (network.password && (network.password == '*')) {
          // offline, known network (hence the '*' password value):
          // no further authentication required.
          WifiHelper.setPassword(network);
          WifiContext.associateNetwork(network);
        } else {
          // offline, unknown network: propose to connect
          var key = WifiHelper.getKeyManagement(network);
          switch (key) {
            case 'WEP':
            case 'WPA-PSK':
            case 'WPA-EAP':
              DialogService.show('wifi-auth', {
                sl: sl,
                security: security,
                network: network,
              }).then(function(result) {
                var type = result.type;
                var authOptions = result.value;
                if (type === 'submit') {
                  WifiHelper.setPassword(
                    network,
                    authOptions.password,
                    authOptions.identity,
                    authOptions.eap,
                    authOptions.authPhase2,
                    authOptions.certificate
                  );
                  WifiContext.associateNetwork(network);
                }
              });
              break;
            default:
              WifiContext.associateNetwork(network);
              break;
          }
        }
      }
    };

    // networkStatus has one of the following values:
    // connecting, associated, connected, connectingfailed, disconnected.
    WifiContext.addEventListener('wifiEnabled', function(event) {
      WifiUtils.updateListItemStatus({
        listItems: wifiNetworkList._index,
        activeItemDOM: list.querySelector('.active'),
        network: event.network,
        networkStatus: event.status
      });
    });

    WifiContext.addEventListener('wifiStatusChange', function(event) {
      WifiUtils.updateListItemStatus({
        listItems: wifiNetworkList._index,
        activeItemDOM: list.querySelector('.active'),
        network: event.network,
        networkStatus: event.status
      });
    });

    WifiContext.addEventListener('wifiConnectionInfoUpdate', function(event) {
      WifiUtils.updateNetworkSignal(event.network, event.relSignalStrength);
    });

    WifiContext.addEventListener('wifiNetworkForgotten', event => {
      var networkKey = WifiUtils.getNetworkKey(event.network);
      var forgottenNetwork = wifiNetworkList._networks[networkKey];
      if (forgottenNetwork) {
        forgottenNetwork.password = '';
      }
    });

    return wifiNetworkList;
  };

  return WifiNetworkList;
});

define('panels/wifi/panel',['require','modules/dialog_service','modules/settings_panel','shared/settings_listener','panels/wifi/wifi_wps','modules/wifi_context','shared/wifi_helper'],function(require) {
  'use strict';

  var DialogService = require('modules/dialog_service');
  var SettingsPanel = require('modules/settings_panel');
  var SettingsListener = require('shared/settings_listener');
  var WifiWps = require('panels/wifi/wifi_wps');
  var WifiContext = require('modules/wifi_context');
  var WifiHelper = require('shared/wifi_helper');
  var wifiManager = WifiHelper.getWifiManager();

  return function ctor_wifi() {
    var elements;

    return SettingsPanel({
      onInit: function(panel) {
        this._settings = navigator.mozSettings;
        this._wifiSectionVisible = true;
        this._scanPending = false;
        this._networkListPromise = null;
        this._initialized = false;

        elements = {
          panel: panel,
          wifi: panel,
          wpsColumn: panel.querySelector('.wps-column'),
          wpsInfoBlock: panel.querySelector('.wps-column small'),
          wpsPbcLabelBlock: panel.querySelector('.wps-column span'),
          wifiCheckbox: panel.querySelector('.wifi-enabled gaia-switch'),
          wifiAvailableNetworks: panel.querySelector('.wifi-availableNetworks'),
          dialogElement: panel.querySelector('.wifi-bad-credentials-dialog'),
          okBtn: panel.querySelector('.wifi-bad-credentials-confirm'),
          cancelBtn: panel.querySelector('.wifi-bad-credentials-cancel')
        };

        elements.infoItem = elements.wifiAvailableNetworks.querySelector(
          'li[data-state="on"]');
        elements.scanItem = elements.wifiAvailableNetworks.querySelector(
          'li[data-state="ready"]');
        elements.wifiItem = elements.wifiAvailableNetworks.querySelector(
          'li:not([data-state])');

        elements.networklist = {
          infoItem: elements.infoItem,
          scanItem: elements.scanItem,
          wifiAvailableNetworks: elements.wifiAvailableNetworks
        };

        elements.wps = {
          wpsColumn: elements.wpsColumn,
          wpsInfoBlock: elements.wpsInfoBlock,
          wpsPbcLabelBlock: elements.wpsPbcLabelBlock
        };

        this._wps = WifiWps();
        this._wps.addEventListener('statusreset', function() {
          elements.wps.wpsPbcLabelBlock.setAttribute('data-l10n-id',
            'wpsMessage');
          setTimeout(function resetWpsInfoBlock() {
            elements.wps.wpsPbcLabelBlock.setAttribute('data-l10n-id',
              'wpsDescription2');
          }, 1500);
        });

        // element related events
        elements.scanItem.addEventListener('click',
          this._onScanItemClick.bind(this));

        elements.wifiCheckbox.addEventListener('change',
          this._onWifiCheckboxChange.bind(this));

        elements.wpsColumn.addEventListener('click',
          this._onWpsColumnClick.bind(this));

        // wifiContext related events
        WifiContext.addEventListener('wifiEnabled', function() {
          elements.wifiCheckbox.removeAttribute('disabled');
          this._updateNetworkState();
          this._networkList().then((networkList) => {
            networkList.scan();
          });
        }.bind(this));

        WifiContext.addEventListener('wifiDisabled', function() {
          elements.wifiCheckbox.removeAttribute('disabled');
          // Re-enable UI toggle
          this._networkList().then((networkList) => {
            networkList.clear(false);
            networkList.autoscan = false;
          });
        }.bind(this));

        WifiContext.addEventListener('wifiStatusChange', function(event) {
          var scanStates =
            new Set(['connected', 'connectingfailed', 'disconnected']);
          this._updateNetworkState();
          if (scanStates.has(event.status)) {
            if (this._wifiSectionVisible) {
              this._networkList().then((networkList) => {
                networkList.scan();
              });
            } else {
              this._scanPending = true;
            }
          }
        }.bind(this));

        WifiContext.addEventListener('wifiWrongPassword', function(event) {
          var currentNetwork = WifiContext.currentNetwork;
          if (currentNetwork.known === false) {
            this._openBadCredentialsDialog(currentNetwork);
          }
        }.bind(this));

        window.performance.mark('wifiListStart');
      },
      onBeforeShow: function() {
        this._wifiSectionVisible = true;
        this._updateVisibilityStatus();
      },
      onShow: function() {
        if (!this._initialized) {
          this._initialized = true;
          SettingsListener.observe('wifi.enabled', true, function(enabled) {
            this._setMozSettingsEnabled(enabled);
            if (enabled) {
              this._updateNetworkState();
              this._networkList().then((networkList) => {
                networkList.scan();
              });
            }
          }.bind(this));
        }
      },
      onBeforeHide: function() {
        this._wifiSectionVisible = false;
      },
      _onWpsColumnClick: function() {
        var self = this;
        if (this._wps.inProgress) {
          this._wps.cancel({
            onSuccess: function() {
              elements.wpsInfoBlock.setAttribute('data-l10n-id',
                'fullStatus-wps-canceled');
            },
            onError: function(error) {
              document.l10n.setAttributes(elements.wpsInfoBlock,
                'wpsCancelFailedMessageError', { error: error.name });
            }
          });
        } else {
          DialogService.show('wifi-wps', {
            // wifi-wps needs these wps related networks
            wpsAvailableNetworks: function() {
              return self._networkList().then((networkList) => {
                return networkList.getWpsAvailableNetworks();
              });
            }
          }).then(function(result) {
            var type = result.type;
            var value = result.value;

            if (type === 'submit') {
              self._wps.connect({
                pin: value.pin,
                selectedAp: value.selectedAp,
                selectedMethod: value.selectedMethod,
                onSuccess: function() {
                  elements.wps.wpsPbcLabelBlock.setAttribute('data-l10n-id',
                    'wpsCancelMessage');
                  elements.wps.wpsInfoBlock.setAttribute('data-l10n-id',
                    'fullStatus-wps-inprogress');
                },
                onError: function(error) {
                  document.l10n.setAttributes(elements.wpsInfoBlock,
                    'fullStatus-wps-failed-error', { error: error.name });
                }
              });
            }
          });
        }
      },
      _onWifiCheckboxChange: function(e) {
        // `this` is Wifi Object
        var checkbox = elements.wifiCheckbox;
        this._settings.createLock().set({
          'wifi.enabled': checkbox.checked
        }).onerror = function() {
          // Fail to write mozSettings, return toggle control to the user.
          checkbox.removeAttribute('disabled');
        };
        checkbox.setAttribute('disabled', true);
      },
      _onScanItemClick: function() {
        this._networkList().then((networkList) => {
          networkList.clear(true);
          networkList.scan();
        });
      },
      _updateVisibilityStatus: function() {
        this._networkList().then((networkList) => {
          if (this._scanPending) {
            networkList.scan();
            this._scanPending = false;
          }
        });
      },
      _setMozSettingsEnabled: function(enabled) {
        this._networkList().then((networkList) => {
          elements.wifiCheckbox.checked = enabled;
          if (enabled) {
            /**
             * wifiManager may not be ready (enabled) at this moment.
             * To be responsive, show 'initializing' status and 'search...'
             * first. A 'scan' would be called when wifiManager is enabled.
             */
            networkList.clear(true);
            elements.wpsColumn.hidden = false;
          } else {
            if (this._wps.inProgress) {
              elements.wpsInfoBlock.
                setAttribute('data-l10n-id', WifiContext.wifiStatusText.id);
              if (WifiContext.wifiStatusText.args) {
                elements.wpsInfoBlock.
                  setAttribute('data-l10n-args',
                    JSON.stringify(WifiContext.wifiStatusText.args));
              } else {
                elements.wpsInfoBlock.removeAttribute('data-l10n-args');
              }
            }
            networkList.clear(false);
            networkList.autoscan = false;
            elements.wpsColumn.hidden = true;
          }
        });
      },
      _updateNetworkState: function() {
        // update network state, called only when wifi enabled.
        var networkStatus = wifiManager.connection.status;

        if (this._wps.inProgress) {
          if (networkStatus !== 'disconnected') {
            elements.wpsInfoBlock.
              setAttribute('data-l10n-id', WifiContext.wifiStatusText.id);
            if (WifiContext.wifiStatusText.args) {
              elements.wpsInfoBlock.
                setAttribute('data-l10n-args',
                             JSON.stringify(WifiContext.wifiStatusText.args));
            } else {
              elements.wpsInfoBlock.removeAttribute('data-l10n-args');
            }
          }
          if (networkStatus === 'connected' ||
            networkStatus === 'wps-timedout' ||
            networkStatus === 'wps-failed' ||
            networkStatus === 'wps-overlapped') {
              this._wps.inProgress = false;
              this._wps.statusReset();
          }
        }
      },
      _openBadCredentialsDialog: function(network) {
        DialogService.confirm({
          id: 'wifi-bad-credentials-confirm',
          args: { ssid : network.ssid }
        }, {
          title: 'wifi-bad-credentials-title',
          submitButton: { id: 'ok', style: 'recommend' },
          cancelButton: 'cancel',
        }).then((result) => {
          if (result.type === 'submit') {
            this._networkList().then((networkList) => {
              networkList._toggleNetwork(network);
            });
          }
        });
      },
      _networkList: function() {
        if (!this._networkListPromise) {
          this._networkListPromise = new Promise((resolve) => {
            require(['panels/wifi/wifi_network_list'], (WifiNetworkList) => {
              resolve(WifiNetworkList(elements.networklist));
            });
          });
        }
        return this._networkListPromise;
      }
    });
  };
});

