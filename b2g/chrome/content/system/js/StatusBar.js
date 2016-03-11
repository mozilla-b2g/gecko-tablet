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
    this.clock = document.getElementById('clock');

    // Set the clock going
    this.updateClock();
    window.setInterval(this.updateClock.bind(this), 1000);

    return this;
  },

  /**
   * Update Clock.
   */
  updateClock: function() {
    var date = new Date(),
    hours = date.getHours() + '', // get hours as string
    minutes = date.getMinutes() + ''; // get minutes as string

    // pad with zero if needed
    if (hours.length < 2)
      hours = '0' + hours;
    if (minutes.length < 2)
      minutes = '0' + minutes;

    this.clock.textContent = hours + ':' + minutes;
  }

};
