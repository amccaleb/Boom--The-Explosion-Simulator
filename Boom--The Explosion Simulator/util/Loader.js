/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 * 
 * Loader.js
 * 
 * Uses jQuery to load a file
 * 
 * Based on code provided by Nathan Whitehead at:
 * http://nathansuniversity.com/cmps179/presentations/demo/tex9.html
 * 
 */

/**
 * Synchronously load contents of file
 * Returns contents as string
 * NOTE:
 *   NOT FOR USE IN PRODUCTION
 *   Use asynchronous loading in production.
 */
var loadFile = function(url) {
  var result = null;
  $.ajax({
    url: url,
    async: false
  }).done(function(data) {
    result = data;
  });
  return result;
};