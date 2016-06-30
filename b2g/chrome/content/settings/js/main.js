require.config({
  baseUrl: 'js',
  paths: {
    'modules': 'modules',
    'panels': 'panels',
    'shared': '../../shared/js',
    'views': '../views'
  },
  // This is the default value of the loading timeout, we will disable the
  // timeout in the production build
  waitSeconds: 0,
  // shim global object into AMD format
  // organized in alphabet order
  shim: {
    'dsds_settings': {
      exports: 'DsdsSettings'
    },
    'settings': {
      exports: 'Settings'
    },
    'shared/addons/match_pattern': {
      exports: 'MatchPattern'
    },
    'shared/airplane_mode_helper': {
      exports: 'AirplaneModeHelper'
    },
    'shared/apn_helper': {
      exports: 'ApnHelper'
    },
    'shared/async_storage': {
      exports: 'asyncStorage'
    },
    'shared/bluetooth_helper': {
      exports: 'BluetoothHelper'
    },
    'shared/device_storage/enumerate_all': {
      exports: 'enumerateAll'
    },
    'shared/download/download_formatter': {
      exports: 'DownloadFormatter'
    },
    'shared/download/download_store': {
      exports: 'DownloadStore'
    },
    'shared/download/download_ui': {
      exports: 'DownloadUI'
    },
    'shared/download/download_helper': {
      exports: 'DownloadHelper'
    },
    'shared/fxa_iac_client': {
      exports: 'FxAccountsIACHelper'
    },
    'shared/homescreens/homescreen_settings': {
      exports: 'homescreenSettings'
    },
    'shared/icc_helper': {
      exports: 'IccHelper'
    },
    'shared/keyboard_helper': {
      exports: 'KeyboardHelper',
      deps: ['shared/input_mgmt/input_app_list']
    },
    'shared/language_list': {
      exports: 'LanguageList'
    },
    'shared/lazy_loader': {
      exports: 'LazyLoader'
    },
    'shared/manifest_helper': {
      exports: 'ManifestHelper'
    },
    'shared/mime_mapper': {
      exports: 'MimeMapper'
    },
    'shared/mobile_operator': {
      exports: 'MobileOperator'
    },
    'shared/omadrm/fl': {
      exports: 'ForwardLock'
    },
    'shared/passcode_helper': {
      exports: 'PasscodeHelper'
    },
    'shared/sanitizer': {
      exports: 'Sanitizer'
    },
    'shared/screen_layout': {
      exports: 'ScreenLayout'
    },
    'shared/search_provider': {
      exports: 'SearchProvider'
    },
    'shared/settings_helper': {
      exports: 'SettingsHelper'
    },
    'shared/settings_listener': {
      exports: 'SettingsListener'
    },
    'shared/settings_url': {
      exports: 'SettingsURL'
    },
    'shared/sim_settings_helper': {
      exports: 'SimSettingsHelper'
    },
    'shared/simslot': {
      exports: 'SIMSlot'
    },
    'shared/simslot_manager': {
      exports: 'SIMSlotManager',
      deps: ['shared/simslot']
    },
    'shared/stk_helper': {
      exports: 'STKHelper'
    },
    'shared/text_normalizer': {
      exports: 'Normalizer'
    },
    'shared/toaster': {
      exports: 'Toaster'
    },
    'shared/tz_select': {
      exports: 'tzSelect',
      deps: ['shared/icc_helper']
    },
    'shared/uuid': {
      exports: 'uuid'
    },
    'shared/findmydevice_iac_api': {
      exports: 'wakeUpFindMyDevice'
    },
    'shared/wifi_helper': {
      exports: 'WifiHelper'
    },
    'vendor/jszip': {
      exports: 'JSZip'
    }
  },
  // exclude reusable file in modules
  // organized in alphabet order
  modules: [
    {
      name: 'main'
    },
    {
      name: 'modules/apn/apn_settings_manager',
      exclude: [
        'main',
        'modules/async_storage'
      ]
    },
    {
      name: 'modules/dialog_service',
      exclude: ['main']
    },
    {
      name: 'panels/about/panel',
      exclude: ['main']
    },
    {
      name: 'panels/about_more_info/panel',
      exclude: [
        'main',
        'modules/bluetooth/bluetooth_context'
      ]
    },
    {
      name: 'panels/app_permissions_detail/panel',
      exclude: ['main']
    },
    {
      name: 'panels/app_permissions_list/panel',
      exclude: [
        'main',
        'modules/apps_cache'
      ]
    },
    {
      name: 'panels/app_storage/panel',
      exclude: [
        'main',
        'modules/app_storage',
        'modules/storage_helper'
      ]
    },
    {
      name: 'views/phone/bluetooth/panel',
      exclude: [
        'main',
        'modules/mvvm/list_view',
        'modules/dialog_service',
        'modules/bluetooth/bluetooth_context'
      ]
    },
    {
      name: 'panels/browsing_privacy/panel',
      exclude: [
        'main',
        'modules/dialog_service'
      ]
    },
    {
      name: 'panels/call_barring/panel',
      exclude: ['main']
    },
    {
      name: 'panels/call_barring_passcode_change/panel',
      exclude: ['main']
    },
    {
      name: 'panels/date_time/panel',
      exclude: [
        'main',
        'modules/date_time'
      ]
    },
    {
      name: 'panels/developer/panel',
      exclude: [
        'main',
        'modules/dialog_service',
        'modules/apps_cache'
      ]
    },
    {
      name: 'panels/developer_hud/panel',
      exclude: ['main']
    },
    {
      name: 'panels/display/panel',
      exclude: ['main']
    },
    {
      name: 'panels/feedback_choose/panel',
      exclude: ['main']
    },
    {
      name: 'panels/feedback_send/panel',
      exclude: ['main']
    },
    {
      name: 'panels/findmydevice/panel',
      exclude: [
        'main',
        'modules/settings_utils'
      ]
    },
    {
      name: 'panels/firefox_accounts/panel',
      exclude: ['main']
    },
    {
      name: 'panels/firefox_sync/panel',
      exclude: [
        'main',
        'modules/settings_utils'
      ]
    },
    {
      name: 'panels/frame/panel',
      exclude: ['main']
    },
    {
      name: 'panels/help/panel',
      exclude: ['main']
    },
    {
      name: 'panels/homescreens/panel',
      exclude: [
        'main',
        'modules/apps_cache'
      ]
    },
    {
      name: 'panels/hotspot/panel',
      exclude: [
        'main',
        'modules/dialog_service'
      ]
    },
    {
      name: 'panels/hotspot_wifi_settings/panel',
      exclude: ['main']
    },
    {
      name: 'panels/keyboard/panel',
      exclude: [
        'main',
        'modules/mvvm/list_view',
        'modules/keyboard_context'
      ]
    },
    {
      name: 'panels/keyboard_add_layouts/panel',
      exclude: [
        'main',
        'modules/mvvm/list_view',
        'modules/keyboard_context',
        'shared/keyboard_helper'
      ]
    },
    {
      name: 'panels/languages/panel',
      exclude: [
        'main',
        'shared/keyboard_helper',
        'modules/date_time'
      ]
    },
    {
      name: 'panels/messaging/panel',
      exclude: [
        'main',
        'modules/messaging',
        'modules/settings_utils'
      ]
    },
    {
      name: 'panels/messaging_details/panel',
      exclude: [
        'main',
        'modules/messaging',
        'modules/settings_utils'
      ]
    },
    {
      name: 'panels/operator_settings/panel',
      exclude: [
        'main',
        'dsds_settings',
        'modules/defer',
        'modules/state_model',
        'modules/mvvm/list_view',
        'modules/dialog_service',
        'modules/customized_network_type_map',
        'modules/mobile/supported_network_info'
      ]
    },
    {
      name: 'panels/root/panel',
      exclude: [
        'main',
        'panels/root/low_priority_items',
        'modules/apps_cache',
        'modules/addon_manager',
        'modules/storage_helper'
      ]
    },
    {
      name: 'panels/root/low_priority_items',
      exclude: [
        'main',
        'modules/app_storage',
        'modules/battery',
        'modules/bluetooth/bluetooth_context',
        'modules/media_storage',
        'modules/sim_security',
        'modules/wifi_context'
      ]
    },
    {
      name: 'panels/screen_lock/panel',
      exclude: ['main']
    },
    {
      name: 'panels/screen_lock_passcode/panel',
      exclude: [
        'main',
        'modules/settings_utils'
      ]
    },
    {
      name: 'panels/search/panel',
      exclude: ['main']
    },
    {
      name: 'panels/simcard_manager/panel',
      exclude: ['main']
    },
    {
      name: 'panels/simpin/panel',
      exclude: [
        'main',
        'modules/sim_security'
      ]
    },
    {
      name: 'panels/sound/panel',
      exclude: [
        'main',
        'modules/mobile/supported_network_info'
      ]
    },
    {
      name: 'panels/usb_storage/panel',
      exclude: [
        'main',
        'modules/media_storage'
      ]
    },
    {
      name: 'panels/wifi/panel',
      exclude: [
        'main',
        'modules/dialog_service'
      ]
    },
    {
      name: 'panels/wifi_auth/panel',
      exclude: ['main']
    },
    {
      name: 'panels/wifi_enter_certificate_nickname/panel',
      exclude: ['main']
    },
    {
      name: 'panels/wifi_join_hidden/panel',
      exclude: ['main']
    },
    {
      name: 'panels/wifi_manage_certificates/panel',
      exclude: [
        'main',
        'modules/settings_utils'
      ]
    },
    {
      name: 'panels/wifi_manage_networks/panel',
      exclude: [
        'main',
        'modules/dialog_service'
      ]
    },
    {
      name: 'panels/wifi_select_certificate_file/panel',
      exclude: [
        'main',
        'modules/settings_utils'
      ]
    },
    {
      name: 'panels/wifi_status/panel',
      exclude: ['main']
    },
    {
      name: 'panels/wifi_wps/panel',
      exclude: ['main']
    }
  ]
});

define("config/require", function(){});

/**
 * Module provides methods to create a new module. Any module created here has
 * the ability of being extended by other modules. Existing properties are
 * overridden.
 *
 * Creating a module
 * @example
 *   var NewModule = Module.create(function() {
 *     this.value = 100;
 *   });
 *   NewModule.prototype.print = function() { console.log(this.value); };
 *
 *   var instance = NewModule();
 *   instance.print(); // 100
 *
 * Extending a module
 * @example
 *   var AnotherModule = Module.create();
 *   AnotherModule.prototype.inc = function() { this.value++; };
 *   var ExtendingModule = NewModule.extend(AnotherModule);
 *
 *   var instance = ExtendingModule();
 *   instance.inc();
 *   instance.print(); // 101
 *
 * @module modules/base/module
 */
