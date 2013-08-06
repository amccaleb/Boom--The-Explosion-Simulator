/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * Grid.js
 *
 * Represents a generic grid tha can have several applications
 *
 * Used as the dance floor in Thumper
 *
 * Based on code from Shift Escape
 *
 */

var Grid = function(gridSize, beat) {

	var that = this;
	this.size = gridSize;
	this.cells = [];

	for (var gridY = 0; gridY < gridSize; gridY++) {
		for (var gridX = 0; gridX < gridSize; gridX++) {
			var pos = {
				x : gridX,
				y : gridY
			};

			// Put in the underlying grid for the board
			var newCell = new GridCell(pos, beat);
			that.cells.push(newCell);
		}
	}
};

/**
 * Interacts with shaders and provides a general update to grid cells to be rendered
 */
Grid.prototype.render = function(t) {
	var that = this;

	for (var gridY = 0; gridY < this.size; gridY++) {
		for (var gridX = 0; gridX < this.size; gridX++) {
			// Pass our uniform variables to the shaders
			that.cells[(gridY * that.size) + gridX].material.uniforms['uTime'].value = t;
			that.cells[(gridY * that.size) + gridX].material.uniforms['uBeatTime'].value = that.cells[(gridY * that.size) + gridX].beat.toBeatTime(t);
		}
	}
};
