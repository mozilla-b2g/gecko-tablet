/**
 * SystemToolbar.
 *
 * UI element containing the back button, home button and tabs button.
 */

var SystemToolbar = {

  /**
   * Start the system toolbar.
   */
  start: function() {

    // Get DOM elements
    this.element = document.getElementById('system-toolbar');
    this.backButton = document.getElementById('back-button');
    this.homeButton = document.getElementById('home-button');

    // Add event listeners
    this.homeButton.addEventListener('click', this.handleHomeClick);
    this.backButton.addEventListener('click', this.handleBackClick);

    return this;
  },

  /**
   * Handle click of home button.
   */
  handleHomeClick: function() {
    window.dispatchEvent(new CustomEvent('_home'));
  },

  /**
   * Handle click of back button.
   */
  handleBackClick: function() {
     window.dispatchEvent(new CustomEvent('_back'));
  }

};
