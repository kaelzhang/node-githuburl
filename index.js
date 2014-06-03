'use strict';

module.exports = gu;
gu.GithubURL = GithubURL;

var su = require('ssh-url');
var node_url = require('url');

var REGEX_HAS_PROTOCOL = /^[a-z]+:\/\//i;
var REGEX_GIT_EXT = /\.git$/i


function gu (str) {
  return new gu.GithubURL(str);
}

function GithubURL (str) {
  gu._parse(str, this);
}

var proto = GithubURL.prototype;

var GETTERS = {
  http_href: function () {
    return 'http://' + gu._formatURL(this);
  },
  https_href: function () {
    return 'https://' + gu._formatURL(this);
  },
  https_clone_url: function () {
    return 'https://' + gu._formatURL(this) + '.git';
  },
  http_clone_url: function () {
    return 'http://' + gu._formatURL(this) + '.git';
  },
  ssh_clone_url: function () {
    return gu._formatURL(this, ':', true) + '.git';
  },
  git_clone_url: function () {
    return 'git://' + gu._formatURL(this) + '.git';
  }
};

gu.GETTERS = GETTERS;


Object.keys(GETTERS).forEach(function (key) {
  var value_key = '_' + key;

  // Could be listed out by `console.log` but not by for-in
  // Object.defineProperty(proto, value_key, {
  //   writalbe: true
  // });

  Object.defineProperty(proto, key, {
    enumerable: true,
    get: function () {
      return this[value_key] || (this[value_key] = GETTERS[key].call(this));
    }
  });
});


gu._parse = function (str, host) {
  var parsed;
  if (REGEX_HAS_PROTOCOL.test(str)) {
    parsed = node_url.parse(str);
    host.host = parsed.host;
    host.ssh_user = parsed.auth;

  } else {
    parsed = su.parse(str);
    host.host = parsed.hostname;
    host.ssh_user = parsed.user;
  }

  var info = gu._infoFromPathname(parsed.pathname);
  host.repo = info.repo;
  host.user = info.user;
};


gu._infoFromPathname = function (pathname) {
  var split = pathname.split('/').filter(Boolean);
  return {
    user: split[0],
    repo: (split[1] || '').replace(REGEX_GIT_EXT, '')
  };
};

gu._formatURL = function (parsed, splitter, is_ssh) {
  var ssh_user = parsed.ssh_user || 'git';
  
  if (!is_ssh && ssh_user === 'git') {
    ssh_user = null;
  }

  return (
      ssh_user 
        ? ssh_user + '@'
        : ''
    ) +
    parsed.host +
    (splitter || '/') + parsed.user + 
    '/' + parsed.repo;
}
