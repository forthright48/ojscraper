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

# Supported OJ

1. Uva Online Judge: 'uva'

Well, that's it for now.

# Todo

1. Add more oj
1. Implement `getUserInfo(options)`
