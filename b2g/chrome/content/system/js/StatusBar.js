/**
 * Status Bar.
 *
 * UI element containing the clock, battery and network indicators.
 */

var StatusBar = {

  /**
   * Start the status bar.
   */
  start: function() {

    // Get DOM elements
    this.element = document.getElementById('status-bar');
    this.battery = document.getElementById('battery');
    this.clock = document.getElementById('clock');

    // Set the clock going
    this.updateClock(true);
    window.setInterval(this.updateClock.bind(this, false), 1000);

    window.addEventListener('_batterychange', this.updateBatteryStatus.bind(this));

    return this;
  },

  /**
   * Update Clock.
   */
  updateClock: function(initial) {
    var date = new Date(),
        hours = date.getHours() + '', // get hours as string
        minutes = date.getMinutes() + '', // get minutes as string
        seconds = date.getSeconds();

    // pad with zero if needed
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    // Only update display when it should change
    if (initial || seconds === 0) {
      this.clock.textContent = hours + ':' + minutes;
    }
  },

  updateBatteryStatus: function(evt) {
    console.debug('Received _batterychange event:', evt, JSON.stringify(evt.detail));

    this.battery.setAttribute('data-charging-status', evt.detail.charging);

    let lvl = Math.floor(evt.detail.level * 10)
    this.battery.setAttribute('data-charging-level', lvl);
  }

};
