'use strict'

/**
 * Creates a Rill middleware that only runs if the request has been unhandled so far.
 *
 * @param {function} middleware - The middleware to run.
 * @return {Function}
 * @api public
 */
module.exports = function unhandledSetup (middleware) {
  return function unhandledMiddleware (ctx, next) {
    return next().then(function () {
      var res = ctx.res
      if (
        res.body === undefined &&
        res.status === 404 &&
        !res.get('Location') &&
        !res.get('Content-Type')
      ) return middleware(ctx, next)
    })
  }
}
