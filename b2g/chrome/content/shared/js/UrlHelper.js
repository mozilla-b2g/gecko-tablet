'use strict';

var UrlHelper = {

  /**
   * Get the scheme from a URL.
   *
   * @param {String} input The string to test.
   * @returns {String} scheme + ':' (ex. http:), scheme + '://' (ex. http://)
   *  or null
   */
  getScheme: function(input) {
    var rscheme = /^(?:[a-z\u00a1-\uffff0-9-+]+)(?::(?:\/\/)?)/i;
    return (rscheme.exec(input) || [])[0];
  },

  /**
   * Does this string include a URL scheme?
   *
   * @param {String} input The string to test.
   * @returns {Boolean} true for yes, false for no.
   */
  hasScheme: function(input) {
    return !!this.getScheme(input);
  },

  /**
   * Is this string a URL?
   *
   * @param {String} input The string to test.
   * @returns {Boolean} true for yes, false for no.
   */
  isURL: function urlHelper_isURL(input) {
    return !UrlHelper.isNotURL(input);
  },

  /**
   * Is this string not a URL?
   *
   * @param {String} input The string to test.
   * @returns {Boolean} true for yes, false for no.
   */
  isNotURL: function urlHelper_isNotURL(input) {
    // for cases, ?abc and "a? b" which should be a search query
    var case1Reg = /^(\?)|(\?.+\s)/;
    // for the case of a pure string
    var case2Reg = /[\?\.\s\:]/;
    // for the case of data:uri, about:uri and view-source:uri
    var case3Reg = /^(data|view-source|about)\:/;

    var str = input.trim();
    if (case1Reg.test(str) || !case2Reg.test(str) ||
        this.getScheme(str) === str) {
      return true;
    }
    if (case3Reg.test(str)) {
      return false;
    }
    // require basic scheme before form validation
    if (!this.hasScheme(str)) {
      str = 'http://' + str;
    }
    if (!this.urlValidate) {
      this.urlValidate = document.createElement('input');
      this.urlValidate.setAttribute('type', 'url');
    }
    this.urlValidate.setAttribute('value', str);
    return !this.urlValidate.validity.valid;
  }
};
