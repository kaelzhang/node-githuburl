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

gu.toHttp(str);
// -> http://github.com/kaelzhang/node-githuburl

gu.toHttps(str);
// -> https://github.com/kaelzhang/node-githuburl

gu.toSSH(str);
// -> git@github.com:kaelzhang/node-githuburl.git

gu.toGit(str);
// -> git://github.com/kaelzhang/node-githuburl.git

var parsed = gu.parse(url);

gu.formatHttp(parsed);
gu.formatHttps(parsed);
gu.formatSSH(parsed);
gu.formatGit(parsed);
```

### gu.parse(str)

### gu.toXXX(str)

### gu.formatXXX(obj)