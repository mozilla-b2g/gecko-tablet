/**
 * Handling hardware buttons
 **/

var HwButtons = {

  powerTimer: null,

  handleEvent: function(evt) {
    console.debug('!!! evt', evt, evt.type, evt.key, "prevented?", evt.defaultPrevented);
    var key = evt.key.toLowerCase();

    switch (key) {
      case 'power': {
        switch (evt.type) {
          case 'keydown':
          case 'mozbrowserafterkeydown':
          case 'mozbrowserbeforekeydown':
            this.powerTimer = new Date().getTime();
            break;

          case 'keyup':
          case 'mozbrowserafterkeyup':
          case 'mozbrowserbeforekeyup':
            var delta = new Date().getTime() - this.powerTimer;
            console.debug('delta', delta);

            // Pressing Power for more than 1500ms should power off device
            if (delta > 1500) {
              console.debug('Long pressing power, shutting down!');
              setTimeout(() => {
                console.debug('Issuing shutdown sequence');
                PowerManager.powerOff();
              }, 500);
            } else {
              console.debug('Short pressing power, toggling screen');
              setTimeout(() => {
                console.debug('Issuing screen toggle');
                PowerManager.toggleScreen();
              });
            }

            this.powerTimer = null;
            break;
        }

        break;
      }

      case 'volumeup':
      case 'volumedown':
        if (evt.type === 'mozbrowserbeforekeydown' || evt.type === 'keydown') {
          window.dispatchEvent(new CustomEvent('_' + key));
        }
        break;

      default:
        console.debug('Unhandled key: ', key);
        break;
    }
  },

  start: function() {
    console.debug('Starting HwButtons ...');
    window.addEventListener('keyup', this);
    // window.addEventListener('mozbrowserbeforekeyup', this);
    window.addEventListener('mozbrowserafterkeyup', this);
    window.addEventListener('keydown', this);
    window.addEventListener('mozbrowserbeforekeydown', this);
    // window.addEventListener('mozbrowserafterkeydown', this);
    return this;
  },

  stop: function() {
    window.removeEventListener('keyup', this);
    window.removeEventListener('keydown', this);
  }

};
