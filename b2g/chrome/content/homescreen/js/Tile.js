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
 * Generate Tile View.
 */
Tile.prototype.view = function() {
  var style = '';
  if (this.siteObject.backgroundColor) {
    style += 'background-color: ' + this.siteObject.backgroundColor + ';';
    var rgb = this._hexToRgb(this.siteObject.backgroundColor);
    var textColor = this._blackOrWhite(rgb);
    style +='color: ' + textColor + ';';
  }
  if (this.siteObject.icons && this.siteObject.icons[0])
    style += 'background-image: url(' + this.siteObject.icons[0].src +  ');'
  var label = this.siteObject.name || this.siteObject.id;
  return '<li id="tile-' + this.siteObject.id +'" class="tile" style="'
    + style + '"><span class="tile-name">' + label + '</span></li>';
};

/**
 * Render Tile.
 */
Tile.prototype.render = function() {
  this.container.insertAdjacentHTML('beforeend', this.view());
  this.element = document.getElementById('tile-' + this.siteObject.id);
  this.element.addEventListener('click', this.open.bind(this));
};

/**
 * Launch site in a new window.
 */
Tile.prototype.open = function() {
  window.open(this.siteObject.startUrl);
  console.log('opening window at ' + this.siteObject.startUrl);
};

/**
 * Convert hex color value to rgb.
 *
 * @argument {String} hex color string e.g. #ff0000
 * @returns {Object} RGB object with separate r, g and b properties
 */
Tile.prototype._hexToRgb = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

/**
 * Choose highest contrast text colour.
 *
 * @param {Object} RGB object with r, g, b properties.
 * @return {String} black or white hex colour code.
 */
Tile.prototype._blackOrWhite = function(rgb) {
  if ((rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > 186) {
    return '#000'; 
  } else {
    return '#fff';
  }
};