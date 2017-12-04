# OJScraper

A javascript module to scrap online judge and retrieve informations.

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
  //Prints title, pid and link in json format
})
```
Only promise is returned. Callback is not supported.

# Methods

There is only one method supported currently:

## `getProblemInfo()`

It accepts an object as parameter. The object must have the following two fields: `ojname` and `problemID`. Look below for possible values of `ojname` and their corresponding problemID formats.

# Values of `ojname`

1. Codeforces: 'cf'
1. SPOJ: 'spoj'
1. Uva Online Judge: 'uva'

Well, that's it for now.

# Formats of `problemID`

`problemID` must match the following regex:

1. cf: `^\\d+[A-Z]`
1. spoj: `^[A-Z0-9_]+$`
1. uva: `^\\d{3,5}$`

# Todo

1. Add more oj
1. Implement `getUserInfo(options)`