define('modules/base/module',[],function() {
  'use strict';

  const LOG_LEVEL = {
    NONE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    ALL: 5
  };

  var _constructorMap = (function() {
    var _ctorMap = new Map();
    var _getConstructor = function(Module) {
      return _ctorMap.get(Module) || function() {};
    };
    var _registerConstructor = function(Module, constructor) {
      _ctorMap.set(Module, constructor || function() {});
    };
    return {
      getConstructor: _getConstructor,
      registerConstructor: _registerConstructor
    };
  })();

  var _emptyFunction = function() {};
  var _createLogger = function(name) {
    switch (name) {
      case 'DEBUG':
        return function(msg) {
          console.log(this._msgPrefix + msg);
        };
      case 'INFO':
        return function(msg) {
          console.info(this._msgPrefix + msg);
        };
      case 'WARN':
        return function(msg) {
          console.warn(this._msgPrefix + msg);
        };
      case 'ERROR':
        return function(msg) {
          console.error(this._msgPrefix + msg);
        };
    }
  };

  var ModulePrototype = {
    get _msgPrefix() {
      return '[' + this.$name + ']: ';
    },
    debug: _emptyFunction,
    info: _emptyFunction,
    warn: _emptyFunction,
    error: _emptyFunction,
    throw: function(msg) {
      throw new Error(this._msgPrefix + msg);
    },
    set _logLevel(value) {
      Object.keys(LOG_LEVEL).forEach((name) => {
        var level = LOG_LEVEL[name];
        if (value >= level && value > 0) {
          this[name.toLowerCase()] = _createLogger(name);
        }
      });
    },
    super: _constructorMap.getConstructor
  };

  var _extend = function() {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        var Module = arguments[0];
        for (var prop in Module.prototype) {
          if (prop === '$name') {
            continue;
          }
          var pd = Object.getOwnPropertyDescriptor(Module.prototype, prop);
          if (pd) {
            Object.defineProperty(this.prototype, prop, pd);
          }
        }
        break;
      default:
        Array.prototype.forEach.call(arguments, (Module) => {
          _extend.call(this, Module);
        });
        break;
    }
    return this;
  };

  // Returns a module function. The function returns an instance of the
  // module when it is called. The passed constructor is called using the
  // instance as "this".
  function _create(constructor) {
    if (constructor && typeof constructor !== 'function') {
      throw new Error('[Module]: Invalid constructor');
    }

    var ModuleFunc = function() {};
    ModuleFunc.prototype = Object.create(ModulePrototype);
    ModuleFunc.prototype.$name = constructor && constructor.name || '';

    var Module = function() {
      var instance = new ModuleFunc();
      if (constructor) {
        constructor.apply(instance, arguments);
      }
      return instance;
    };
    _constructorMap.registerConstructor(Module, constructor);
    Module.extend = _extend;
    Module.prototype = ModuleFunc.prototype;
    return Module;
  }

  return {
    LOG_LEVEL: LOG_LEVEL,
    create: _create
  };
});

/**
 * DependencyGraph is a basic data structure that helps decide the evaluation
 * order of a certain node.
 *
 * @module modules/base/dependency_graph
 */
define('modules/base/dependency_graph',['require','modules/base/module'],function(require) {
  'use strict';

  var Module = require('modules/base/module');

  /**
   * @class DependencyGraph
   * @requires module:modules/base/module
   * @params {DependencyGraph} dpGraph
   *                           The newly created graph will be initialized using
   *                           dpGraph.
   * @returns {DependencyGraph}
   */
  var DependencyGraph = Module.create(function DependencyGraph(dpGraph) {
    this._nodes = dpGraph ? JSON.parse(JSON.stringify(dpGraph._nodes)) : {};
  });

  /**
   * Print the content of the nodes for debugging.
   *
   * @access private
   * @memberOf DependencyGraph.prototype
   */
  DependencyGraph.prototype._printNodes = function dg_printNodes() {
    Object.keys(this._nodes).forEach((name) => {
      var node = this._nodes[name];
      console.log('name: ' + name);
      console.log('children: ' +
      node.children.reduce((result, name) => {
        return result + ' ' + name;
      }, ''));
      console.log('dependent nodes: ' +
      node.dependentNodes.reduce((result, name) => {
        return result + ' ' + name;
      }, ''));
      console.log('======================');
    });
  };

  /**
   * Traverse the tree and add the dependent nodes to all nodes in the path.
   *
   * @access private
   * @memberOf DependencyGraph.prototype
   * @param {Object} node
   *                 The node that we have new dependent nodes to add to.
   * @param {Array} dependentNodes
   *                New dependent nodes to add.
   */
  DependencyGraph.prototype._addDependentNodes =
    function dg_addDependentNodes(node, dependentNodes, traversedNodes) {
      traversedNodes = traversedNodes || [];
      if (traversedNodes.indexOf(node.name) >= 0) {
        traversedNodes.push(node.name);
        var error = traversedNodes.join(' -> ');
        this.throw('circular dependency detected! ' + error);
      }

      if (dependentNodes) {
        // add all nodes in "dependendNodes" to the current node
        dependentNodes.forEach((name) => {
          if (node.dependentNodes.indexOf(name) < 0) {
            node.dependentNodes.push(name);
          }
        });
      } else {
        // Nothing to add, prepare the nodes to be added to the children.
        dependentNodes = Array.prototype.slice.call(node.dependentNodes);
      }

      dependentNodes.push(node.name);
      traversedNodes.push(node.name);
      node.children.forEach((name) => { 
        this._addDependentNodes(this._nodes[name], dependentNodes,
          traversedNodes);
      });
      dependentNodes.pop();
      traversedNodes.pop();
  };

  /**
   * Add dependency. Calling to this function adds a dependency from the first
   * parameter towards the second one.
   *
   * @access public
   * @memberOf DependencyGraph.prototype
   * @param {String} name1
   *                 The name that depends on the other.
   * @param {String} name2
   *                 The name that is being depended on.
   */
  DependencyGraph.prototype.addDependency = function dg_addDep(name1, name2) {
    var node1 = this._nodes[name1];
    var node2 = this._nodes[name2];

    if (!node1) {
      node1 = this._nodes[name1] = {
        name: name1,
        children: [],
        dependentNodes: []
      };
    }

    if (!node2) {
      node2 = this._nodes[name2] = {
        name: name2,
        children: [],
        dependentNodes: []
      };
    }

    if (node1.children.indexOf(name2) < 0) {
      node1.children.push(name2);
      this._addDependentNodes(node1);
    }
  };

  /**
   * Get all dependent names of a name.
   *
   * @access public
   * @memberOf DependencyGraph.prototype
   * @param {String} name
   */
  DependencyGraph.prototype.getAllDependent = function dg_getAllDep(name) {
    var node = this._nodes[name];
    return node && node.dependentNodes;
  };

  return DependencyGraph;
});

/**
 * Observable provides ways of defining properties that the value changes of
 * them can be observed. In addition to normal properties, it allows to
 * create read-only properties and dependency properties.
 *
 * Observable creation:
 * There are two ways of defining an Observable: object literal or extending
 * from Observable. Object literal is useful when defining a singleton or you
 * want to create an observable easily.
 *
 * @example
 *   var observable = Observable({
 *     prop: 10,
 *     func: function() {}
 *   });
 *
 * Extending from Observable allow you to define a class of Observable. The
 * advantage of this compared to object literal is that the accessers are
 * shared across all instances of the class. The syntax compatible with the
 * javascript prototype definition.
 *
 * @example
 *   var ExtendedObservable = Module.create(function ExtendedObservable() {
 *     this.super(Observable).call(this);
 *   }).extend(Observable);
 *   Observable.defineObservableProperty(ExtendedObservable.prototype, 'prop',
 *   {
 *     value: 10
 *   });
 *   ExtendedObservable.prototype.func = function() {};
 *
 *   // Extend from NewObservable
 *   var ExtendedObservable2 = Module.create(function() {
 *     // constructor
 *   }).extend(ExtendedObservable);
 *   Observable.defineObservableProperty(
 *     ExtendedObservable2.prototype, 'prop2',
 *   {
 *     value: 20
 *   });
 *
 *   var observable = ExtendedObservable2();
 *   console.log(observable.prop);  // 10
 *   console.log(observable.prop2); // 20
 *
 * Defining a read-only property:
 * This is only supported when extending from Observable. When you define a
 * read-only property, an internal property with a '_' prefix is defined at
 * the same time so you can still change the value inside the observable.
 *
 * @example
 *   Observable.defineObservableProperty(ExtendedObservable.prototype, 'prop',
 *   {
 *     readonly: true,
 *     value: 10
 *   });
 *   ExtendedObservable.prototype.inc = function() {
 *     this._prop = 100;
 *   };
 *   var observable = new ExtendedObservable();
 *   observable.prop = 100; // throws an exception
 *   observable.inc();      // observers on "prop" are called
 *
 * Defining a dependency property:
 * This is only supported when extending from Observable. You provide a list
 * of the dependent properties and when each of them changes, the observsers
 * on the defined property are called. Dependency properties are read-only and
 * their values are determined by the specified getter.
 *
 * @example
 *   Observable.defineObservableProperty(ExtendedObservable.prototype, 'prop',
 *   {
 *     value: 10
 *   });
 *   Observable.defineObservableProperty(
 *     ExtendedObservable.prototype, 'prop2',
 *   {
 *     value: 20
 *   });
 *   Observable.defineObservableProperty(
 *     ExtendedObservable.prototype, 'dependencyProp',
 *   {
 *     dependency: ['prop', 'prop2'],
 *     get: function() {
 *       return this.prop + this.prop2;
 *     }
 *   });
 *   var observable = new ExtendedObservable();
 *   observable.prop = 100;  // observers on "dependencyProp" are called
 *   observable.prop2 = 200; // observers on "dependencyProp" are called
 *   // observable.dependencyProp is 300.
 *
 * @module modules/mvvm/observable
 */
