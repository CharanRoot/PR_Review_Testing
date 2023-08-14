/**
 * Creates a unique temporary directory.
 * @param {string} prefix
 * @param {string | { encoding?: string; }} [options]
 * @param {(
 *   err?: Error,
 *   directory?: string
 *   ) => any} callback
 * @returns {void}
 */
function mkdtemp(prefix, options, callback) {
  callback = makeCallback(typeof options === 'function' ? options : callback);
  options = getOptions(options);

  validateString(prefix, 'prefix');
  nullCheck(prefix, 'prefix');
  prefix = getValidatedPath(prefix, 'prefix');
  warnOnNonPortableTemplate(prefix);
  const req = new FSReqCallback();
  req.oncomplete = callback;
  binding.mkdtemp(`${prefix}XXXXXX`, options.encoding, req);
}
