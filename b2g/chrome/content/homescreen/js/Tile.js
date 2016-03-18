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
  return '<li class="tile"><span class="tile-name">' + this.siteObject.hostname
    + '</span></li>';
};

/**
 * Render Tile.
 */
Tile.prototype.render = function() {
  this.container.insertAdjacentHTML('beforeend', this.view());
};