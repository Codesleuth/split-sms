split-sms
============

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
[![NPM][npmico-image]][npmico-url]

An SMS message splitter with support for both GSM and Unicode written in JavaScript.
GSM support is limited to GSM 03.38 with the extension table (see the [Wikipedia article][GSM-03.38]); no support for natural language shift tables exists at this time.

## Getting Started

1. Install via npm: `npm install split-sms`
2. Include in your project: `var splitter = require('split-sms');`
3. Start splitting messages! `var info = splitter.split('JavaScript is fun!');`

In the example above, `info` will be:

```json
{
  "characterSet": "GSM",
  "parts": [{
    "part": "JavaScript is fun!",
    "length": 18
  }],
  "bytes": 18,
  "length": 18,
  "remainingInPart": 142
}
```

Unicode example:

```js
splitter.split('Snowman shows off! ☃');
```

```json
{
  "characterSet": "Unicode",
  "parts": [{
    "part": "Snowman shows off! ☃",
    "length": 20
  }],
  "bytes": 40,
  "length": 20,
  "remainingInPart": 50
}
```

## In The Browser

To generate a browser consumable script, clone the repo and run the following command:

```sh
$ npm run-script browserify
```

This will generate a file in the path `build/js/split-sms.js` and attach the splitter to `window` so you can then consume the module as follows:

```html
<html>
<head>
  <script src="split-sms.js"></script>
</head>
<body>
<script>
  var info = window.splitter.split('Hello!');
  document.write(JSON.stringify(info));
</script>
</body>
```

[npm-image]: http://img.shields.io/npm/v/split-sms.svg
[npm-url]: https://npmjs.org/package/split-sms

[travis-image]: https://travis-ci.org/Codesleuth/split-sms.svg?branch=master
[travis-url]: https://travis-ci.org/Codesleuth/split-sms

[npmico-image]: https://nodei.co/npm/split-sms.png
[npmico-url]: https://nodei.co/npm/split-sms/

[GSM-03.38]: http://en.wikipedia.org/wiki/GSM_03.38#GSM_7_bit_default_alphabet_and_extension_table_of_3GPP_TS_23.038_.2F_GSM_03.38