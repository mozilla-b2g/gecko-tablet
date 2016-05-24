/**
 * New Tab.
 *
 * The contents of a new tab including top sites, bookmarks, history and the
 * nearby web of things.
 */

var NewTab = {
  /**
   * Start the new tab screen.
   */
  start: function() {
    this.tabContainer = document.getElementById('tabs');
    this.tabs = document.getElementsByClassName('tab');
    this.tabPanels = document.getElementsByClassName('tab-panel');
    this.topSitesList = document.getElementById('top-sites-list');

    this.tabContainer.addEventListener('click',
      this.handleTabClick.bind(this));

    // Start the Places database
    Places.start().then((function() {
      this.showTopSites();
    }).bind(this), function(error) {
      console.error('Failed to start Places database ' + error);
    });
  },

  /**
   * Handle a click on a tab.
   *
   * @param {Event} event The click event.
   */
  handleTabClick: function(event) {
    var target = event.target;
    if (target.tagName != 'LI') {
      return;
    }
    this.selectTab(target.dataset.panel);
  },
  
  /**
   * Select a tab on the new tab screen.
   *
   * @param {String} id ID of tab panel to select.
   */
  selectTab: function(id) {
    for (var i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].dataset.panel == id) {
        this.tabs[i].classList.add('active');
      } else {
        this.tabs[i].classList.remove('active');
      }
    }
    for (var i = 0; i < this.tabPanels.length; i++) {
      if (this.tabPanels[i].id == id) {
        this.tabPanels[i].classList.add('active');
      } else {
        this.tabPanels[i].classList.remove('active');
      }
    }
  },

  /*
   * Show top sites.
   */
  showTopSites: function() {
    this.topSitesList.innerHTML = '';
    var pinnedSiteIds = [];

    // First get pinned sites
    Places.getPinnedSites().then(function(pinnedSites) {
      pinnedSites.forEach(function(siteObject) {
        pinnedSiteIds.push(siteObject.id);
        var tile = new Tile(siteObject, '_self', true);
      }, this);
    });
    
    // Then get all top sites and de-dupe
    Places.getTopSites().then((function(topSites) {
      topSites.forEach(function(siteObject) {
        if (pinnedSiteIds.indexOf(siteObject.id) == -1) {
          var tile = new Tile(siteObject, '_self');
        }
      }, this);
    }).bind(this));
  }
};

/**
  * Start new tab screen on load.
  */
window.addEventListener('load', function newTab_onLoad() {
  window.removeEventListener('load', newTab_onLoad);
  NewTab.start();
});
