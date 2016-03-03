/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const Ci = Components.interfaces;
const Cu = Components.utils;
const Cc = Components.classes;

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/PermissionSettings.jsm");
Cu.import("resource://gre/modules/PermissionsTable.jsm");

this.EXPORTED_SYMBOLS = ["PermissionsInstaller"];
const UNKNOWN_ACTION = Ci.nsIPermissionManager.UNKNOWN_ACTION;
const ALLOW_ACTION = Ci.nsIPermissionManager.ALLOW_ACTION;
const DENY_ACTION = Ci.nsIPermissionManager.DENY_ACTION;
const PROMPT_ACTION = Ci.nsIPermissionManager.PROMPT_ACTION;

// Permission access flags
const READONLY = "readonly";
const CREATEONLY = "createonly";
const READCREATE = "readcreate";
const READWRITE = "readwrite";

const PERM_TO_STRING = ["unknown", "allow", "deny", "prompt"];

function debug(aMsg) {
  //dump("-*-*- AppPermissions.jsm : " + aMsg + "\n");
}

 /**
  * Resolves to a json file.
  */
function loadJSON(url) {
  return new Promise((aResolve, aReject) => {
    debug("Loading resource " + url);

    let xhr =  Cc["@mozilla.org/xmlextras/xmlhttprequest;1"]
               .createInstance(Ci.nsIXMLHttpRequest);
    xhr.mozBackgroundRequest = true;
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        debug("Success loading " + url);
        aResolve(xhr.response);
      } else {
        aReject("Error loading " + url);
      }
    });
    xhr.addEventListener("error", () => {
      aReject("Error loading " + url);
    });
    xhr.send(null);
  });
}

