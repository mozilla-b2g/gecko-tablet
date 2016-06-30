/**
 * WifiKnownNetworks is a singleton that you can use it to
 * get known network list.
 *
 * @module wifi_manage_networks/wifi_known_networks
 */
define('panels/wifi_manage_networks/wifi_known_networks',['require','shared/wifi_helper'],function(require) {
  'use strict';

  var WifiHelper = require('shared/wifi_helper');
  var wifiManager = WifiHelper.getWifiManager();

  /**
   * @alias module:wifi_manage_networks/wifi_known_networks
   * @class WifiKnownNetworks
   * @requires module:shared/wifi_helper
   */
  var WifiKnownNetworks = {

    /**
     * We would keep cache known networks list here.
     * @memberof WifiKnownNetworks
     * @type {Object}
     */
    _networks: {},

    /**
     * We will use this flag to make sure whether we are scanning or not.
     * @memberof WifiKnownNetworks
     * @type {Boolean}
     */
    _scanning: false,

    /**
     * We will keep users' callbacks here when we are scanning. And after that,
     * these callbacks will be called with _networks as parameters.
     *
     * @memberof WifiKnownNetworks
     * @type {Array}
     */
    _cachedCallbacks: [],

    /**
     * You can call this to get _networks directly. If we are scanning when you
     * call this method, we will queue your callbacks and they will be called
     * later when scanning is done.
     *
     * @memberof WifiKnownNetworks
     * @param {Function} callback
     */
    get: function(callback) {
      // cache callbacks
      if (this._scanning) {
        this._cachedCallbacks.push(callback);
      } else {
        callback(this._networks);
      }
    },

    /**
     * You can call this method to scan known networks directly and we will
     * return found networks as a parameter to your callback.
     *
     * @memberof WifiKnownNetworks
     * @parameter {Function} callback
     */
    scan: function(callback) {
      var i;
      var req = wifiManager.getKnownNetworks();
      this._scanning = true;

      req.onsuccess = function() {
        // clean them first
        this._networks = {};
        this._scanning = false;

        var allNetworks = req.result;

        for (i = 0; i < allNetworks.length; ++i) {
          var network = allNetworks[i];
          // use ssid + capabilities as a composited key
          var key = network.ssid + '+' +
            WifiHelper.getSecurity(network).join('+');
          this._networks[key] = network;
        }

        var cachedCb;
        while (this._cachedCallbacks.length > 0) {
          cachedCb = this._cachedCallbacks.pop();
          cachedCb(this._networks);
        }

        // we can call an additional callback after scanning
        if (callback) {
          callback(this._networks);
        }
      }.bind(this);

      req.onerror = function(error) {
        this._scanning = false;
        console.warn('Error : ', error);
        console.warn('could not retrieve any known network.');
      }.bind(this);
    }
  };

  // let's try to scan for the first time
  WifiKnownNetworks.scan();

  return WifiKnownNetworks;
});

define('panels/wifi_manage_networks/panel',['require','modules/dialog_service','shared/settings_listener','modules/settings_panel','modules/wifi_context','modules/wifi_utils','shared/wifi_helper','panels/wifi_manage_networks/wifi_known_networks'],function(require) {
  'use strict';

  var DialogService = require('modules/dialog_service');
  var SettingsListener = require('shared/settings_listener');
  var SettingsPanel = require('modules/settings_panel');
  var WifiContext = require('modules/wifi_context');
  var WifiUtils = require('modules/wifi_utils');
  var WifiHelper = require('shared/wifi_helper');
  var WifiKnownNetworks =
    require('panels/wifi_manage_networks/wifi_known_networks');

  return function ctor_wifi_manage_networks_panel() {
    var elements = {};
    var listItems = {};

    return SettingsPanel({
      onInit: function(panel) {
        var self = this;
        elements.panel = panel;
        elements.knownNetworkListWrapper =
          panel.querySelector('.wifi-knownNetworks');
        elements.forgetNetworkDialog =
          panel.querySelector('form');
        elements.macAddress =
          panel.querySelector('[data-name="deviceinfo.mac"]');
        elements.joinHiddenBtn =
          panel.querySelector('.joinHidden');
        elements.joinHiddenBtn.addEventListener('click', function() {
          DialogService.show('wifi-joinHidden').then(function(result) {
            var network;
            var type = result.type;
            var value = result.value;

            if (type === 'submit') {
              if (window.MozWifiNetwork !== undefined) {
                network = new window.MozWifiNetwork(value.network);
              }
              WifiHelper.setPassword(
                network,
                value.password,
                value.identity,
                value.eap
              );
              WifiContext.associateNetwork(network, function(error) {
                if (error) {
                  // TODO
                  // Show some error later
                }
                self._cleanup();
                self._scan();
              });
            }
          });
        });
        // we would update this value all the time
        SettingsListener.observe('deviceinfo.mac', '', function(macAddress) {
          elements.macAddress.textContent = macAddress;
        });

        WifiContext.addEventListener('wifiEnabled', function(event) {
          var activeItem =
            elements.knownNetworkListWrapper.querySelector('.active');
          WifiUtils.updateListItemStatus({
            listItems: listItems,
            activeItemDOM: activeItem,
            network: event.network,
            networkStatus: event.status
          });
        });

        WifiContext.addEventListener('wifiStatusChange', function(event) {
          var activeItem =
            elements.knownNetworkListWrapper.querySelector('.active');
          WifiUtils.updateListItemStatus({
            listItems: listItems,
            activeItemDOM: activeItem,
            network: event.network,
            networkStatus: event.status
          });
        });
      },
      onBeforeShow: function(panel) {
        this._cleanup();
        this._scan();
      },
      _cleanup: function() {
        var wrapper = elements.knownNetworkListWrapper;
        while (wrapper.hasChildNodes()) {
          wrapper.removeChild(wrapper.firstChild);
        }
        listItems = {};
      },
      _scan: function() {
        WifiKnownNetworks.scan(function(networks) {
          var networkKeys = Object.getOwnPropertyNames(networks);
          var network;
          if (networkKeys.length) {
            networkKeys.sort();

            for (var i = 0; i < networkKeys.length; i++) {
              network = networks[networkKeys[i]];
              var aItem = WifiUtils.newListItem({
                network: network,
                onClick: this._forgetNetwork.bind(this),
                showNotInRange: false
              });

              if (WifiHelper.isConnected(network)) {
                elements.knownNetworkListWrapper.insertBefore(
                  aItem, elements.knownNetworkListWrapper.firstChild);
              } else {
                elements.knownNetworkListWrapper.appendChild(aItem);
              }

              // We have to keep them so that we can easily update
              // its status without cleanup
              listItems[networkKeys[i]] = aItem;
            }
          } else {
            // display a "no known networks" message if necessary
            elements.knownNetworkListWrapper.appendChild(
              WifiUtils.newExplanationItem('noKnownNetworks'));
          }
        }.bind(this));
      },
      _forgetNetwork: function(network) {
        var self = this;
        var forgetNetworkDialog = elements.forgetNetworkDialog;
        forgetNetworkDialog.hidden = false;

        forgetNetworkDialog.onsubmit = function forget() {
          WifiContext.forgetNetwork(network, error => {
            if (!error) {
              self._cleanup();
              self._scan();
              forgetNetworkDialog.hidden = true;
            }
          });
          return false;
        };

        forgetNetworkDialog.onreset = function cancel() {
          forgetNetworkDialog.hidden = true;
          return false;
        };
      }
    });
  };
});

