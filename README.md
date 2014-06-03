# githuburl [![NPM version](https://badge.fury.io/js/githuburl.svg)](http://badge.fury.io/js/githuburl) [![Build Status](https://travis-ci.org/kaelzhang/node-githuburl.svg?branch=master)](https://travis-ci.org/kaelzhang/node-githuburl) [![Dependency Status](https://gemnasium.com/kaelzhang/node-githuburl.svg)](https://gemnasium.com/kaelzhang/node-githuburl)

Utitiles to parse a github repo url to

- an object of repo information. 
- transfer into different types of clone urls
- convert into a link to the project.

## Installation

```bash
$ npm install githuburl --save
```

## Usage

```js
var gu = require('githuburl');
var str = 'git@github.com:kaelzhang/node-githuburl.git'
// `str` could be either a scp-like syntax ssh url(as above), or http(s) url or something else.

gu(str);
```

Then we will get:

```js
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
}
```

#### Also prepared for complex cases

Which you don't need to worry about.

```js
var str = 'https://vip_account@abc.github.com/kaelzhang/node-githuburl.git';
var parsed = gu(str, true);

parsed.ssh_user;
// -> 'vip_account';

parsed.host;
// -> 'abc.github.com'
```

### gu(str)

- str `String` could be either a scp-like syntax ssh url(as above), or http(s) url or something else.

Returns `Object` the parsed object.