this.PermissionsInstaller = {
  /**
   * Install permissisions or remove deprecated permissions upon re-install.
   * @param object aApp
   *        The just-installed app configuration.
   *        The properties used are manifestURL, origin and manifest.
   * @param boolean aIsReinstall
   *        Indicates the app was just re-installed
   * @returns bool indicating whether an error occured or not.
   **/
  installPermissions: function installPermissions(aApp, aIsReinstall) {
    try {
      let newManifest = aApp.manifest;
      if (!newManifest.permissions && !aIsReinstall) {
        return;
      }

      if (aIsReinstall) {
        // Compare the original permissions against the new permissions
        // Remove any deprecated Permissions

        if (newManifest.permissions) {
          // Expand permission names.
          let newPermNames = [];
          for (let permName in newManifest.permissions) {
            let expandedPermNames =
              expandPermissions(permName,
                                newManifest.permissions[permName].access);
            newPermNames = newPermNames.concat(expandedPermNames);
          }

          newPermNames.push("indexedDB");

          // Add the appcache related permissions.
          if (newManifest.appcache_path) {
            newPermNames = newPermNames.concat(["offline-app", "pin-app"]);
          }

          for (let idx in AllPossiblePermissions) {
            let permName = AllPossiblePermissions[idx];
            let index = newPermNames.indexOf(permName);
            if (index == -1) {
              // See if the permission was installed previously.
              let permValue =
                PermissionSettingsModule.getPermission(permName,
                                                       aApp.manifestURL,
                                                       aApp.origin,
                                                       false);
              if (permValue == "unknown" || permValue == "deny") {
                // All 'deny' permissions should be preserved
                continue;
              }
              // Remove the deprecated permission
              PermissionSettingsModule.removePermission(permName,
                                                        aApp.manifestURL,
                                                        aApp.origin,
                                                        false);
            }
          }
        }
      }

      // Check to see if the 'webapp' is app/privileged/certified.
      let appStatus = newManifest.type;

      this._setPermission("indexedDB", "allow", aApp);

      // Add the appcache related permissions. We allow it for all kinds of
      // apps.
      if (newManifest.appcache_path) {
        this._setPermission("offline-app", "allow", aApp);
        this._setPermission("pin-app", "allow", aApp);
      }

      for (let permName in newManifest.permissions) {
        if (!PermissionsTable[permName]) {
          Cu.reportError("PermissionsInstaller.jsm: '" + permName + "'" +
                         " is not a valid Webapps permission name.");
          dump("PermissionsInstaller.jsm: '" + permName + "'" +
               " is not a valid Webapps permission name. " + aApp.origin);
          continue;
        }

        let expandedPermNames =
          expandPermissions(permName,
                            newManifest.permissions[permName].access);
        for (let idx in expandedPermNames) {

          let isPromptPermission =
            PermissionsTable[permName][appStatus] === PROMPT_ACTION;

          // We silently upgrade the permission to whatever the permission
          // is for certified apps (ALLOW or PROMPT) only if the
          // following holds true:
          // * The app is preinstalled
          // * The permission that would be granted is PROMPT
          // * The app is privileged
          let permission =
            aApp.isPreinstalled && isPromptPermission &&
            appStatus === "privileged"
                ? PermissionsTable[permName]["certified"]
                : PermissionsTable[permName][appStatus];

          let permValue = PERM_TO_STRING[permission];
          if (isPromptPermission) {
            // If the permission is prompt, keep the current value. This will
            // work even on a system update, with the caveat that if a
            // ALLOW/DENY permission is changed to PROMPT then the system should
            // inform the user that he can now change a permission that he could
            // not change before.
            permValue =
              PermissionSettingsModule.getPermission(expandedPermNames[idx],
                                                     aApp.manifestURL,
                                                     aApp.origin,
                                                     false,
                                                     aApp.isCachedPackage);
            if (permValue === "unknown") {
              permValue = PERM_TO_STRING[permission];
            }
          }

          this._setPermission(expandedPermNames[idx], permValue, aApp);
        }
      }
    }
    catch (ex) {
      dump("Caught webapps install permissions error for " + aApp.origin +
        " : " + ex + "\n");
      Cu.reportError(ex);
      return false;
    }
    return true;
  },

  /**
   * Set a permission value.
   * @param string aPermName
   *        The permission name.
   * @param string aPermValue
   *        The permission value.
   * @param object aApp
   *        The just-installed app configuration.
   *        The properties used are manifestURL, origin, appId, isCachedPackage.
   * @returns void
   **/
  _setPermission: function setPermission(aPermName, aPermValue, aApp) {
    debug(`setPermission ${aPermName} -> ${aPermValue} for ${aApp.origin}`);
    PermissionSettingsModule.addPermission({
      type: aPermName,
      origin: aApp.origin,
      manifestURL: aApp.manifestURL,
      value: aPermValue,
      browserFlag: false,
      localId: aApp.localId,
      isCachedPackage: aApp.isCachedPackage,
    });
  },

  processApp: function(aApp) {
    return new Promise((aResolve, aReject) => {
      debug(`Processing ${aApp}`);
      loadJSON(`http://localhost/${aApp}/manifest.webapp`)
        .then(aManifest => {
          debug(`Got manifest for ${aApp}`);
          let data = {
            isCachedPackage: true,
            origin: "http://localhost/^inBrowser=1", // welcome to hack-land.
            manifest: aManifest
          }
          if (this.installPermissions(data, false)) {
            aResolve();
          } else {
            aReject();
          }
        })
        .catch(err => {
          aReject(err);
        })
    });
  },

  setAllPermissions(aRootURL) {
    debug("setAllPermissions");
    return loadJSON("file:///system/b2g/apps/webapps.json")
      .then(apps => {
        let promises = [];
        for (let app in apps) {
          // For each app, load the webapps.manifest file and process the
          // permissions.
          promises.push(this.processApp(app));
        }
        return Promise.all(promises);
      })
      .catch(err => {
        debug(`Error loading webapps.json : ${err}`);
      });
  }
};
