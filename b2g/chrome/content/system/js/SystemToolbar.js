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
    this.windowsButton = document.getElementById('windows-button');
    this.newWindowButton = document.getElementById('new-window-button');

    // Add event listeners
    this.homeButton.addEventListener('click', this.handleHomeClick.bind(this));
    this.backButton.addEventListener('click', this.handleBackClick.bind(this));
    this.windowsButton.addEventListener('click',
      this.handleWindowsClick.bind(this));
    this.newWindowButton.addEventListener('click',
      this.handleNewWindowClick.bind(this));
    return this;
  },

  /**
   * Handle click of home button.
   */
  handleHomeClick: function() {
    window.dispatchEvent(new CustomEvent('_homeclicked'));
  },

  /**
   * Handle click of back button.
   */
  handleBackClick: function() {
     window.dispatchEvent(new CustomEvent('_backclicked'));
  },

  /**
   * Handle click of windows button.
   */
  handleWindowsClick: function() {
    window.dispatchEvent(new CustomEvent('_windowsclicked'));
  },

  /**
   * Handle click of new window button.
   */
  handleNewWindowClick: function() {
    window.dispatchEvent(new CustomEvent('_openwindow'));
  }

};
