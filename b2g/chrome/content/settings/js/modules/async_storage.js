/**
 * The promise version of async storage.
 */
define(['require','shared/async_storage'],function(require) {
  'use strict';

  var AsyncStorage = require('shared/async_storage');

  return {
    getItem: function as_getItem(key) {
      return new Promise(function(resolve, reject) {
        AsyncStorage.getItem(key, resolve);
      });
    },
    setItem: function as_setItem(key, value) {
      return new Promise(function(resolve, reject) {
        AsyncStorage.setItem(key, value, resolve);
      });
    }
  };
});
