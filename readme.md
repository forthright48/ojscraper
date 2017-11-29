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

There is only method supported currently:

## `getProblemInfo()`

It accepts an object as parameter. The object must have the following two fields: `ojname` and `problemID`. Look below for possible values of `ojname` and their corresponding problemID formats.

# Values of `ojname`

1. Uva Online Judge: 'uva'
1. Codeforces: 'cf'

Well, that's it for now.

# Formats of `problemID`

`problemID` must match the following regex:

1. uva: `^\\d{3,5}$`
1. cf: `^\\d+[A-Z]`

# Todo

1. Add more oj
1. Implement `getUserInfo(options)`
