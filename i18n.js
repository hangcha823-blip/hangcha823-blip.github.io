(function () {
  var params = new URLSearchParams(window.location.search);
  var lang = params.get('lang') || document.documentElement.lang || 'en';
  document.documentElement.lang = lang;

  var dictionaries = window.TRANSLATIONS || {};
  var strings = dictionaries[lang] || {};

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (strings[key]) {
      el.textContent = strings[key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-html');
    if (strings[key]) {
      el.innerHTML = strings[key];
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    var map = el.getAttribute('data-i18n-attr');
    if (!map) {
      return;
    }
    map.split(',').forEach(function (pair) {
      var parts = pair.split(':');
      if (parts.length !== 2) {
        return;
      }
      var attr = parts[0].trim();
      var key = parts[1].trim();
      if (strings[key]) {
        el.setAttribute(attr, strings[key]);
      }
    });
  });
})();
