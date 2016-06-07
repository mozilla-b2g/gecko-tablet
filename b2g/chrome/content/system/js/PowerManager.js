/**
 * Managing power
 **/

var PowerManager = {

  _screenState: null,

  powerScreen: function(enabled) {
    if (!navigator.mozPower) {
      console.error("No mozPower interface!");
      return;
    }

    console.log('Turning on screen!');
    var power = navigator.mozPower;
    power.screenEnabled    = enabled ? true : false;
    power.keyLightEnabled  = enabled ? true : false;
    power.screenBrightness = enabled ? 1.0 : 0.0;

    this._screenState = enabled;
  },

  powerOff: function() {
    if (!navigator.mozPower) {
      console.error("No mozPower interface!");
      return;
    }

    console.log('Shutting down device!');
    var power = navigator.mozPower;
    power.powerOff();
  },

  start: function() {
    this.powerScreen(true);
    return this;
  },

  stop: function() {
    this.powerScreen(false);
  },

  toggleScreen: function() {
    console.debug('Toggling screen!');
    this.powerScreen(!this._screenState);
  }

};
