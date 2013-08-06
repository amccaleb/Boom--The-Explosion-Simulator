/**
 * Alexander McCaleb
 * CMPS 179 - Summer 2013
 * Boom -- The Explosion Simulator
 *
 * SDUtils.js
 *
 * Holds utility representations of
 * all components in the system dynamics
 * model created by this project.
 *
 */

// String representations of every component
var sdlevelNames = ["Sensitivity", "Stability", "Visual Appeal", "Perf", "Strength", "Velocity"];
var sdvalveNames = ["Impact", "Friction", "Heat", "Chem. Com.", "Storage Temp.", "Sunlight", "Discharge", "Color Variety", "Size", "Acceleration", "Pressure"];
var sdfactorNames = ["Room Temp", "Fluid Fric.", "Lube Fric.", "Storage Loc.", "Weather", "Conv. Rate", "Num. Chemicals", "Gravity", "Pouring Force", "Beaker Size"];

// Level enums
var sdlSensitivity = 0;
var sdlStability = 1;
var sdlVisualAppeal = 2;
var sdlPerf = 3;
var sdlStrength = 4;
var sdlVelocity = 5;

// Valve enums
var sdvImpact = 0;
var sdvFriction = 1;
var sdvHeat = 2;
var sdvChemCom = 3;
var sdvStorageTemp = 4;
var sdvSunlight = 5;
var sdvDischarge = 6;
var sdvColorVariety = 7;
var sdvSize = 8;
var sdvAccelaration = 9;
var sdvPressure = 10;

// Factor enums
var sdfRoomTemp = 0;
var sdfFluidFric = 1;
var sdfLubeFric = 2;
var sdfStorageLoc = 3;
var sdfWeather = 4;
var sdfConvRate = 5;
var sdfNumChemicals = 6;
var sdfGravity = 7;
var sdfPouringForce = 8;
var sdfBeakerSize = 9; 