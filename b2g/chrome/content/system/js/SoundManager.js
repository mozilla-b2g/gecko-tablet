/**
 * Managing sound volume
 **/

var SoundManager = {

  settings: null,
  _channelsVolume: {
    'normal': 0,
    'content': 0,
    'notification': 0,
    'system': 0
  },

  delta: 0.025,

  getMaxVolume: function(level) {
    return Math.min(1, level);
  },

  getMinVolume: function(level) {
    return Math.max(0, level);
  },

  handleVolumeUp: function() {
    console.debug('XXX SET THE VOLUME <<<UP>>> §§§§ !!!');
    Object.keys(this._channelsVolume).forEach(channel => {
      var level = this.getMaxVolume(this._channelsVolume[channel] + this.delta);
      this.setVolume(channel, level);
    });
  },

  handleVolumeDown: function() {
    console.debug('XXX SET THE VOLUME <<<DOWN>>> §§§§ !!!');
    Object.keys(this._channelsVolume).forEach(channel => {
      var level = this.getMinVolume(this._channelsVolume[channel] - this.delta);
      this.setVolume(channel, level);
    });
  },

  setVolume: function(channel, level) {
    console.debug('XXX SET THE VOLUME TO ', level);
    this._channelsVolume[channel] = level;

    var e = new CustomEvent('_setvolume', {
      detail: { level: parseFloat(level) }
    });
    window.dispatchEvent(e);
  },

  start: function() {
    this.settings = navigator.mozSettings;
    window.addEventListener('_volumeup', this.handleVolumeUp.bind(this));
    window.addEventListener('_volumedown', this.handleVolumeDown.bind(this));

    if (navigator.mozAudioChannelManager) {
      // navigator.mozAudioChannelManager.volumeControlChannel = 'normal';
      navigator.mozAudioChannelManager.allowedAudioChannels.forEach(ch => {
        console.debug("ALLOWED AUDIO CHANNEL: name=", ch.name);
        ch.setVolume(0.95);
        // ch.setMuted(false);
        ch.onactivestatechanged = ch_evt => {
          console.debug("AudioChannel activestatechanged: ", ch_evt.name, ch.name);
        };
        ch.getVolume().then(v => {
          console.debug("name=", ch.name, "volume=", v);
          ch.getMuted().then(m => {
            console.debug("name=", ch.name, "muted=", m);
            ch.isActive().then(a => {
              console.debug("name=", ch.name, "active=", a);
            });
          });
        });
      });
    }

    return this;
  }

};
