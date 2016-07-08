/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");

function debug(msg) {
  //dump("B2GAboutRedirector: " + msg + "\n");
}

var modules = {
  certerror: {
    uri: "chrome://b2g/content/aboutCertError.xhtml",
    privileged: false,
    hide: true
  },
  home: {
    uri: "chrome://b2g/content/home/home.html",
    privileged: true,
    hide: true,
    forceLoadInChild: true,
    indexedDB: true
  },
  neterror: {
    uri: "chrome://b2g/content/system/net_error.html",
    privileged: false,
    hide: true
  },
  newtab: {
    uri: "chrome://b2g/content/newtab/newtab.html",
    privileged: true,
    hide: true,
    forceLoadInChild: true,
    indexedDB: true
  },
  settings: {
    uri: "chrome://b2g/content/settings/index.html",
    privileged: true,
    hide: true,
    forceLoadInChild: true,
    indexedDB: true
  }
};

function B2GAboutRedirector() {}
B2GAboutRedirector.prototype = {
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),
  classID: Components.ID("{920400b1-cf8f-4760-a9c4-441417b15134}"),

  _getModuleInfo: function (aURI) {
    let moduleName = aURI.path.replace(/[?#].*/, "").toLowerCase();
    return modules[moduleName];
  },

  // nsIAboutModule
  getURIFlags: function(aURI) {
    let moduleInfo = this._getModuleInfo(aURI);
    let flags = Ci.nsIAboutModule.ALLOW_SCRIPT;

    if (moduleInfo.hide) {
      flags |= Ci.nsIAboutModule.HIDE_FROM_ABOUTABOUT;
    }

    if (moduleInfo.safeForUntrusted) {
      flags |= Ci.nsIAboutModule.URI_SAFE_FOR_UNTRUSTED_CONTENT;
    }

    if (moduleInfo.canLoadInChild) {
      flags |= Ci.nsIAboutModule.URI_CAN_LOAD_IN_CHILD;
    }

    if (moduleInfo.forceLoadInChild) {
      flags |= Ci.nsIAboutModule.URI_MUST_LOAD_IN_CHILD;
    }

    if (moduleInfo.indexedDB) {
      flags |= Ci.nsIAboutModule.ENABLE_INDEXED_DB;
    }

    return flags;
  },

  newChannel: function(aURI, aLoadInfo) {
    let moduleInfo = this._getModuleInfo(aURI);

    var ios = Cc["@mozilla.org/network/io-service;1"].
              getService(Ci.nsIIOService);

    var newURI = ios.newURI(moduleInfo.uri, null, null);

    var channel = ios.newChannelFromURIWithLoadInfo(newURI, aLoadInfo);

    if (!moduleInfo.privileged) {
      // Setting the owner to null means that we'll go through the normal
      // path in GetChannelPrincipal and create a codebase principal based
      // on the channel's originalURI
      channel.owner = null;
    }

    channel.originalURI = aURI;

    return channel;
  }
};

this.NSGetFactory = XPCOMUtils.generateNSGetFactory([B2GAboutRedirector]);
