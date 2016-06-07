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

  getMaxVolume: function(level) {
     return Math.min(15, level);
  },

  getMinVolume: function(level) {
     return Math.max(0, level);
  },

  handleVolumeUp: function() {
    console.debug('XXX SET THE VOLUME <<<UP>>> §§§§ !!!');
    Object.keys(this._channelsVolume).forEach(channel => {
      var level = this.getMaxVolume(this._channelsVolume[channel] + 1);
      this.setVolume(channel, level);
    });
  },

  handleVolumeDown: function() {
    console.debug('XXX SET THE VOLUME <<<DOWN>>> §§§§ !!!');
    Object.keys(this._channelsVolume).forEach(channel => {
      var level = this.getMinVolume(this._channelsVolume[channel] - 1);
      this.setVolume(channel, level);
    });
  },

  setVolume: function(channel, level) {
    var key = 'audio.volume.' + channel;
    this.settings.createLock().set({key: level});
    console.debug('XXX SET THE VOLUME TO ', level);
    this._channelsVolume[channel] = level;
  },

  handleSettingsChange: function(obj) {
    console.debug("Got settings change: ", JSON.stringify(obj));
    var channel = obj.settingName.split('.')[2];
    this._channelsVolume[channel] = obj.settingValue;
    console.debug("Applied settings change: ", JSON.stringify(this._channelsVolume));
  },

  start: function() {
    this.settings = navigator.mozSettings;
    window.addEventListener('_volumeup', this.handleVolumeUp.bind(this));
    window.addEventListener('_volumedown', this.handleVolumeDown.bind(this));

    if (navigator.mozAudioChannelManager) {
      navigator.mozAudioChannelManager.volumeControlChannel = 'normal';
      navigator.mozAudioChannelManager.allowedAudioChannels.forEach(ch => {
        console.debug("ALLOWED AUDIO CHANNEL: name=", ch.name);
        ch.setVolume(0.25);
        ch.setMuted(false);
        ch.onactivestatechanged = ch_evt => {
          console.debug("AudioChannel activestatechanged: ", ch_evt.name);
        };
        ch.getVolume().then(v => {
          console.debug("name=", name, "volume=", v);
          ch.getMuted().then(m => {
            console.debug("name=", name, "muted=", m);
            ch.isActive().then(a => {
              console.debug("name=", name, "active=", a);
            });
          });
        });
      });
    }

    Object.keys(this._channelsVolume).forEach(channel => {
      var key = 'audio.volume.' + channel;
      this.settings.addObserver(key, this.handleSettingsChange.bind(this));
      console.debug('Reading setting value:', key);
      this.settings.createLock().get(key).then(result => {
        console.debug('Read setting value: ', key, result[key]);
        this._channelsVolume[channel] = parseFloat(result[key]) || 0;
        console.debug('Updated setting value: ', JSON.stringify(this._channelsVolume));
      });
    });

    return this;
  }

};