define('modules/mvvm/observable',['require','modules/base/module','modules/base/dependency_graph'],function(require) {
  'use strict';

  var Module = require('modules/base/module');
  var DependencyGraph = require('modules/base/dependency_graph');

  var OP_PREFIX = (name) => { return '$OP_' + name; };

  /**
   * @class Observable
   * @requires module:modules/base/module
   * @requires module:modules/base/dependency_graph
   * @returns {Observable}
   */
  var Observable = Module.create(function Observable(object) {
    this._observers = {};
    if (object) {
      this._initWithObject(object);
    }
  });

  /**
   * Initialize the observable with a prototype object. This is not required
   * for objects that are defined using prototype as everything should be
   * defined via Observable.defineObservableProperty explicitly.
   *
   * @access private
   * @memberOf Observable.prototype
   * @param {Object} object
   */
  Observable.prototype._initWithObject = function o_init(object) {
    for (var name in object) {
      // If name is a function, simply add it to the observable.
      if (typeof object[name] === 'function') {
        this[name] = object[name];
      } else {
        _defineObservableProperty(this, name, {
          value: object[name]
        });
      }
    }
  };

  /**
   * Notify the value change of a property.
   *
   * @access private
   * @memberOf Observable.prototype
   * @param {String} name
   * @param {Object} newValue
   * @param {Object} oldValue
   */
  Observable.prototype._notify = function o__notify(name, newValue, oldValue) {
    var observers = this._observers[name];
    if (observers) {
      observers.forEach(function(observer) {
        observer(newValue, oldValue);
      });
    }
  };

  /**
   * Remove an observer from a property.
   *
   * @access private
   * @memberOf Observable.prototype
   * @param {Function} observer
   * @param {String} name
   */
  Observable.prototype._removeObserver =
    function o__removeObserver(observer, name) {
      // arguments in reverse order to support .bind(observer) for the
      // unbind from all case
      var observers = this._observers[name];
      if (observers) {
        var index = observers.indexOf(observer);
        if (index >= 0) {
          observers.splice(index, 1);
        }
      }
  };

  /**
   * Observe a property with an observer. The observer is called when the
   * property changes.
   *
   * @access public
   * @memberOf Observable.prototype
   * @param {String} name
   * @param {Function} observer
   */
  Observable.prototype.observe = function o_observe(name, observer) {
    if (typeof observer !== 'function') {
      return;
    }
    (this._observers[name] = this._observers[name] || []).push(observer);
  };

  /**
   * Unobserve a property
   *
   * @access public
   * @memberOf Observable.prototype
   * @param {String} name
   * @param {Function} observer
   */
  Observable.prototype.unobserve = function o_unobserve(name, observer) {
    if (typeof name === 'function') {
      // (observer) -- remove from every key in _observers
      Object.keys(this._observers).forEach(
        this._removeObserver.bind(this, name));
    } else {
      if (observer) {
        // (prop, observer) -- remove observer from the specific prop
        this._removeObserver(observer, name);
      } else if (name in this._observers) {
        // (prop) -- otherwise remove all observers for property
        this._observers[name] = [];
      }
    }
  };

  // Static functions
  var _dependencyGraphs = new Map();
  /**
   * Each module should have its own dependency graph that decides what
   * observers to called when a property changes. The function returns the
   * dependency graph of a module. It creates one if the map does not exist.
   *
   * @param {Object} modulePrototype
   */
  function _getDependencyGraph(modulePrototype) {
    var dependencyGraph = _dependencyGraphs.get(modulePrototype);
    if (!dependencyGraph) {
      // register a new dependency graph of the module based on the existing
      // dependency graph on the module.
      dependencyGraph = DependencyGraph(modulePrototype._dependencyGraph);
      modulePrototype._dependencyGraph = dependencyGraph;
      _dependencyGraphs.set(modulePrototype, dependencyGraph);
    }
    return dependencyGraph;
  }

  /**
   * The function helps query the values of all dependent properties of a
   * specified property.
   *
   * @param {Observable} observable
   * @param {String} sourceProperty
   *                 The source property name.
   */
  function _getAllDependentValues(observable, sourceProperty) {
    var dependentList = observable._dependencyGraph &&
      observable._dependencyGraph.getAllDependent(sourceProperty);
    if (dependentList && dependentList.length) {
      return dependentList.map((name) => {
        return {
          name: name,
          value: observable[name]
        };
      });
    } else {
      return null;
    }
  }

  function _getterTemplate(name, defaultValue) {
    return function() {
      var value = this[OP_PREFIX(name)];
      if (typeof value === 'undefined') {
        value = this[OP_PREFIX(name)] = defaultValue;
      }
      return value;
    };
  }

  function _setterTemplate(name) {
    return function(value) {
      var oldValue = this[name];
      if (oldValue !== value) {
        // cache the old values of all dependent
        var dependentValues = _getAllDependentValues(this, name);
        // change the value
        this[OP_PREFIX(name)] = value;
        // notify the changes
        this._notify(name, value, oldValue);
        if (dependentValues) {
          dependentValues.forEach((obj) => {
            this._notify(obj.name, this[obj.name], obj.value);
          });
        }
      }
    };
  }

  function _defineObservablePropertyCore(object, name, options) {
    var dependency = options && options.dependency;

    // Update dependency information
    if (dependency) {
      var dependencyGraph = _getDependencyGraph(object);
      dependency.forEach((dependentName) => {
        // name depends on dependentName
        dependencyGraph.addDependency(name, dependentName);
      });
    }

    Object.defineProperty(object, name, {
      enumerable: true,
      get: options.get,
      set: options.set
    });
  }

  function _defineObservableProperty(object, name, options) {
    if (options && options.readonly) {
      var internalName = '_' + name;
      _defineObservablePropertyCore(object, name, {
        dependency: [internalName],
        get: function() {
          return this[internalName];
        }
      });
      _defineObservablePropertyCore(object, internalName, {
        get: _getterTemplate(internalName, options && options.value),
        set: _setterTemplate(internalName)
      });
    } else if (options && options.dependency && options.dependency.length) {
      if (typeof options.get !== 'function') {
        throw new Error('Observable: getter of ' + name + ' is invalid');
      }
      _defineObservablePropertyCore(object, name, {
        dependency: options.dependency,
        get: options.get
      });
    } else {
      _defineObservablePropertyCore(object, name, {
        get: _getterTemplate(name, options && options.value),
        set: _setterTemplate(name)
      });
    }
  }

  /**
   * Observe a property with an observer. The observer is called when the
   * property changes.
   *
   * @access public
   * @memberOf Observable
   * @param {Object} object
   * @param {String} name
   * @param {Object} options
   * @param {Boolean} options.readonly
   *                  Indicating if the property is read-only.
   * @param {Array.<String>} options.dependency
   *                         List of the dependent properties.
   * @param {Function} options.get
   *                   Getter of the property.
   */
  Object.defineProperty(Observable, 'defineObservableProperty', {
    get: function() {
      return _defineObservableProperty;
    }
  });
  return Observable;
});

define('modules/base/event_emitter',['require','modules/base/module'],function(require) {
  'use strict';

  var Module = require('modules/base/module');

  /**
   * EventEmitter implements basic event emitting logics. It also provides
   * function that augments the ability to other objects.
   *
   * @example
   *   var eventEmitter = EventEmitter(['event1', 'event2']);
   *   var eventHandler = function(event) {
   *     console.log(event.detail);
   *   };
   *   var obj = {
   *     handleEvent: function(event) {
   *       console.log(event.detail);
   *     }
   *   };
   *
   *   eventEmitter.addEventListener('event1', eventHandler);
   *   eventEmitter.addEventListener('event2', obj);
   *
   *   eventEmitter._emitEvent('event1', 'value1'); // value1
   *   eventEmitter._emitEvent('event2', 'value2'); // value2
   *
   * Extending from EventEmitter:
   * @example
   *   var NewModule = Module.create(function() {
   *     this.super(EventEmitter).call(this, ['event1', 'event2']);
   *   }).extend(EventEmitter);
   *
   *   var module = NewModule();
   *
   * @class EventEmitter
   * @returns {EventEmitter}
   */
  var EventEmitter = Module.create(function EventEmitter(eventNames) {
    if (eventNames && eventNames.length) {
      this._eventListeners = eventNames.reduce((result, eventName) => {
        result[eventName] = [];
        return result;
      }, {});
    } else {
      this.throw('no valid registered events');
    }
  });

  /**
   * Emit an event of a specific type and a given value.
   *
   * @access private
   * @memberOf EventEmitter.prototype
   * @param {String} eventName
   * @param {Object} value
   */
  EventEmitter.prototype._emitEvent = function(eventName, value) {
    var listeners = this._eventListeners[eventName];
    if (!listeners) {
      this.throw('invalid event name: ' + eventName);
    }

    this.debug('_emitEvent:' + eventName + ' ' + value);
    var eventObj = {
      type: eventName,
      detail: value
    };
    listeners.forEach((listener) => {
      listener.call(this, eventObj);
    });
  };

  /**
   * Add an event listener on an event. If listener is an object,
   * object.handleEvent is called when the event emits.
   *
   * @access public
   * @memberOf EventEmitter.prototype
   * @param {String} eventName
   * @param {(Function|Object)} listener
   */
  EventEmitter.prototype.addEventListener = function(eventName, listener) {
    var listeners = this._eventListeners[eventName];
    if (listener && listeners) {
      switch (typeof listener) {
        case 'function':
          break;
        case 'object':
          if (typeof listener.handleEvent === 'function') {
            listener = listener.handleEvent;
          } else {
            listener = null;
          }
          break;
        default:
          listener = null;
          break;
      }
      if (listener && listeners.indexOf(listener) < 0) {
        listeners.push(listener);
      } 
    } else {
      this.error('addEventListener: invalid listener for ' + eventName);
    }
  };

  /**
   * Remove the event listener from an event.
   *
   * @access public
   * @memberOf EventEmitter.prototype
   * @param {String} eventName
   * @param {(Function|Object)} listener
   */
  EventEmitter.prototype.removeEventListener = function(eventName, listener) {
    var listeners = this._eventListeners[eventName];
    if (listener && listeners) {
      var index = -1;
      var type = typeof listener;
      switch (type) {
        case 'function':
          index = listeners.indexOf(listener);
          break;
        case 'object':
          index = listeners.indexOf(listener.handleEvent);
          break;
      }
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    } else {
      this.error('removeEventListener: invalid listener for ' + eventName);
    }
  };

  return EventEmitter;
});

/**
 * ObservableArray is able to notify its change through events of four basic
 * operations including 'insert', 'remove', 'replace', 'reset'.
 * ObservableArray implements most used methods including 'push', 'pop', and
 * 'splice'. Due to the syntax limitation it provides 'get' and 'set' for
 * manuplication values stored in the array. 'reset' is also provided for
 * replacing te entire array with another one. In addition to these methods,
 * methods including 'forEach', 'map', 'every', 'some', 'indexOf',
 * 'lastIndexOf', 'reduce', and 'reduceRight'.
 *
 * ObservableArray creation:
 * It can be initialized by an ordinary array. If the array is not given, an
 * empty is used by default.
 *
 * @example
 *   var observableArray = ObservableArray([1, 2, 3]);
 *
 * Events:
 * Information regarding the operation is provided in the event detail. Please
 * check the following example:
 *
 * @example
 *   var observableArray = ObservableArray([1, 2, 3]);
 *   var handler = {
 *     handleEvent: function(event) { console.log(JSON.stringify(event)); }
 *   }
 *   observableArray.addEventListener('insert', handler);
 *   observableArray.addEventListener('remove', handler);
 *   observableArray.addEventListener('replace', handler);
 *   observableArray.addEventListener('reset', handler);
 *
 *   observableArray.push(4);
 *   // observableArray is [1, 2, 3, 4]
 *   // event.type is 'insert'
 *   // event.detail is {index: 3, count: 1, items: [4]}
 *
 *   observableArray.pop();
 *   // observableArray is [1, 2, 3]
 *   // event.type is 'remove'
 *   // event.detail is {index: 3, count: 1, items: [4]}
 *
 *   observableArray.set(2, 4);
 *   // observableArray is [1, 2, 4]
 *   // event.type is 'replace'
 *   // event.detail is {index: 2, oldValue: 3, newValue: 4}
 *
 *   observableArray.reset([1, 2, 3]);
 *   // observableArray is [1, 2, 3]
 *   // event.type is 'reset'
 *   // event.detail is {items: [1, 2, 3]}
 *
 *   observableArray.splice(2, 1, [4, 5, 6]);
 *   // observableArray is [1, 2, 4, 5, 6]
 *   // First event:
 *   // event.type is 'remove'
 *   // event.detail is {index: 2, count: 1, items: [3]}
 *   // Second event:
 *   // event.type is 'insert'
 *   // event.detail is {index: 2, count: 3, items: [4, 5, 6]}
 *
 * @module modules/mvvm/observable_array
 */
