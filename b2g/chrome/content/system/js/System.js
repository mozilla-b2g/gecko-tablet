/**
 * Tablet System
 *
 * The main System object which starts everything else.
 */

var System = {

  /**
   * Start System.
   */
  start: function() {
    this.windowManager = WindowManager.start();
    this.statusBar = StatusBar.start();
    this.systemToolbar = SystemToolbar.start();
    this.homeScreen = HomeScreen.start();
    
    Places.start().then(function() {
      console.log('Started the Places database');
    }, function(error) {
      console.error('Failed to start Places database ' + error);
    });
  }
};

/**
  * Start System on page load.
  */
window.addEventListener('load', function system_onLoad() {
  window.removeEventListener('load', system_onLoad);
  System.start();
});
