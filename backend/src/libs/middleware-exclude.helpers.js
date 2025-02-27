/**
 *
 * @param {Function} middleware
 * @param  {...String} paths
 * @returns
 */
export const applyExcept =
  (middleware, ...paths) =>
  (req, res, next) => {
    const pathCheck = paths.some(path => path === req.path);
    pathCheck ? next() : middleware(req, res, next);
  };