define('modules/mvvm/observable_array',['require','modules/base/module','modules/base/event_emitter','modules/mvvm/observable'],function(require) {
  'use strict';

  var Module = require('modules/base/module');
  var EventEmitter = require('modules/base/event_emitter');
  var Observable = require('modules/mvvm/observable');

  var Events = ['insert', 'remove', 'replace', 'reset'];
  var ReadOnlyMethods = ['forEach', 'map', 'every', 'some', 'indexOf',
                         'lastIndexOf', 'reduce', 'reduceRight'];

  /**
   * @class ObservableArray
   * @requires module:modules/base/module
   * @requires module:modules/base/event_emitter
   * @requires module:modules/mvvm/observable
   * @returns {ObservableArray}
   */
  var ObservableArray = Module.create(function ObservableArray(array) {
    this.super(Observable).call(this);
    this.super(EventEmitter).call(this, Events);

    this._array = array || [];
    this._length = this._array.length;
  }).extend(Observable, EventEmitter);

  /**
   * An observable property indicating the length of the array.
   *
   * @access public
   * @type {Number}
   */
  Observable.defineObservableProperty(ObservableArray.prototype, 'length', {
    readonly: true
  });

  /**
   * An observable property representing the inner array.
   *
   * @access public
   * @type {Array}
   */
  Observable.defineObservableProperty(ObservableArray.prototype, 'array', {
    readonly: true
  });

  ReadOnlyMethods.forEach(function(op) {
    ObservableArray.prototype[op] = function() {
      return this._array[op].apply(this._array, arguments);
    };
  });

  ObservableArray.prototype.push = function(item) {
    this._array.push(item);
    this._length = this._array.length;

    this._emitEvent('insert', {
      index: this._array.length - 1,
      count: 1,
      items: [item]
    });
  };

  ObservableArray.prototype.pop = function() {
    if (!this._array.length) {
      return null;
    }

    var item = this._array.pop();
    this._length = this._array.length;

    this._emitEvent('remove', {
      index: this._array.length,
      count: 1,
      items: [item]
    });

    return item;
  };

  ObservableArray.prototype.splice = function(index, count) {
    if (arguments.length < 2) {
      return [];
    }

    // Fix the arguments based on the behavior of the real spice function.
    if (index >= this._length) {
      index = this._length - 1;
    } else if (index < 0) {
      index = this._length + index;
    }
    if (count < 0) {
      count = 0;
    }

    var addedItems = Array.prototype.slice.call(arguments, 2);
    var removedItems = this._array.splice.apply(this._array, arguments);
    this._length = this._array.length;

    if (removedItems.length) {
      this._emitEvent('remove', {
        index: index,
        count: count,
        items: removedItems
      });
    }

    if (addedItems.length) {
      this._emitEvent('insert', {
        index: index,
        count: addedItems.length,
        items: addedItems
      });
    }

    return removedItems;
  };

  /**
   * Set a value to the field of a specfied index.
   *
   * @access public
   * @param {Number} index
   * @param {Object} value
   */
  ObservableArray.prototype.set = function(index, value) {
    if (index < 0 || index >= this._array.length) {
      this.throw('set: out of range');
    }

    var oldValue = this._array[index];
    this._array[index] = value;
    this._emitEvent('replace', {
      index: index,
      oldValue: oldValue,
      newValue: value
    });
  };

  /**
   * Get the value from the field of a specfied index.
   *
   * @access public
   * @param {Number} index
   * @returns {Object}
   */
  ObservableArray.prototype.get = function(index) {
    return this._array[index];
  };

  /**
   * Replace the entire array with another one.
   *
   * @access public
   * @param {Array} array
   */
  ObservableArray.prototype.reset = function(array) {
    this._array = array || [];
    this._length = this._array.length;
    this._emitEvent('reset', {
      items: this._array
    });
  };

  return ObservableArray;
});

/**
 * PageTransitions provides transition functions used when navigating panels.
 *
 * @module PageTransitions
 */
define('modules/page_transitions',[],function() {
  'use strict';

  var _sendPanelReady = function _send_panel_ready(oldPanelHash, newPanelHash) {
    var detail = {
      previous: oldPanelHash,
      current: newPanelHash
    };
    var event = new CustomEvent('panelready', {detail: detail});
    window.dispatchEvent(event);
  };

  return {
    /**
     * Typically used with phone size device layouts.
     *
     * @alias module:PageTransitions#oneColumn
     * @param {String} oldPanel
     * @param {String} newPanel
     * @param {Function} callback
     */
    oneColumn: function pt_one_column(oldPanel, newPanel, callback) {
      if (oldPanel === newPanel) {
        callback();
        return;
      }

      // switch previous/current classes
      if (oldPanel) {
        oldPanel.className = newPanel.className ? '' : 'previous';
      }
      if (newPanel.className === 'current') {
        _sendPanelReady(oldPanel && '#' + oldPanel.id, '#' + newPanel.id);

        if (callback) {
          callback();
        }
        return;
      }

      newPanel.className = 'current';

      /**
       * Most browsers now scroll content into view taking CSS transforms into
       * account.  That's not what we want when moving between <section>s,
       * because the being-moved-to section is offscreen when we navigate to its
       * #hash.  The transitions assume the viewport is always at document 0,0.
       * So add a hack here to make that assumption true again.
       * https://bugzilla.mozilla.org/show_bug.cgi?id=803170
       */
      if ((window.scrollX !== 0) || (window.scrollY !== 0)) {
        window.scrollTo(0, 0);
      }

      newPanel.addEventListener('transitionend', function paintWait() {
        newPanel.removeEventListener('transitionend', paintWait);
        if (oldPanel) {
          _sendPanelReady('#' + oldPanel.id, '#' + newPanel.id);

          if (oldPanel.className === 'current') {
            return;
          }
        } else {
          _sendPanelReady(null, '#' + newPanel.id);
        }

        if (callback) {
          callback();
        }
      });
    },

    /**
     * Typically used with tablet size device layouts.
     *
     * @alias module:PageTransitions#twoColumn
     * @param {String} oldPanel
     * @param {String} newPanel
     * @param {Function} callback
     */
    twoColumn: function pt_two_column(oldPanel, newPanel, callback) {
      if (oldPanel === newPanel) {
        callback();
        return;
      }

      if (oldPanel) {
        oldPanel.className = newPanel.className ? '' : 'previous';
        newPanel.className = 'current';
        _sendPanelReady('#' + oldPanel.id, '#' + newPanel.id);
      } else {
        newPanel.className = 'current';
        _sendPanelReady(null, '#' + newPanel.id);
      }

      if (callback) {
        callback();
      }
    }
  };
});

/**
 * Panel is the basic element for navigation. Which defines Six basic
 * functions: show, hide, beforeShow, beforeHide, init, and uninit for
 * navigation. These functions are called by `SettingsService` during the
 * navigation.
 * Internal functions onShow, onHide, onBeforeShow, onBeforeHide, onInit,
 * and onUninit are called respectively in the basic functions.
 *
 * @module Panel
 */
define('modules/panel',[],function() {
  'use strict';

  var _emptyFunc = function panel_emptyFunc() {};

  /**
   * @alias module:Panel
   * @param {Object} options
   *                 Options are used to override the internal functions.
   * @returns {Panel}
   */
  var Panel = function ctor_panel(options) {
    var _initialized = false;

    options = options || {};
    options.onInit = options.onInit || _emptyFunc;
    options.onUninit = options.onUninit || _emptyFunc;
    options.onShow = options.onShow || _emptyFunc;
    options.onHide = options.onHide || _emptyFunc;
    options.onBeforeShow = options.onBeforeShow || _emptyFunc;
    options.onBeforeHide = options.onBeforeHide || _emptyFunc;

    return {
      /**
       * Get a value that indicates whether the panel has been initialized.
       *
       * @alias module:Panel#initialized
       * @return {Boolean}
       */
      get initialized() {
        return _initialized;
      },

      /**
       * Called at the first time when the beforeShow function is called.
       *
       * @alias module:Panel#init
       * @param {HTMLElement} panel
       * @param {Object} initOptions
       */
      init: function(panel, initOptions) {
        if (_initialized) {
          return;
        }
        _initialized = true;

        return options.onInit(panel, initOptions);
      },

      /**
       * Called when cleanup.
       *
       * @alias module:Panel#uninit
       */
      uninit: function() {
        if (!_initialized) {
          return;
        }
        _initialized = false;

        options.onUninit();
      },

      /**
       * Called when the panel is navigated into the viewport.
       *
       * @alias module:Panel#show
       * @param {HTMLElement} panel
       * @param {Object} showOptions
       */
      show: function(panel, showOptions) {
        // Initialize at the first call to show if necessary.
        return Promise.resolve(this.init(panel, showOptions)).then(function() {
          return options.onShow(panel, showOptions);
        });
      },

      /**
       * Called when the panel is navigated out of the viewport.
       *
       * @alias module:Panel#hide
       */
      hide: function() {
        return options.onHide();
      },

      /**
       * Called when the panel is about to be navigated to into the viewport.
       *
       * @alias module:Panel#beforeShow
       * @param {HTMLElement} panel
       * @param {Object} beforeShowOptions
       */
      beforeShow: function(panel, beforeShowOptions) {
        // Initialize at the first call to beforeShow.
        return Promise.resolve(this.init(panel, beforeShowOptions)).then(
          function() {
            return options.onBeforeShow(panel, beforeShowOptions);
        });
      },

      /**
       * Called when the panel is about to be navigated out of the viewport.
       *
       * @alias module:Panel#beforeHide
       * @param {HTMLElement} panel
       * @param {Object} beforeShowOptions
       */
      beforeHide: function() {
        return options.onBeforeHide();
      }
    };
  };
  return Panel;
});

