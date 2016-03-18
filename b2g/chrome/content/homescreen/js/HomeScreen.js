/**
 * HomeScreen.
 *
 * Displays your top sites.
 */

var HomeScreen = {

  /**
   * Start the home screen.
   */
  start: function() {
    this.topSites = document.getElementById('top-sites');
    // Start the Places database
    Places.start().then((function() {
      this.showTopSites();
    }).bind(this), function(error) {
      console.error('Failed to start Places database ' + error);
    });
  },

  /*
   * Show top sites.
   */
  showTopSites: function() {
    Places.getTopSites().then((function(topSites) {
      topSites.forEach(function(siteObject) {
        var tile = new Tile(siteObject);
      }, this);
    }).bind(this));
  }

};

/**
  * Start home screen on page load.
  */
window.addEventListener('load', function homeScreen_onLoad() {
  window.removeEventListener('load', homeScreen_onLoad);
  HomeScreen.start();
});
