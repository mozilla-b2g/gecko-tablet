
var KeyboardManager = {
  keyboard: null,
  start: function() {
    this.keyboard = document.getElementById('keyboard');
    navigator.mozInputMethod.mgmt.addEventListener('inputcontextfocus', (evt) => {
      this.show();
      evt.preventDefault();
    });

    navigator.mozInputMethod.mgmt.addEventListener('inputcontextblur', (evt) => {
      this.hide();
      evt.preventDefault();
    });
  },

  show: function() {
    this.keyboard.classList.add('active');
  },

  hide: function() {
    this.keyboard.classList.remove('active');
  }
};

