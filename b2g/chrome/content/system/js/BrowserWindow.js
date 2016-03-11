/**
 * Browser Window.
 */

/**
 * Browser Window Constructor.
 */
var BrowserWindow = function(id) {
  if (id === undefined) {
    return null;
  }
  this.container = document.getElementById('windows');
  this.id = id;
  this.currentURL = '';
  this.currentTitle = '';
  this.render();
  return this;
};

/** 
 * Window View.
 */
BrowserWindow.prototype.view = function() {
  return '<div id="window' + this.id + '" class="browser-window">' +
    '<menu type="toolbar" class="browser-chrome">' +
    '<form id="url-bar-form-' + this.id + '"" novalidate>' +
    '<input type="url" id="url-bar-' + this.id + '" type="text"></input>' +
    '</form>' +
    '<button class="menu-button">' +
    '<button id="close-button-' + this.id + '" class="close-button">' +
    '</menu>' +
    '<iframe id="window-frame-' + this.id + '" mozbrowser remote></iframe>' +
    '<div id="window-scrim-' + this.id + '" class="window-scrim"></div>' +
    '</div>';
};

/**
 * Render the window.
 */
BrowserWindow.prototype.render = function() {
  this.container.insertAdjacentHTML('beforeend', this.view());

  // Get DOM elements
  this.element = document.getElementById('window' + this.id);
  this.urlBar = document.getElementById('url-bar-' + this.id);
  this.urlBarForm = document.getElementById('url-bar-form-' + this.id);
  this.frame = document.getElementById('window-frame-' + this.id);
  this.closeButton = document.getElementById('close-button-' + this.id);
  this.scrim = document.getElementById('window-scrim-' + this.id);

  // Add event listeners
 this.frame.addEventListener('mozbrowserlocationchange',
    this.handleLocationChange.bind(this));
 this.urlBar.addEventListener('focus', this.handleUrlBarFocus.bind(this));
 this.urlBar.addEventListener('blur', this.handleUrlBarBlur.bind(this));
 this.urlBarForm.addEventListener('submit',
    this.handleUrlSubmit.bind(this));
 this.closeButton.addEventListener('click', this.close.bind(this));
 this.scrim.addEventListener('click', this.handleScrimClick.bind(this));
};

/**
 * Show the Window.
 */
BrowserWindow.prototype.show = function() {
  this.element.classList.remove('hidden');
};

/**
 * Hide the window.
 */
BrowserWindow.prototype.hide = function() {
  this.element.classList.add('hidden');
};

/**
 * Close the window.
 */
BrowserWindow.prototype.close = function() {
  var e = new CustomEvent('_closewindow', {
    detail: {
      id: this.id
    }
  });
  window.dispatchEvent(e);
};

/**
 * Delete the element from the DOM.
 */
BrowserWindow.prototype.destroy = function() {
  this.container.removeChild(this.element);
};

/**
 * Handle location change.
 *
 * @param {Event} e mozbrowserlocationchange event.
 */
BrowserWindow.prototype.handleLocationChange = function(e) {
  this.currentURL = e.detail;
  if (e.detail == 'about:blank') {
     this.urlBar.focus();
  }
  
  var hostname = new URL(e.detail).hostname;
  this.currentTitle = hostname;
  this.urlBar.value = hostname;
};

/**
 *  Handle focus of URL bar.
 *
 *  @param {Event} e focus event.
 */
BrowserWindow.prototype.handleUrlBarFocus = function (e) {
  this.urlBar.value = this.currentURL;
  this.urlBar.select();
};

/**
 *  Handle URL bar losing focus.
 *
 *  @param {Event} e blur event.
 */
BrowserWindow.prototype.handleUrlBarBlur = function (e) {
  this.urlBar.value = this.currentTitle;
};

/**
 * Handle URL submission.
 *
 * If URL is invald, prepend "http://".
 *
 * @param {Event} e submit event.
 */
BrowserWindow.prototype.handleUrlSubmit = function (e) {
  e.preventDefault();
  if (this.urlBar.validity.valid) {
    this.frame.src = this.urlBar.value;
  } else {
    this.frame.src = 'http://' + this.urlBar.value;
  }
  this.urlBar.blur();
};

/**
 * Navigate back in session history.
 */
BrowserWindow.prototype.goBack = function() {
  this.frame.goBack();
};

/**
 * Handle click on window scrim.
 */
BrowserWindow.prototype.handleScrimClick = function() {
  var e = new CustomEvent('_openwindow', {
    detail: {
      id: this.id
    }
  });
  window.dispatchEvent(e);
};