/**
 * SettingsCache is a singleton that caches mozSettings values for fast
 * access.
 *
 * @module SettingsCache
 */
define('modules/settings_cache',[],function() {
  'use strict';
  var _settings = window.navigator.mozSettings;

  // Cache of all current settings values.  There's some large stuff
  // in here, but not much useful can be done with the settings app
  // without these, so we keep this around most of the time.
  var _settingsCache = null;

  // True when a request has already been made to fill the settings
  // cache.  When this is true, no further get("*") requests should be
  // made; instead, pending callbacks should be added to
  // _pendingSettingsCallbacks.
  var _settingsCacheRequestSent = null;

  // There can be race conditions in which we need settings values,
  // but haven't filled the cache yet.  This array tracks those
  // listeners.
  var _pendingSettingsCallbacks = [];

  var _callbacks = [];

  var _onSettingsChange = function sc_onSettingsChange(event) {
    var key = event.settingName;
    var value = event.settingValue;

    // Always update the cache if it's present, even if the DOM
    // isn't loaded yet.
    if (_settingsCache) {
      _settingsCache[key] = value;
    }

    _callbacks.forEach(function(callback) {
      callback(event);
    });
  };

  if (_settings) {
    _settings.onsettingchange = _onSettingsChange;
  }

  /**
   * Event reporting that a setting value is changed.
   *
   * @event module:SettingsCache#settingsChange
   * @property {MozSettingsEvent} event
   */
  var SettingsCache = {
    // the reset function is for unit tests
    reset: function sc_reset() {
      _settings = window.navigator.mozSettings;
      if (_settings) {
        _settings.onsettingchange = _onSettingsChange;
      }
      _settingsCache = null;
      _settingsCacheRequestSent = null;
      _pendingSettingsCallbacks = [];
      _callbacks = [];
    },

    get cache() {
      return _settingsCache;
    },

    /**
     * Where callback is a function to be called with a request object for a
     * successful fetch of settings values, when those values are ready.
     *
     * @alias module:SettingsCache#getSettings
     * @param {Function} callback
     */
    getSettings: function sc_getSettings(callback) {
      if (!_settings) {
        return;
      }

      if (_settingsCache && callback) {
        // Fast-path that we hope to always hit: our settings cache is
        // already available, so invoke the callback now.
        callback(_settingsCache);
        return;
      }

      if (!_settingsCacheRequestSent && !_settingsCache) {
        _settingsCacheRequestSent = true;
        var lock = _settings.createLock();
        var request = lock.get('*');
        request.onsuccess = function(e) {
          var result = request.result;
          var cachedResult = {};
          for (var attr in result) {
            cachedResult[attr] = result[attr];
          }
          _settingsCache = cachedResult;
          var cbk;
          while ((cbk = _pendingSettingsCallbacks.pop())) {
            cbk(result);
          }
        };
      }
      if (callback) {
        _pendingSettingsCallbacks.push(callback);
      }
    },

    /**
     * @alias module:SettingsCache#addEventListener
     * @param {String} eventName
     * @param {Function} callback
     */
    addEventListener: function sc_addEventListener(eventName, callback) {
      if (eventName !== 'settingsChange') {
        return;
      }
      var index = _callbacks.indexOf(callback);
      if (index === -1) {
        _callbacks.push(callback);
      }
    },

    /**
     * @alias module:SettingsCache#removeEventListener
     * @param {String} eventName
     * @param {Function} callback
     */
    removeEventListener: function sc_removeEventListsner(eventName, callback) {
      if (eventName !== 'settingsChange') {
        return;
      }
      var index = _callbacks.indexOf(callback);
      if (index !== -1) {
        _callbacks.splice(index, 1);
      }
    }
  };

  // Make a request for settings to warm the cache, since we need it
  // very soon in startup after the DOM is available.
  SettingsCache.getSettings(null);
  return SettingsCache;
});

/**
 * PanelUtils is a singleton that defines panel related utility functions.
 *
 * @module PanelUtils
 */
