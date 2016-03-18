/**
 * Places Database.
 *
 * Stores top sites, history and bookmarks.
 */

var Places = {
  DB_NAME: 'places',
  DB_VERSION: 1,
  SITES_STORE: 'sites',
  db: null,

  /**
   * Start the Places Database.
   *
   * @return {Object} The Places object.
   */
  start: function() {
    return this.open();
  },

  /**
   * Open the database.
   *
   * @returns Promise which resolves upon successful database opening.
   */
  open: function() {
    return new Promise((function(resolve, reject) {
      var request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      request.onsuccess = (function(event) {
        this.db = event.target.result;
        resolve();
      }).bind(this);
      
      request.onerror = function() {
        reject(request.errorCode);
      };
  
      request.onupgradeneeded = this.upgrade.bind(this);
    }).bind(this));
  },

  /**
   * Upgrade database to new version.
   *
   * @param {Event} upgradeneeded event.
   */
  upgrade: function(event) {
    console.log('Upgrading Places database...');
    this.db = event.target.result;
    if(this.db.objectStoreNames.contains(this.SITES_STORE)) {
      console.log('Sites store already exists');
      return;
    }

    var objectStore = this.db.createObjectStore(this.SITES_STORE,
      { keyPath: 'hostname' });

    objectStore.createIndex('frecency', 'frecency', { unique: false });

    objectStore.transaction.oncomplete = function() {
      console.log('Sites store created successfully');
    };
  
    objectStore.transaction.onerror = function() {
      console.log('Error creating Sites store');
    };

  },

  /**
   * Add or update site in Sites data store.
   *
   * @param <int> url URL of site.
   */
  updateSite: function(url) {
    var transaction = this.db.transaction(this.SITES_STORE, 'readwrite');
    var objectStore = transaction.objectStore(this.SITES_STORE);
    var hostname = new URL(url).hostname;
    var readRequest = objectStore.get(hostname);
    readRequest.onsuccess = function() {
      // If site doesn't exist, create it
      if (!readRequest.result) {
        var writeRequest = objectStore.add({
          'hostname': hostname,
          'frecency': 1
        });
      // Otherwise update site frecency
      } else {
        var frecency = ++readRequest.result.frecency;
        var writeRequest = objectStore.put({
          'hostname': hostname,
          'frecency': frecency
        });
      }
      writeRequest.onsuccess = function() {
        console.log('Successfully updated site ' + hostname +
          ' with frecency ' + frecency);
      };
      writeRequest.onerror = function() {
        console.error('Error updating site ' + hostname);
      };
    };
    readRequest.onerror = function() {
      console.error('Error reading site ' + hostname);
    }
  },

  /**
   * Get top sites ordered by frecency.
   *
   * @returns Promise which resolves to a list of site objects.
   */
  getTopSites: function() {
    return new Promise((function(resolve, reject) {
      var transaction = this.db.transaction(this.SITES_STORE);
      var objectStore = transaction.objectStore(this.SITES_STORE);
      var index = objectStore.index('frecency');
      var topSites = [];
      index.openCursor(null, 'prev').onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          topSites.push(cursor.value);
          cursor.continue();
        } else {
          resolve(topSites);
        } 
      }
    }).bind(this));
  },
};