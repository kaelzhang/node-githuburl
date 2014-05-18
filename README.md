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

gu(str);
```

Then we will get:
```js
{
  user: 'kaelzhang',
  repo: 'node-githuburl',
  ssh_user: 'git',
  host: 'github.com'
}
```

If we pass the second parameter with `true`: `gu(str, true)`, we will get:

```js
{
  user: 'kaelzhang',
  repo: 'node-githuburl',
  ssh_user: 'git',
  host: 'github.com',
  https_href: 'https://github.com/kaelzhang/node-githuburl'
  https_clone_url: 'https://github.com/kaelzhang/node-githuburl.git',
  ssh_clone_url: 'git@github.com:kaelzhang/node-githuburl.git',
  git_clone_url: 'git://github.com/kaelzhang/node-githuburl.git' 
}
```

##### Also prepared for complex cases

Which you don't need to worry about.

```js
var str = vip_account@abc.github.com:kaelzhang/node-githuburl.git
var parsed = gu(str, true);

parsed.ssh_user;
// -> 'vip_account';

parsed.host;
// -> 'abc.github.com'
```

### gu(str, includeFormats)

- str `String`
- includeFormats `Boolean=false` whether the returnValue contains formatted urls.