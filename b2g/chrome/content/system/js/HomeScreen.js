/**
 * HomeScreen.
 *
 * System UI element including search bar and home screen frame.
 */

var HomeScreen = {

  /**
   * Start the home screen.
   */
  start: function() {

    // Get DOM elements
    this.element = document.getElementById('home-screen');
    this.searchBar = document.getElementById('search-bar');
    
    // Register event listeners
    this.searchBar.addEventListener('click', this.handleSearchClick);

    return this;
  },

  /**
   * Handle click on search box.
   */
  handleSearchClick: function() {
    window.dispatchEvent(new CustomEvent('_openwindow'));
  }

};