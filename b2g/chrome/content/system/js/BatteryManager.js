/**
 * Managing battery status
 **/

var BatteryManager = {

  _bm: null,

  handleChargingChange: function(e) {
    console.debug('handleChargingChange', e, this._bm.charging);
    this.sendBatteryEvent();
  },

  handleChargingTimeChange: function(e) {
    console.debug('handleChargingTimeChange', e, this._bm.chargingtime);
    // this.sendBatteryEvent();
  },

  handleDischargingTimeChange: function(e) {
    console.debug('handleDischargingTimeChange', e, this._bm.dischargingtime);
    // this.sendBatteryEvent();
  },

  handleLevelChange: function(e) {
    console.debug('handleLevelChange', e, this._bm.level);
    this.sendBatteryEvent();
  },

  sendBatteryEvent: function() {
    var batteryEvent = new CustomEvent('_batterychange',
                                       { detail: { charging: this._bm.charging,
                                                   level: this._bm.level
                                                 }
                                       });
    window.dispatchEvent(batteryEvent);
  },

  start: function() {
    if (!('getBattery' in navigator)) {
      console.error('No getBattery() available');
      return null;
    }

    navigator.getBattery().then(bm => {
      console.debug('Received a batteryManager!');
      this._bm = bm;
      ['Charging', 'ChargingTime', 'DischargingTime', 'Level'].forEach(name => {
        let key = name.toLowerCase() + 'change';
        let hdl = 'handle' + name + 'Change';
        console.debug('Adding event handler', key, 'to', hdl);
        this._bm.addEventListener(key, this[hdl].bind(this));
      });
      setTimeout(() => {
        this.sendBatteryEvent();
      });
      return this;
    }).catch(er => {
      console.error('getBattery() returned error: ', er);
      return null;
    });
  },

  stop: function() {

  }

};
