/**
 * HomeScreen.
 *
 * Displays your top sites.
 */

var HomeScreen = {
  /**
   * Broadcast channel used to communicate with the system.
   */
  broadcastChannel: null,

  /**
   * Start the home screen.
   */
  start: function() {
    this.topSites = document.getElementById('top-sites-list');
    // Start the Places database
    Places.start().then((function() {
      this.showTopSites();
    }).bind(this), function(error) {
      console.error('Failed to start Places database ' + error);
    });
    this.broadcastChannel = new BroadcastChannel('system');
    this.broadcastChannel.onmessage = this.handleMessage.bind(this);
  },

  /*
   * Show top sites.
   */
  showTopSites: function() {
    this.topSites.innerHTML = '';
    var pinnedSiteIds = [];

    // First get pinned sites
    Places.getPinnedSites().then(function(pinnedSites) {
      pinnedSites.forEach(function(siteObject) {
        pinnedSiteIds.push(siteObject.id);
        var tile = new Tile(siteObject, '_blank', true);
      }, this);
    });
    
    // Then get all top sites and de-dupe
    Places.getTopSites().then((function(topSites) {
      topSites.forEach(function(siteObject) {
        if (pinnedSiteIds.indexOf(siteObject.id) == -1) {
          var tile = new Tile(siteObject, '_blank');
        }
      }, this);
    }).bind(this));
  },

  /**
   * Handle a message received via postMessage().
   */
  handleMessage: function(event) {
    this.showTopSites();
    console.log('Received message saying ' + event.data);
  },

};

/**
  * Start home screen on page load.
  */
window.addEventListener('load', function homeScreen_onLoad() {
  window.removeEventListener('load', homeScreen_onLoad);
  HomeScreen.start();
});
