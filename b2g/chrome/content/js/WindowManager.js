/**
 * Window Manager.
 *
 * Manages windows.
 */

var WindowManager = {

  /**
   * The collection of App Windows.
   */
  windows: [],

  /**
   * The number of windows opened in this session.
   */
  windowCount: 0,

  /**
   * The ID of the currently displayed window.
   */
  currentWindow: null,

  /**
   * Start the Window Manager.
   *
   * @return {Object} The WindowManager object.
   */
  start: function() {
    this.element = document.getElementById('windows');
    this.homeScreen = document.getElementById('home-screen');
    window.addEventListener('_openwindow',
      this.handleOpenWindow.bind(this));
    window.addEventListener('_closewindow',
      this.handleCloseWindow.bind(this));
    window.addEventListener('_home',
      this.handleHome.bind(this));
    window.addEventListener('_back',
      this.handleBack.bind(this));
    return this;
  },

  /**
   * Handle _openwindow event.
   *
   * @param {Event} e _openwindow event.
   */
  handleOpenWindow: function(e) {
    if (e.detail && e.detail.id != null) {
      this.switchWindow(e.detail.id);
    } else {
      this.createWindow();
    }
    this.showWindows();
  },
  
  /**
   * Handle _closewindow event.
   *
   * @param {Event} e _closewindow event.
   */
  handleCloseWindow: function(e) {
    if (!e.detail || e.detail.id === undefined) {
      return;
    }
    this.windows[e.detail.id].destroy();
    delete this.windows[e.detail.id];
    this.currentWindow = null;
    var windowIds = Object.keys(this.windows);
    if (windowIds.length > 0) {
      this.switchWindow(windowIds[windowIds.length-1]);
    }
  },

  /**
   * Handle _home event.
   *
   */
  handleHome: function() {
    this.hideWindows();
  },

  /**
   * Handle _back event.
   */
  handleBack: function() {
    if (this.windows[this.currentWindow]) {
      this.windows[this.currentWindow].goBack();
    }
  },

  /**
   * Create a new window.
   */
  createWindow: function() {
    var id = this.windowCount;

    var newWindow = new BrowserWindow(id);
    this.windows[id] = newWindow;

    this.switchWindow(id);
    this.windowCount++;
  },

  /**
   * Switch to a window.
   *
   * @param {Integer} id The ID of the BrowserWindow to switch to.
   */
  switchWindow: function(id) {
    if (this.currentWindow != null) {
      this.windows[this.currentWindow].hide();
    }
    this.currentWindow = id;
    this.windows[id].show();
  },
  
  /**
   * Show windows.
   */
  showWindows: function() {
    this.element.classList.remove('hidden');
    this.homeScreen.classList.add('hidden');
  },

  /**
   * Hide windows.
   */
  hideWindows: function() {
    this.element.classList.add('hidden');
    this.homeScreen.classList.remove('hidden');
  }
};
