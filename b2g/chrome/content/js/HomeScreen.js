/**
 * HomeScreen.
 *
 * Shows your top sites.
 */

var HomeScreen = {

  /**
   * Start the system toolbar.
   */
  start: function() {

    // Get DOM elements
    this.element = document.getElementById('home-screen');
    this.searchBar = document.getElementById('search-bar');
    
    // Register event listeners
    this.searchBar.addEventListener('click', this.handleSearchClick);

    return this;
  },

  handleSearchClick: function() {
    window.dispatchEvent(new CustomEvent('_openwindow'));
  }

};