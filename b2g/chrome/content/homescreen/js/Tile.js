/**
 * Tile.
 *
 * A tile represents a top site with an icon, site name and background colour.
 */

/**
 * Tile Constructor.
 */
var Tile = function(siteObject) {
  this.container = document.getElementById('top-sites');
  this.siteObject = siteObject;
  this.render();
  return this;
};


/** 
 * Tile View.
 */
Tile.prototype.view = function() {
  return '<li id="tile-' + this.siteObject.hostname +'" class="tile"><span class="tile-name">' +
    this.siteObject.hostname
    + '</span></li>';
};

/**
 * Render Tile.
 */
Tile.prototype.render = function() {
  this.container.insertAdjacentHTML('beforeend', this.view());
  this.element = document.getElementById('tile-' + this.siteObject.hostname);
  this.element.addEventListener('click', this.open.bind(this));
};

Tile.prototype.open = function() {
  window.open(this.siteObject.startUrl);
};