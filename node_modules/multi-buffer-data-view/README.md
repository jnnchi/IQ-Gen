# multi-buffer-data-view

**A wrapper around the native DataView which can handle multiple ArrayBuffers.**

[![version](https://img.shields.io/npm/v/multi-buffer-data-view.svg?style=flat-square)](https://www.npmjs.com/package/multi-buffer-data-view)

This module provides a wrapper around the native DataView. But instead of supporting only one ArrayBuffer as the backing memory the `MultiBufferDataView` exported by this module can operate across multiple ArrayBuffers.

## Usage

The `multi-buffer-data-view` module is available on [npm](https://www.npmjs.com/package/multi-buffer-data-view) and can be installed as usual.

```shell
npm install multi-buffer-data-view
```

It exports only one class called `MultiBufferDataView` which can be imported like this:

```js
import { MultiBufferDataView } from 'multi-buffer-data-view';
```

A `MultiBufferDataView` behaves almost like a native DataView with the notable exception that it can handle multiple ArrayBuffers.

```js
const anArrayBuffer = new ArrayBuffer(23);
const anotherArrayBuffer = new ArrayBuffer(41);

new MultiBufferDataView([anArrayBuffer, anotherArrayBuffer]);
```

The little example above will create a `MultiBufferDataView` which uses all 64 bytes that are available in the given ArrayBuffers. However it is also possible to limit the range of accessible bytes by providing a `byteOffset` or a `byteLength` as additional arguments.

```js
new MultiBufferDataView([anArrayBuffer, anotherArrayBuffer], 12, 24);
```

When creating a `MultiBufferDataView` with the parameters above it will only use the last 11 bytes of the first ArrayBuffer and the first 13 bytes of the second ArrayBuffer.