define('modules/panel_utils',['require','settings','modules/settings_cache','shared/lazy_loader'],function(require) {
  'use strict';

  var Settings = require('settings');
  var SettingsCache = require('modules/settings_cache');
  var LazyLoader = require('shared/lazy_loader');

  var _settings = navigator.mozSettings;

  /**
   * These so-called "dialog boxes" are just standard Settings panels
   * (<section role="region" />) with reset/submit buttons: these buttons both
   * return to the previous panel when clicked, and each button has its own
   * (optional) callback.
   */
  function openDialog(dialogID, onSubmit, onReset) {
    if ('#' + dialogID === Settings.currentPanel) {
      return;
    }

    var origin = Settings.currentPanel;

    // Load dialog contents and show it.
    Settings.currentPanel = dialogID;

    var dialog = document.getElementById(dialogID);
    var submit = dialog.querySelector('[type=submit]');
    if (submit) {
      submit.onclick = function onsubmit() {
        if (typeof onSubmit === 'function') {
          (onSubmit.bind(dialog))();
        }
        Settings.currentPanel = origin; // hide dialog box
      };
    }

    var reset = dialog.querySelector('[type=reset]');
    if (reset) {
      reset.onclick = function onreset() {
        if (typeof onReset === 'function') {
          (onReset.bind(dialog))();
        }
        Settings.currentPanel = origin; // hide dialog box
      };
    }
  }

  /* Open a link with a web activity */
  function openLink(url) {
    if (url.startsWith('tel:')) { // dial a phone number
      var telActivity = new window.MozActivity({
        name: 'dial',
        data: { type: 'webtelephony/number', number: url.substr(4) }
      });
      // For workaround jshint.
      telActivity.onsuccess = function() {};
    } else if (!url.startsWith('#')) { // browse a URL
      var linkActivity = new window.MozActivity({
        name: 'view',
        data: { type: 'url', url: url }
      });
      // For workaround jshint.
      linkActivity.onsuccess = function() {};
    }
  }

  /**
   * Opens the dialog of a specified id.
   *
   * @param {String} dialogID
   *                 The id of the dialog element.
   */
  var _openDialog = function pu_openDialog(dialogID) {
    var dialog = document.getElementById(dialogID);
    var fields = Array.prototype.slice.call(
      dialog.querySelectorAll('[data-setting]:not([data-ignore])'));

    var updateInput = function(lock, input) {
      var key = input.dataset.setting;
      var request = lock.get(key);

      request.onsuccess = function() {
        switch (input.type) {
          case 'gaia-radio':
            input.checked = (input.value == request.result[key]);
            break;
          case 'checkbox':
          case 'gaia-checkbox':
            input.checked = request.result[key] || false;
            break;
          case 'select-one':
            input.value = request.result[key] || '';
            break;
          default:
            input.value = request.result[key] || '';
            break;
        }
      };
    };

    /**
     * In Settings dialog boxes, we don't want the input fields to be preset
     * by Settings.init() and we don't want them to set the related settings
     * without any user validation.
     *
     * So instead of assigning a `name' attribute to these inputs, a
     * `data-setting' attribute is used and the input values are set
     * explicitely when the dialog is shown.  If the dialog is validated
     * (submit), their values are stored into B2G settings.
     *
     * XXX warning:
     * this only supports text/password/radio/select/radio input types.
     */

    // initialize all setting fields in the dialog box
    // XXX for fields being added by lazily loaded script,
    // it would have to initialize the fields again themselves.
    function reset() {
      if (_settings) {
        var lock = _settings.createLock();
        fields.forEach(updateInput.bind(null, lock));
      }
    }

    // validate all settings in the dialog box
    function submit() {
      if (_settings) {
        // Update the fields node list to include dynamically added fields
        fields = Array.prototype.slice.call(
          dialog.querySelectorAll('[data-setting]:not([data-ignore])'));
        var cset = {}, key;
        var lock = _settings.createLock();

        fields.forEach(function(input) {
          key = input.dataset.setting;
          switch (input.type) {
            case 'gaia-radio':
              if (input.checked) {
                cset[key] = input.value;
              }
              break;
            case 'checkbox':
            case 'gaia-checkbox':
              cset[key] = input.checked;
              break;
            default:
              cset[key] = input.value;
              break;
          }
        });
        lock.set(cset);
      }
    }

    reset(); // preset all fields before opening the dialog
    openDialog(dialogID, submit);
  };

  return {
    /**
     * The function parses all links in the panel and adds corresponding
     * handlers.
     * There are three types of links:
     * - a[href^="http"]: External link
     * - a[href^="tel"]: External link
     * - [data-href]: Generic dialog link and settings-specific dialog link
     *
     * @alias module:PanelUtils#activate
     * @param {HTMLElement} panel
     *                      The root element of the panel.
     */
    activate: function pu_activate(panel) {
      // activate all scripts
      var scripts = panel.getElementsByTagName('script');
      var scripts_src = Array.prototype.map.call(scripts, function(script) {
        return script.getAttribute('src');
      });
      LazyLoader.load(scripts_src);

      var _onclick = function(evt) {
        if (!this.dataset.href) {
          this.dataset.href = this.href;
          this.href = '#';
        }
        var href = this.dataset.href;
        if (!href.startsWith('#')) { // external link
          evt.target.blur();
          openLink(href);
        } else if (!href.endsWith('Settings')) { // generic dialog
          openDialog(href.substr(1));
        } else { // Settings-specific dialog box
          _openDialog(href.substr(1));
        }
        return false;
      };

      // activate all links
      var rule = 'a[href^="http"], a[href^="tel"], [data-href]';
      var links = panel.querySelectorAll(rule);
      var i, count;

      for (i = 0, count = links.length; i < count; i++) {
        if (links[i].tagName !== 'GAIA-HEADER') {
          links[i].addEventListener('click', _onclick);
        }
      }

      // Setup back listener
      var backHeader = panel.querySelector('gaia-header[action="back"]');
      var href = backHeader && backHeader.dataset.href;
      if (backHeader && href) {
        backHeader.addEventListener('action', function() {
          Settings.currentPanel = this.dataset.href;
        });
      }
    },

    goBack: function pu_goBack(panel) {
      var backHeader = panel.querySelector('gaia-header[action="back"]');
      var href = backHeader && backHeader.dataset.href;
      if (backHeader && href) {
        Settings.currentPanel = backHeader.dataset.href;
      }
    },

    /**
     * The function presets elements with the settings values.
     * The supported formats are:
     * - An input element with a "name" attribute and its value is a settings
     *   key.
     * - A select element with a "name" attribute and its value is a settings
     *   key.
     * - A span element with a "data-name" attribute and its value is a settings
     *   key.
     *
     * @alias module:PanelUtils#preset
     * @param {HTMLElement} panel
     *                      The root element of the panel.
     */
    preset: function pu_preset(panel) {
      SettingsCache.getSettings(function(result) {
        panel = panel || document;

        // preset all checkboxes
        var rule = 'input[type="checkbox"]:not([data-ignore]), gaia-switch, ' +
          'gaia-checkbox';
        var checkboxes = panel.querySelectorAll(rule);
        var i, count, key;
        for (i = 0, count = checkboxes.length; i < count; i++) {
          key = checkboxes[i].name;
          if (key && result[key] !== undefined) {
            checkboxes[i].checked = !!result[key];
          }
        }

        // remove initial class so the swich animation will apply
        // on these toggles if user interact with it.
        setTimeout(function() {
          for (i = 0, count = checkboxes.length; i < count; i++) {
            if (checkboxes[i].classList.contains('initial')) {
              checkboxes[i].classList.remove('initial');
            }
          }
        }, 0);

        // preset all radio buttons
        rule = 'gaia-radio:not([data-ignore])';
        var radios = panel.querySelectorAll(rule);
        for (i = 0, count = radios.length; i < count; i++) {
          key = radios[i].name;
          if (key && result[key] !== undefined) {
            radios[i].checked = (result[key] === radios[i].value);
          }
        }

        // preset all text inputs
        rule = 'input[type="text"]:not([data-ignore])';
        var texts = panel.querySelectorAll(rule);
        for (i = 0, count = texts.length; i < count; i++) {
          key = texts[i].name;
          if (key && result[key] !== undefined) {
            texts[i].value = result[key];
          }
        }

        // preset all range inputs
        rule = 'input[type="range"]:not([data-ignore])';
        var ranges = panel.querySelectorAll(rule);
        for (i = 0, count = ranges.length; i < count; i++) {
          key = ranges[i].name;
          if (key && result[key] !== undefined) {
            ranges[i].value = parseFloat(result[key]);
          }
        }

        // preset all select
        var selects = panel.querySelectorAll('select');
        for (i = 0, count = selects.length; i < count; i++) {
          var select = selects[i];
          key = select.name;
          if (key && result[key] !== undefined) {
            var value = result[key];
            var option = 'option[value="' + value + '"]';
            var selectOption = select.querySelector(option);
            if (selectOption) {
              selectOption.selected = true;
            }
          }
        }

        // preset all span with data-name fields
        rule = '[data-name]:not([data-ignore])';
        var spanFields = panel.querySelectorAll(rule);
        for (i = 0, count = spanFields.length; i < count; i++) {
          key = spanFields[i].dataset.name;

          // XXX intentionally checking for the string 'undefined',
          // see bug 880617
          if (key && result[key] && result[key] != 'undefined') {
            // check whether this setting comes from a select option
            // (it may be in a different panel, so query the whole document)
            rule = '[data-setting="' + key + '"] ' +
              '[value="' + result[key] + '"]';
            var option_span = document.querySelector(rule);
            if (option_span) {
              spanFields[i].setAttribute('data-l10n-id',
                option_span.getAttribute('data-l10n-id'));
            } else {
              spanFields[i].removeAttribute('data-l10n-id');
              spanFields[i].textContent = result[key];
            }
          } else { // result[key] is undefined
            switch (key) {
              //XXX bug 816899 will also provide 'deviceinfo.software' from
              // Gecko which is {os name + os version}
              case 'deviceinfo.software':
                document.l10n.setAttributes(spanFields[i],
                  'deviceInfo_software',
                  { os: result['deviceinfo.os'] });
                break;

              //XXX workaround request from bug 808892 comment 22
              //  hide this field if it's undefined/empty.
              case 'deviceinfo.firmware_revision':
                spanFields[i].parentNode.hidden = true;
                break;

              case 'deviceinfo.mac':
                spanFields[i].setAttribute('data-l10n-id', 'macUnavailable');
                break;
            }
          }
        }

        // unhide items according to preferences.
        rule = '[data-show-name]:not([data-ignore])';
        var hiddenItems = panel.querySelectorAll(rule);
        for (i = 0; i < hiddenItems.length; i++) {
          key = hiddenItems[i].dataset.showName;
          hiddenItems[i].hidden = !result[key];
        }
      });
    },

    /**
     * When a link element is clicked, the function navigates the app to the
     * panel of the id specified by the "href" attribute of the element.
     *
     * @alias module:PanelUtils#onLinkClick
     * @param {Event} event
     */
    onLinkClick: function pu_onLinkClick(event) {
      var target = event.target;
      var href;

      if (target.classList.contains('icon-back')) {
        href = target.parentNode.getAttribute('href');
      } else {
        var nodeName = target.nodeName.toLowerCase();
        if (nodeName != 'a') {
          return;
        }
        href = target.getAttribute('href');
      }
      // skips the following case:
      // 1. no href, which is not panel
      // 2. href is not a hash which is not a panel
      // 3. href equals # which is translated with loadPanel function, they are
      //    external links.
      if (!href || !href.startsWith('#') || href === '#') {
        return;
      }

      Settings.currentPanel = href;
      event.preventDefault();
    },

    /**
     * Respond to settings changes.
     * The supported formats are:
     * - An input element with a "name" attribute and its value is a settings
     *   key.
     * - A select element with a "name" attribute and its value is a settings
     *   key.
     * - A span element with a "data-name" attribute and its value is a settings
     *   key.
     * - Elements with a "data-show-name" attribute. It hides the element when
     *   the value is false and vice versa.
     *
     * @alias module:PanelUtils#onSettingsChange
     * @param {HTMLElement} panel
     * @param {Event} event
     */
    onSettingsChange: function pu_onSettingsChange(panel, event) {
      var key = event.settingName;
      var value = event.settingValue;
      var i, count;

      // update <span> values when the corresponding setting is changed
      var rule = '[data-name="' + key + '"]:not([data-ignore])';
      var spanField = panel.querySelector(rule);
      if (spanField) {
        // check whether this setting comes from a select option
        var options = panel.querySelector('select[data-setting="' + key + '"]');
        if (options) {
          // iterate option matching
          for (i = 0, count = options.length; i < count; i++) {
            if (options[i] && options[i].value === value) {
              spanField.dataset.l10nId = options[i].dataset.l10nId;
              spanField.textContent = options[i].textContent;
            }
          }
        } else {
          spanField.textContent = value;
        }
      }

      // hide or unhide items
      rule = '[data-show-name="' + key + '"]:not([data-ignore])';
      var items = document.querySelectorAll(rule);
      for (i = 0; i < items.length; i++) {
        items[i].hidden = !value;
      }

      // update <input> values when the corresponding setting is changed
      var inputs = [].slice.call(panel.querySelectorAll(
        `input[name="${key}"],
        gaia-switch[name="${key}"],
        gaia-checkbox[name="${key}"],
        gaia-radio[name="${key}"]`));
      if (!inputs.length) {
        return;
      }

      inputs.forEach((input) => {
        switch (input.type) {
          case 'gaia-switch':
          case 'gaia-checkbox':
          case 'checkbox':
          case 'switch':
            value = !!value;
            if (input.checked === value) {
              return;
            }
            input.checked = value;
            break;
          case 'range':
            if (input.value === value) {
              return;
            }
            input.value = value;
            break;
          case 'select':
            for (i = 0, count = input.options.length; i < count; i++) {
              if (input.options[i].value === value) {
                input.options[i].selected = true;
                break;
              }
            }
            break;
          case 'gaia-radio':
            input.checked = (input.value === value);
            break;
        }
      });
    },

    /**
     * Respond to settings changes.
     * The supported formats are:
     * - An input element with a "name" attribute and its value is a settings
     *   key.
     * - A select element with a "name" attribute and its value is a settings
     *   key.
     * - A span element with a "data-name" attribute and its value is a settings
     *   key.
     * - Elements with a "data-show-name" attribute. It hides the element when
     *   the value is false and vice versa.
     *
     * @alias module:PanelUtils#onInputChange
     * @param {HTMLElement} panel
     * @param {Event} event
     */
    onInputChange: function pu_onInputChange(event) {
      var input = event.target;
      var type = input.type || input.nodeName.toLowerCase();
      var key = input.name;

      //XXX should we check data-ignore here?
      if (!key || !_settings || event.type != 'change') {
        return;
      }

      // Not touching <input> with data-setting attribute here
      // because they would have to be committed with a explicit "submit"
      // of their own dialog.
      if (input.dataset.setting) {
        return;
      }

      var value;
      switch (type) {
        case 'gaia-switch':
        case 'gaia-checkbox':
        case 'checkbox':
        case 'switch':
          value = input.checked; // boolean
          break;
        case 'range':
          // Bug 906296:
          //   We parseFloat() once to be able to round to 1 digit, then
          //   we parseFloat() again to make sure to store a Number and
          //   not a String, otherwise this will make Gecko unable to
          //   apply new settings.
          value = parseFloat(parseFloat(input.value).toFixed(1)); // float
          break;
        case 'select-one':
        case 'gaia-radio':
        case 'text':
        case 'password':
          value = input.value; // default as text
          if (input.dataset.valueType === 'integer') { // integer
            value = parseInt(value);
          }
          break;
      }

      var cset = {}; cset[key] = value;
      _settings.createLock().set(cset);
    }
  };
});

/**
 * SettingsPanel extends Panel with basic settings services. It presets the UI
 * elements based on the values in mozSettings and add listeners responding to
 * mozSettings changes in onReady. In onInit it parses the panel element for
 * activating links. It also removes listeners in onDone so that we can avoid
 * unwanted UI updates when the panel is outside of the viewport.
 *
 * @module SettingsPanel
 */
 /* global SpatialNavigationHelper, SharedUtils */
