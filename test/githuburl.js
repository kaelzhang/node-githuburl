'use strict';

var expect = require('chai').expect;
var gu = require('../');

var cases = [
{
  user: 'kaelzhang',
  repo: 'node-githuburl',
  ssh_user: 'git',
  host: 'github.com',
  
  // Actually the properties below are all getters,
  // which you need not to concern about the performance.
  http_href: 'http://github.com/kaelzhang/node-githuburl',
  https_href: 'https://github.com/kaelzhang/node-githuburl',
  http_clone_url: 'http://github.com/kaelzhang/node-githuburl.git',
  https_clone_url: 'https://github.com/kaelzhang/node-githuburl.git',
  ssh_clone_url: 'git@github.com:kaelzhang/node-githuburl.git',
  git_clone_url: 'git://github.com/kaelzhang/node-githuburl.git' 
},
{
  user: 'kaelzhang',
  repo: 'node-githuburl',
  ssh_user: 'vip',
  host: 'vip.github.com',
  _check_all_ssh: true,

  // Actually the properties below are all getters,
  // which you need not to concern about the performance.
  http_href: 'http://vip@vip.github.com/kaelzhang/node-githuburl',
  https_href: 'https://vip@vip.github.com/kaelzhang/node-githuburl',
  http_clone_url: 'http://vip@vip.github.com/kaelzhang/node-githuburl.git',
  https_clone_url: 'https://vip@vip.github.com/kaelzhang/node-githuburl.git',
  ssh_clone_url: 'vip@vip.github.com:kaelzhang/node-githuburl.git',
  git_clone_url: 'git://vip@vip.github.com/kaelzhang/node-githuburl.git' 
},
];


var GETTERS = Object.keys(gu.GETTERS);
var keys = [
  'user',
  'repo',
  'ssh_user',
  'host'
];

describe("githuburl", function(){
  cases.forEach(function (c) {
    GETTERS.forEach(function (key) {
      var url = c[key];
      it(url, function(){
        var parsed = gu(url);
        var check_all = c._check_all_ssh;

        keys.forEach(function (k) {
          if (!check_all && k === 'ssh_user' && key !== 'ssh_clone_url') {
            return;
          }

          expect(parsed[k]).to.equal(c[k]);
        });

        GETTERS.forEach(function (k) {
          expect(parsed[k]).to.equal(c[k]);
        });
      });
    })
  });
});
