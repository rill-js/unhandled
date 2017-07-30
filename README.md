<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/unhandled
  <br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/unhandled">
    <img src="https://img.shields.io/npm/v/@rill/unhandled.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/unhandled">
    <img src="https://img.shields.io/npm/dm/@rill/unhandled.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

Utility to create Rill middleware that only runs on unhandled requests.

# Installation

```console
npm install @rill/unhandled
```

## Example

```js
const app = require('rill')()
const redirect = require('@rill/redirect')
const unhandled = require('@rill/unhandled')

// Redirect to 404 when page is unhandled.
app.get(unhandled(redirect('/404')))

// Example routes.
app.get('/home', render(homePage))
app.get('/404', render(notFoungPage))
```

## Details
The middleware provided to `unhandled` will only be invoked when the following conditions are met.

1. `res.body` is `undefined`.
2. `res.status` is `404`.
3. `res.get('Location')` is `undefined`.
4. `res.get('Content-Type')` is `undefined`.

---

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
