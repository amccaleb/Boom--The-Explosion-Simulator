/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * SDModel.js
 *
 * Represents a System Dynamics model as described by Jay Forrester
 * Note: This is a more general take on a Stock/Flow diagram
 *
 */

/**
 * Default Constructor
 * Takes in a name
 * Creates lists of all levels, valves, and factors
 */
var SDModel = function(name) {
	this.name = name;
	this.levels = [];
	this.valves = [];
	this.factors = [];
};

/**
 * Updates all components of the simulation
 */
SDModel.prototype.update = function() {
	var that = this;

	// Update all valves with the according factor influences
	_.each(this.valves, function(element, index) {
		element.update();
	});

	// Update all levels with the according valve values
	_.each(this.levels, function(element, index) {
		element.update();
	});
}; 