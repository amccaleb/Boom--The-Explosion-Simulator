/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Prototype2 - Thumper
 * 
 * Beat.js
 * 
 * Beat object
 * Helps convert between seconds and beats
 * 
 * Based on code provided by Nathan Whitehead at:
 * http://nathansuniversity.com/cmps179/presentations/demo/tex9.html
 * 
 */

var Beat = function(bpm) {
  this.bpm = bpm;
};

/**
 * Convert time to beatTime
 */
Beat.prototype.toBeatTime = function(t) {
  return t * this.bpm / 60.0;
};

/**
 * Convert time to beat value
 * Beat value is 0 to 1, hits 1 on the beat
 */
Beat.prototype.toBeat = function(t) {
  return 1.0 - Math.abs(Math.sin(this.toBeatTime(t) * 3.14159));
};

/**
 * Determine how synchronized time is with beat
 * Returns: 
 * -1 for early
 * 0 for on beat
 * 1 for late 
 */
Beat.prototype.onBeat = function(prevt, t) {
  
  // Compute the recent between beat values
  var lastBeat = this.toBeat(prevt);
  var curBeat = this.toBeat(t);
  
  // Check whether we're on beat
  if(curBeat > 0.9 && lastBeat > 0.9)
  { // We're close enough to the beat
  	return 0;
  }
  
  // Compute the difference between beats
  var dBeat = curBeat - lastBeat;
  
  // Now figure how close we are to the beat
  if(dBeat > 0)
  { // We're early
  	return -1;
  }
  else
  { // We're late
  	return 1;
  }
};