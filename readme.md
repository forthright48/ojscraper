# OJScraper

A javascript module to scrap online judge and retrieve informations.

Currently supports scraping of UVa, Codeforces, HDU and SPOJ.

# Install

`npm install --save ojscraper`

# Use

```
const ojscraper = require('ojscraper');

ojscraper.getProblemInfo({
  ojname: 'uva',
  problemID: '100'
})
.then(function(info){
  console.log(info);
  /**
   * {
      "platform": "uva",
      "problemID": "100",
      "title": "The 3n + 1 problem",
      "link": "http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=18&page=show_problem&problem=36"
      }
   */
})

ojscraper.getUserInfo({
  ojname: 'uva',
  username: 'forthright48'
})
.then(function(info){
  console.log(info);
  /**
   * {
      "platform": "uva",
      "username": "forthright48",
      "userID": "128671",
      "solveCount": 1464,
      "solveList": [100, 101 ... too many to view]
      }
   */
})
```
**Only promise is returned. Callback is not supported.**

# Methods

There are only two methods:

## `getProblemInfo()`

It accepts an object as parameter. The object must have the following two fields: `ojname` and `problemID`. Look below for possible values of `ojname` and their corresponding problemID formats.

## `getUserInfo()`

It accepts an object as parameter. The object must have the following two fields: `ojname` and `username`. A list of problem Ids which have been solved by the user is returned.

# Values of `ojname`

1. [CodeChef](https://www.codechef.com/): 'cc'
1. [Codeforces](http://codeforces.com/): 'cf'
1. [HDU](http://acm.hdu.edu.cn/): 'hdu'
1. [LOJ](http://www.lightoj.com/login_main.php): 'loj'
1. [POJ](http://poj.org/): 'poj'
1. [SPOJ](http://www.spoj.com/): 'spoj'
1. [Uva Online Judge](https://uva.onlinejudge.org/): 'uva'
1. [Vjudge](https://vjudge.net/): 'vjudge'
1. [CSAcademy](https://csacademy.com): 'csa'
1. [AtCoder](https://atcoder.jp/): 'atc'

Well, that's it for now.

# Formats of `problemID`

`problemID` must match the following regex:

1. cc: `^[A-Z0-9_]+$`
1. cf: `^\d+[A-Z]`
1. hdu: `\d{4}`
1. loj: `\d{4}`
1. poj: `\d{4}`
1. spoj: `^[A-Z0-9_]+$`
1. uva: `^\d{3,5}$`

# Special Cases

## LightOJ

Since the site is private, you need to provide a set of credential to access any info.

```
ojscraper.getProblemInfo({
  ojname: 'loj',
  problemID: '1000',
  credential: {
    userId: USERID_FOR_LOGIN,
    password: PASSWORD_FOR_LOGIN
  }
})
```

## VJudge

You can only get userinfo from vjudge, and that too for a particular sub oj.

```
ojscraper.getProblemInfo({
  ojname: 'loj',
  problemID: '1000',
  subojname: 'uva'
})

//Output: All problems from UVa that user solved in Vjudge
```

# TODO

1. Make it compatible for browsers
    1. CORS issue
