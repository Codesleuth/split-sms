split-sms
============

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Bower version][bower-image]][bower-url]
[![NPM][npmico-image]][npmico-url]

An SMS message splitter with support for both GSM and Unicode written in JavaScript.
GSM support is limited to GSM 03.38 with the extension table (see the [Wikipedia article][GSM-03.38]); no support for natural language shift tables exists at this time.

*[View the demo...][demo-url]*

## Getting Started

1. Install via npm: `npm install split-sms`
2. Include in your project: `var splitter = require('split-sms');`
3. Start splitting messages! `var info = splitter.split('JavaScript is fun!');`

In the example above, `info` will be:

```json
{
  "characterSet": "GSM",
  "parts": [
    {
      "content": "JavaScript is fun!",
      "length": 18,
      "bytes": 18
    }
  ],
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
  "parts": [
    {
      "content": "Snowman shows off! ☃",
      "length": 20,
      "bytes": 40
    }
  ],
  "bytes": 40,
  "length": 20,
  "remainingInPart": 50
}
```

## In The Browser

You can use Bower to install split-sms components:

```sh
$ bower install split-sms --save
```

You can also use [RawGit][rawgit-url] to link directly to specific versions of the built scripts.
For example, the following URLs are for [version 0.1.7][v0.1.7-url]:

| Type       | URL                                                                       |
| ---------- | ------------------------------------------------------------------------- |
| Source     | https://github.com/Codesleuth/split-sms/blob/0.1.7/dist/split-sms.min.js  |
| RawGit dev | https://rawgit.com/Codesleuth/split-sms/0.1.7/dist/split-sms.min.js       |
| RawGit CDN | https://cdn.rawgit.com/Codesleuth/split-sms/0.1.7/dist/split-sms.min.js   |

Alternatively, pull out the scripts in the `dist/` directory and consume them.

To generate a browser consumable script yourself, clone the repo and run the following commands:

```sh
$ npm install
$ npm run build
```

This will generate the browser-compatible scripts in `dist/` and export `splitter` to the `global` so you can then consume it in the browser as follows:

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

See [the demo site][demo-url] for an example.

[npm-image]: http://img.shields.io/npm/v/split-sms.svg
[npm-url]: https://npmjs.org/package/split-sms

[bower-image]: https://badge.fury.io/bo/split-sms.svg
[bower-url]: https://badge.fury.io/bo/split-sms

[travis-image]: https://travis-ci.org/Codesleuth/split-sms.svg?branch=master
[travis-url]: https://travis-ci.org/Codesleuth/split-sms

[npmico-image]: https://nodei.co/npm/split-sms.png
[npmico-url]: https://nodei.co/npm/split-sms/

[GSM-03.38]: http://en.wikipedia.org/wiki/GSM_03.38#GSM_7_bit_default_alphabet_and_extension_table_of_3GPP_TS_23.038_.2F_GSM_03.38

[rawgit-url]: http://rawgit.com/

[demo-url]: http://www.codesleuth.co.uk/split-sms/

[v0.1.7-url]: https://github.com/Codesleuth/split-sms/tree/0.1.7