define('modules/settings_panel',['require','modules/panel','modules/settings_cache','modules/panel_utils'],function(require) {
    'use strict';

    var Panel = require('modules/panel');
    var SettingsCache = require('modules/settings_cache');
    var PanelUtils = require('modules/panel_utils');

    var _emptyFunc = function panel_emptyFunc() {};

    /**
     * @alias module:SettingsPanel
     * @param {Object} options
     *                 Options are used to override the internal functions of
     *                 Panel.
     * @returns {SettingsPanel}
     */
    var SettingsPanel = function ctor_SettingsPanel(options) {
      /**
       * The root element of the panel.
       *
       * @type {HTMLElement}
       */
      var _panel = null;

      /**
       * The handler is called when settings change.
       *
       * @param {Event} event
       */
      var _settingsChangeHandler = function(event) {
        PanelUtils.onSettingsChange(_panel, event);
      };

      /**
       * Add listeners to make the panel be able to respond to setting changes
       * and user interactions.
       *
       * @param {HTMLElement} panel
       */
      var _addListeners = function panel_addListeners(panel) {
        if (!panel) {
          return;
        }

        SettingsCache.addEventListener('settingsChange',
          _settingsChangeHandler);
        panel.addEventListener('change', PanelUtils.onInputChange);
        panel.addEventListener('click', PanelUtils.onLinkClick);
      };

      /**
       * Remove all listeners.
       *
       * @param {HTMLElement} panel
       */
      var _removeListeners = function panel_removeListeners(panel) {
        if (!panel) {
          return;
        }

        SettingsCache.removeEventListener('settingsChange',
          _settingsChangeHandler);
        panel.removeEventListener('change', PanelUtils.onInputChange);
        panel.removeEventListener('click', PanelUtils.onLinkClick);
      };

      options = options || {};
      options.onInit = options.onInit || _emptyFunc;
      options.onUninit = options.onUninit || _emptyFunc;
      options.onShow = options.onShow || _emptyFunc;
      options.onHide = options.onHide || _emptyFunc;
      options.onBeforeShow = options.onBeforeShow || _emptyFunc;
      options.onBeforeHide = options.onBeforeHide || _emptyFunc;

      var _goBackHandler = function panel_goBackHandler(evt) {
        if (SharedUtils && SharedUtils.isBackKey(evt)) {
          PanelUtils.goBack(_panel);
        }
      };
      var boundGoBackHandler = _goBackHandler.bind(this);

      return Panel({
        onInit: function(panel, initOptions) {
          if (!panel) {
            return;
          }

          _panel = panel;
          PanelUtils.activate(panel);

          return options.onInit(panel, initOptions);
        },
        onUninit: function() {
          _removeListeners(_panel);
          _panel = null;
          options.onUninit();
        },
        onShow: function(panel, showOptions) {
          return options.onShow(panel, showOptions);
        },
        onHide: function() {
          // Remove listeners.
          _removeListeners(_panel);

          return options.onHide();
        },
        onBeforeShow: function(panel, beforeShowOptions) {
          // Preset the panel every time when it is presented.
          PanelUtils.preset(panel);
          _addListeners(panel);
          return options.onBeforeShow(panel, beforeShowOptions);
        },
        onBeforeHide: function() {
          return options.onBeforeHide();
        }
      });
    };
    return SettingsPanel;
});

/**
 * PanelCache is a singleton that loads a panel module based on the panel id
 * and caches the loaded modules.
 *
 * @module PanelCache
 */
define('modules/panel_cache',['require','modules/settings_panel','shared/lazy_loader'],function(require) {
    'use strict';

    var SettingsPanel = require('modules/settings_panel');
    var LazyLoader = require('shared/lazy_loader');

    var _panelCache = {};
    var _panelStylesheetsLoaded = false;

    // experiment result shows
    // load all related styles once is time saver
    var _loadPanelStylesheetsIfNeeded = function loadPanelCSS() {
      if (_panelStylesheetsLoaded) {
        return;
      }

      LazyLoader.load(['../shared/css/action_menu.css',
                       '../shared/css/confirm.css',
                       '../shared/css/progress_activity.css',
                       '../shared/elements/gaia-icons/bidi-helper.css',
                       '../shared/elements/gaia_buttons/script.js',
                       '../shared/elements/gaia_confirm/script.js'],
      function callback() {
        _panelStylesheetsLoaded = true;
      });
    };

    // load styles in idle time after document loaded
    navigator.addIdleObserver({
      time: 3,
      onidle: _loadPanelStylesheetsIfNeeded
    });

    return {
      // this is for unit test
      reset: function spc_reset() {
        _panelCache = {};
        _panelStylesheetsLoaded = false;
      },

      /**
       * Get the panel module of a specified id. If there is no corresponding
       * panel module of the id, it returns SettingsPanel.
       *
       * @alias module:PanelCache#get
       * @param {String} panelId
       *                 The id of the to be loaded panel.
       * @param {Function} callback
       *                   The function to be called when the panel is loaded.
       */
      get: function spc_get(panelId, callback) {
        if (!panelId && !callback) {
          return;
        }

        if (panelId !== 'root') {
          _loadPanelStylesheetsIfNeeded();
        }

        var cachedPanel = _panelCache[panelId];
        if (cachedPanel) {
          if (callback) {
            callback(cachedPanel);
          }
        } else {
          // Get the path of the panel creation function
          var panelElement = document.getElementById(panelId);
          if (panelElement) {
            var pathElement = panelElement.querySelector('panel');
            var path = pathElement ? pathElement.dataset.path : null;

            var panelFuncLoaded = function(panelFunc) {
              var panel = panelFunc();
              _panelCache[panelId] = panel;
              if (callback) {
                callback(panel);
              }
            };

            if (path) {
              require([path], function(panelFunc) {
                // Create a new panel object for static panels.
                panelFuncLoaded(panelFunc ? panelFunc : SettingsPanel);
              });
            } else {
              panelFuncLoaded(SettingsPanel);
            }
          } else {
            if (callback) {
              callback(null);
            }
          }
        }
      }
    };
});

/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */



/**
 * This script can identify the size and watch change of mediaquery.
 *
 * You can get current layout by calling |gerCurrentLayout|,
 * it will only return matching type from defaultQueries.
 *
 * You can use |watch| and |unwatch| to start/stop watch on specific
 * mediaquery string, such as tiny/small/medium/large, you can also
 * define your own watcher. After start watcher, this script
 * will dispatch 'screenlayoutchange' event and pass name and status.
 */

var ScreenLayout = {
  //Refer to famous libraries, like Twitter Bootstrap and Foundation
  //we choose 768, 992, 1200 width as our breakpoints
  defaultQueries: {
    tiny: '(max-width: 767px)',
    small: '(min-width: 768px) and (max-width: 991px)',
    medium: '(min-width: 992px) and (max-width: 1200px)',
    large: '(min-width: 1201px)',
    hardwareHomeButton: '(-moz-physical-home-button)'
  },

  init: function sl_init() {
    // loop defaultQueries and add window.matchMedia()
    // to this.queries object
    this.queries = (function(qs) {
      var result = {};
      for (var key in qs) {
        result[key] = window.matchMedia(qs[key]);
      }
      return result;
    })(this.defaultQueries);
  },

  _isOnRealDevice: undefined,

  isOnRealDevice: function sl_isOnRealDevice() {
    if (typeof(this._isOnRealDevice) !== 'undefined') {
      return this._isOnRealDevice;
    }

    // XXX: A hack to know we're using real device or not
    // is to detect screen size.
    // The screen size of b2g running on real device
    // is the same as the size of system app.
    if (window.innerWidth === screen.availWidth) {
      this._isOnRealDevice = true;
    } else {
      this._isOnRealDevice = false;
    }

    return this._isOnRealDevice;
  },

  // name: |String|, ex: 'tiny', 'small', 'medium'
  //
  // tell user what type it is now
  // if type is undeined, it will return matching type from "defaultQueries"
  // if type is given, it will return boolean based on all watching queries
  getCurrentLayout: function sl_getCurrentLayout(type) {
    if (type === undefined) {
      for (var name in this.defaultQueries) {
        if (this.queries[name] && this.queries[name].matches) {
          return name;
        }
      }
    }
    if (typeof this.queries[type] !== 'undefined') {
      return this.queries[type].matches;
    }
    return false;
  },

  // name: |String|, ex: 'tiny', 'small', 'medium', 'large'
  // media: |String| optional, ex: '(max-width: 767px)'
  //
  // Start the |name| watcher
  // If |name| is not predefined in defaultQueries,
  // then |media| is required.
  //
  // If overwrite defaultQueries with new |media|,
  // |getCurrentLayout| will be also based on new config.
  watch: function sl_watch(name, media) {
    var mediaString = media || this.queries[name].media;
    if (!mediaString) {
      return;
    }
    this.unwatch(name);
    this.queries[name] = window.matchMedia(mediaString);
    this.boundHandleChange = this.handleChange.bind(this);
    this.queries[name].addListener(this.boundHandleChange);
  },

  unwatch: function sl_unwatch(name) {
    if (this.queries[name]) {
      this.queries[name].removeListener(this.boundHandleChange);
    }
  },

  // Dispatch screenlayoutchange event, and pass mediaquery name and
  // status, which represent name of activating mediaquery and
  // activate status(boolean). ex: {name: 'small', status: true}
  handleChange: function sl_handleChange(evt) {
    for (var key in this.queries) {
      if (this.queries[key].media !== evt.media) {
        continue;
      }
      window.dispatchEvent(new CustomEvent('screenlayoutchange', {
        detail: {
          name: key,
          status: evt.matches
        }
      }));
    }
  }
};

ScreenLayout.init();

define("shared/screen_layout", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.ScreenLayout;
    };
}(this)));

/**
 * SettingsService is a singleton that provides the navigation service. It
 * gets the corresponding panel module from PanelCache and call to its basic
 * functions when navigating.
 *
 * @module SettingsService
 */
