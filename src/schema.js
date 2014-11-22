/**
 * The JSON file format used by SUNRUSE.Studio to store a project.
 * @nameSpace SSP File Format 
 */
/**
 * A container object for all of the data held by a project.
 * @class Project 
 * @memberOf SSP File Format
 */
/**
 * The tempo of the project, in beats per minute.  Should be greater than zero.
 * @member {Integer} tempo
 * @memberOf Project
/**
 * @member {Track} tracks
 * @memberOf Project
 */ 
/** 
 * A set of {@link Loop}s in a {@link Project}, with a description of how they 
 * should be synthesized.
 * @class Track 
 * @memberOf SSP File Format
 */
/**
 * The {@link Loop}s this {@link Track} contains; these should not overlap when 
 * repeats are taken into account.
 * @member {Loop} loops
 * @memberOf Track
 */
/**
 * A repeatable section of a {@link Track}.
 * @class Loop  
 * @memberOf SSP File Format
 */
/**
 * The start time of the {@link Loop}, in beats, from the beginning of the {@link Project}.
 * Should be greater than or equal to zero.
 * @member {Integer} start
 * @memberOf Loop
 */
/**
 * The duration of one repeat of the {@link Loop}, in beats.
 * Should be greater than zero.
 * @member {Integer} duration
 * @memberOf Loop
 */
/**
 * The number of times to repeat the {@link Loop}.
 * Should be greater than zero.
 * @member {Integer} repeats
 * @memberOf Loop
 */
/**
 * The {@linkNote}s this {@link Loop} contains.  Repeated during playback the 
 * number of times specified by repeats.  Notes should not begin before the 
 * start of the {@link Loop}, not on or after the end; though they may extend 
 * beyond the end.
 * @member {Note} notes
 * @memberOf Loop
 */
/**
 * A single tone in a {@link Loop}
 * @class Note
 * @memberOf SSP File Format
 */
/**
 * The time, in hemidemisemiquavers (1/64th beats) from the start of the loop
 * at which to start playing a tone.
 * Should be greater than or equal to zero and less than the duration of the
 * parent {@link Loop}.
 * @member {Integer} start
 * @memberOf Note
 */
/**
 * The time, in hemidemisemiquavers (1/64th beats) from the start of the loop
 * at which to stop playing a tone.
 * Should be greater than start.
 * @member {Integer} end
 * @memberOf Note
 */
/**
 * The note number in the Western scale at which to play, where zero is C0
 * (16.35Hz) and 107 is B8 (7902.13Hz).  Should be within these values, 
 * inclusive.  To calculate the frequency of a note, use 
 * 16.35 * (2^12)^frequency.
 * @member {Integer} frequency
 * @memberOf Note
 */
 