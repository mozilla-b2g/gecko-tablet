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
    this.frame = document.getElementById('home-screen-frame');
    
    // Register event listeners
    this.searchBar.addEventListener('click', this.handleSearchClick);
    this.frame.addEventListener('mozbrowseropenwindow',
      this.handleOpenWindow.bind(this));

    return this;
  },

  /**
   * Handle click on search box.
   */
  handleSearchClick: function() {
    window.dispatchEvent(new CustomEvent('_openwindow'));
  },

  /**
   * Handle open window event.
   *
   * @param {Event} e mozbrowseropenwindow event.
   */
  handleOpenWindow: function(e) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('_openwindow', {
      'detail': e.detail
    }));
  }

};