define('modules/settings_service',['require','modules/page_transitions','modules/panel_cache','shared/screen_layout','shared/lazy_loader','settings'],function(require) {
    'use strict';

    var PageTransitions = require('modules/page_transitions');
    var PanelCache = require('modules/panel_cache');
    var ScreenLayout = require('shared/screen_layout');
    var LazyLoader = require('shared/lazy_loader');
    var Settings = require('settings');

    var _rootPanelId = null;
    /**
     * _currentNavigation caches information of the current panel including id,
     * element, module, and options.
     */
    var _currentNavigation = null;
    var _navigating = false;
    var _pendingNavigationRequest = null;

    var _cachedNavigation = null;
    var _cachedNavigationOptions = {};

    var _activityHandler = null;

    var _loadModulesForSubPanelsPromise = null;

    var _getAppNameToLink = function ss_get_app_name_to_link(panelId) {
      var reAppName = /app:(\w+)/;
      var name = reAppName.exec(panelId);
      return name && name[1];
    };

    var _getAppInfo = function ss_get_app_info(appName) {
      // We can customize the path for specific apps
      var _supportedAppInFrame = {
        keyboard: {},
        bluetooth: {}
      };

      var appInfo = _supportedAppInFrame[appName];
      if (!appInfo) {
        return false;
      }

      var prefix = 'app://' + appName + '.gaiamobile.org/';
      var defaultSrc = prefix + 'settings.html';
      var appMozapp = prefix + 'manifest.webapp';
      var appSrc = appInfo.src ? prefix + appInfo.src : defaultSrc;

      return {
        src: appSrc,
        mozapp: appMozapp
      };
    };

    var _isTabletAndLandscape = function ss_is_tablet_and_landscape() {
      return ScreenLayout.getCurrentLayout('tabletAndLandscaped');
    };

    var _retriveParentPanelId = function ss_retriveParentPanelId(panelId) {
      var headerSelector = '#' + panelId + ' > gaia-header';
      var header = document.querySelector(headerSelector);
      return (header && header.dataset.href || '').replace('#', '');
    };

    var _shallCloseActivity = function ss_shallCloseActivity(panelId) {
      // If we're handling an activity and the 'back' button is hit, close the
      // activity if the panel id to be navigated equals the parent panel id.

      // This is for the root panel
      if (panelId === 'close') {
        return true;
      }

      if (!_currentNavigation) {
        return false;
      }

      // Get the parent panel id of the current panel.
      var parentPanelId = _retriveParentPanelId(_currentNavigation.panelId);

      // Close the activity if the current panel is the original target panel,
      // and the new panel is the parent panel of the current panel.
      return _currentNavigation.panelId === _activityHandler.targetPanelId &&
        panelId === parentPanelId;
    };

    var _transit = function ss_transit(oldPanel, newPanel, callback) {
      var promise = new Promise(function(resolve) {
        var wrappedCallback = function() {
          if (typeof callback === 'function') {
            callback();
          }
          resolve();
        };

        if (_isTabletAndLandscape()) {
          PageTransitions.twoColumn(oldPanel, newPanel, wrappedCallback);
        } else {
          PageTransitions.oneColumn(oldPanel, newPanel, wrappedCallback);
        }
      });
      return promise;
    };

    var _loadPanel = function ss_loadPanel(panelId, callback) {
      var panelElement = document.getElementById(panelId);
      if (panelElement.dataset.rendered) { // already initialized
        callback();
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
        LazyLoader.load([panelElement], callback);
      } else {
        LazyLoader.load([panelElement], callback);
      }
    };


    var _loadModulesForSubPanels = function ss_loadModules(panelId) {
      if (panelId === _rootPanelId) {
        return Promise.resolve();
      } else {
        if (!_loadModulesForSubPanelsPromise) {
          _loadModulesForSubPanelsPromise = new Promise(function(resolve) {
            require(['shared/async_storage'], resolve);
          });
        }
        return _loadModulesForSubPanelsPromise;
      }
    };

    var _onVisibilityChange = function ss_onVisibilityChange() {
      _handleVisibilityChange(!document.hidden);
    };

    /**
     * When the app becomes invisible, we should call to beforeHide and hide
     * functions of the current panel. When the app becomes visible, we should
     * call to beforeShow and show functions of the current panel with the
     * cached options.
     */
    var _handleVisibilityChange = function ss_onVisibilityChange(visible) {
      if (!_currentNavigation) {
        return;
      }

      var panel = _currentNavigation.panel;
      var element = _currentNavigation.panelElement;
      var options = _currentNavigation.options;

      if (!panel) {
        return;
      }

      if (visible) {
        panel.beforeShow(element, options);
        panel.show(element, options);
      } else {
        panel.beforeHide();
        panel.hide();
      }
    };

    var _navigate = function ss_navigate(panelId, options, callback) {
      // Early return if the panel to be navigated is the same as the
      // current one.
      if (_currentNavigation && _currentNavigation.panelId === panelId) {
        callback();
        return;
      }

      _loadPanel(panelId, function() {
        PanelCache.get(panelId, function(panel) {
          var newPanelElement = document.getElementById(panelId);
          var currentPanelId =
             _currentNavigation && _currentNavigation.panelId;
          var currentPanelElement =
            _currentNavigation && _currentNavigation.panelElement;
          var currentPanel = _currentNavigation && _currentNavigation.panel;

          // Keep these to make sure we can use when going back
          _cachedNavigation = _currentNavigation;
          _cachedNavigationOptions = options;

          // Prepare options and calls to the panel object's before
          // show function.
          options = options || {};

          // 0. start the chain
          _loadModulesForSubPanels(panelId)
          // 1. beforeHide previous panel
          .then(function() {
            // We don't deactivate the root panel.
            if (currentPanel && currentPanelId !== _rootPanelId) {
              return currentPanel.beforeHide();
            }
          })
          // 2. beforeShow next panel
          .then(function() {
            return panel.beforeShow(newPanelElement, options);
          })
          // 3. do the transition
          .then(function() {
            return _transit(currentPanelElement, newPanelElement);
          })
          // 4. hide previous panel
          .then(function() {
            // We don't deactivate the root panel.
            if (currentPanel && currentPanelId !== _rootPanelId) {
              return currentPanel.hide();
            }
          })
          // 5. show next panel
          .then(function() {
            return panel.show(newPanelElement, options);
          })
          // 6. keep information
          .then(function() {
            // Update the current navigation object
            _currentNavigation = {
              panelId: panelId,
              panelElement: newPanelElement,
              panel: panel,
              options: options
            };

            // XXX we need to remove this line in the future
            // to make sure we won't manipulate Settings
            // directly
            Settings._currentPanel = '#' + panelId;
            callback();
          });
        });
      });
    };

    return {
      reset: function ss_reset() {
        _rootPanelId = null;
        _currentNavigation = null;
        _cachedNavigation = null;
        _cachedNavigationOptions = {};
        _activityHandler = null;
        _navigating = false;
        _pendingNavigationRequest = null;
        window.removeEventListener('visibilitychange', _onVisibilityChange);
      },

      /**
       * Init SettingsService.
       *
       * @alias module:SettingsService#init
       * @param {Object} options
       * @param {String} options.rootPanelId
       *                 Panel with the specified id is assumed to be be kept on
       *                 on the screen always. We don't call to its hide and
       *                 beforeHide functions.
       * @param {Object} options.context
       *                 The launch context specifying the default panel and the
       *                 activity handler if the app is invoked by web
       *                 activities.
       * @param {String} options.context.initialPanelId
       * @param {ActivityHandler} options.context.activityHandler
       */
      init: function ss_init(options) {
        if (options) {
          _rootPanelId = options.rootPanelId || 'root';
          _activityHandler = options.context && options.context.activityHandler;
        }

        window.addEventListener('visibilitychange', _onVisibilityChange);
      },

      /**
       * Navigate to a panel with options. The navigation transition is
       * determined based on the current screen size and orientation.
       *
       * @alias module:SettingsService#navigate
       * @param {String} panelId
       * @param {Object} options
       * @param {Function} callback
       */
      navigate: function ss_navigate(panelId, options, callback) {
        // Check if the app is invoked by web activity and shall post result.
        if (_activityHandler && _shallCloseActivity(panelId)) {
          _activityHandler.postResult();
          return;
        }

        // Cache the navigation request if it is navigating.
        if (_navigating) {
          _pendingNavigationRequest = arguments;
          return;
        }

        // If we find out the link includes information about app's name,
        // it means that we are going to embed the app into our app.
        //
        // In this way, we have to navigate to `frame` panel and embed it.
        var appName = _getAppNameToLink(panelId);
        if (appName) {
          var appInfo = _getAppInfo(appName);

          if (!appInfo) {
            console.error('We only embed trust apps.');
            return;
          }

          panelId = 'frame';
          options = options || {};
          options.mozapp = appInfo.mozapp;
          options.src = appInfo.src;
        }

        _navigating = true;
        _navigate(panelId, options, (function() {
          _navigating = false;

          // Navigate to the pending navigation if any.
          if (_pendingNavigationRequest) {
            var args = _pendingNavigationRequest;
            _pendingNavigationRequest = null;
            this.navigate.apply(this, args);
          }

          if (callback) {
            callback();
          }
        }).bind(this));
      },

      /**
       * Go back to previous panel
       *
       * @alias module:SettingsService#back
       */
      back: function ss_back() {
        if (_activityHandler) {
          _activityHandler.postResult();
        } else if (_cachedNavigation) {
          this.navigate(_cachedNavigation.panelId, _cachedNavigationOptions);
          _cachedNavigation = null;
          _cachedNavigationOptions = {};
        }
      }
    };
});

/* global SpatialNavigationHelper */
require(['config/require'], function() {
  'use strict';

  define('boot', ['require','shared/settings_listener','modules/mvvm/observable','modules/mvvm/observable_array','modules/base/event_emitter','modules/settings_service','shared/screen_layout','settings'],function(require) {
    // The following are the scripts used by many other scripts. We load them
    // at once here.
    require('shared/settings_listener');
    require('modules/mvvm/observable');
    require('modules/mvvm/observable_array');
    require('modules/base/event_emitter');

    var SettingsService = require('modules/settings_service');
    var ScreenLayout = require('shared/screen_layout');
    var Settings = require('settings');

    function isInitialPanel(panel) {
      if (Settings.isTabletAndLandscape()) {
        return panel === Settings.initialPanelForTablet;
      } else {
        return panel === ('#' + window.LaunchContext.initialPanelId);
      }
    }

    window.addEventListener('panelready', function onPanelReady(e) {
      if (!isInitialPanel(e.detail.current)) {
        return;
      }

      var initialPanelHandler = window.LaunchContext.initialPanelHandler;
      if (initialPanelHandler) {
        initialPanelHandler.release();
        var pendingTargetPanel = initialPanelHandler.pendingTargetPanel;
        // XXX: In call item,
        // we need special logic for navigating to specific panels.
        switch (pendingTargetPanel) {
          case 'call':
            var mozMobileConnections = navigator.mozMobileConnections;
            // If DSDS phone, we have to let users choose simcard
            if (mozMobileConnections && mozMobileConnections.length > 1) {
              // If the device support dsds,
              // then navigate to 'call-iccs' panel
              pendingTargetPanel = 'call-iccs';
            }
            SettingsService.navigate(pendingTargetPanel);
            break;
          default:
            if (pendingTargetPanel) {
              SettingsService.navigate(pendingTargetPanel);
            }
            break;
        }
      }

      window.removeEventListener('panelready', onPanelReady);

      // XXX: Even the panel has been displayed but the content may still not
      //      stable yet. This is a estimated timing of visually complete. We
      //      should implement other mechanism waiting for all content ready.
      window.performance.mark('visuallyLoaded');

      // Activate the animation.
      document.body.dataset.ready = true;
    }, false);

    window.addEventListener('telephony-settings-loaded',
      function onTelephonySettingsLoaded() {
        window.removeEventListener('telephony-settings-loaded',
          onTelephonySettingsLoaded);

        // The loading of telephony settings is dependent on being idle,
        // once complete we are safe to declare the settings app as loaded
        window.performance.mark('fullyLoaded');
      });

    /**
     * In two column layout, the root panel should not be deactivated. We pass
     * the id of the root panel to SettingsService so that it won't deactivate
     * the root panel when in two column.
     * XXX: Currently we don't separate the navigation logic of one column and
     *      two column layout, so that the root panel will not be deactivated
     *      in one column layout.
     */
    SettingsService.init({
      rootPanelId: 'root',
      context: window.LaunchContext
    });

    var options = {
      SettingsService: SettingsService,
      ScreenLayout: ScreenLayout
    };
    Settings.init(options);

    // Tell audio channel manager that we want to adjust the notification
    // channel if the user press the volumeup/volumedown buttons in Settings.
    if (navigator.mozAudioChannelManager) {
      navigator.mozAudioChannelManager.volumeControlChannel = 'notification';
    }
  });

  require(['boot']);
});

define("main", function(){});

