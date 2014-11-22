/**
 * The JSON file format used by SUNRUSE.Studio to store a project.
 * @nameSpace ProjectSchema
 */
/**
 * A container object for all of the data held by a project.
 * @class Project 
 * @memberOf ProjectSchema
 */
/**
 * The tempo of the project, in beats per minute.  Should be greater than zero.
 * @member {Integer} tempo
 * @memberOf ProjectSchema.Project
 */
/**
 * @member {ProjectSchema.Track[]} tracks
 * @memberOf ProjectSchema.Project
 */ 
/** 
 * A set of {@link ProjectSchema.Loop}s in a {@link ProjectSchema.Project}, with 
 * a description of how they should be synthesized.
 * @class Track 
 * @memberOf ProjectSchema
 */
/**
 * The {@link ProjectSchema.Loop}s this {@link ProjectSchema.Track} contains; 
 * these should not overlap when repeats are taken into account.
 * @member {ProjectSchema.Loop[]} loops
 * @memberOf ProjectSchema.Track
 */
/**
 * A repeatable section of a {@link ProjectSchema.Track}.
 * @class Loop  
 * @memberOf ProjectSchema
 */
/**
 * The start time of the {@link ProjectSchema.Loop}, in beats, from the 
 * beginning of the {@link ProjectSchema.Project}.  Should be greater than or 
 * equal to zero.
 * @member {Integer} start
 * @memberOf ProjectSchema.Loop
 */
/**
 * The duration of one repeat of the {@link ProjectSchema.Loop}, in beats.
 * Should be greater than zero.
 * @member {Integer} duration
 * @memberOf ProjectSchema.Loop
 */
/**
 * The number of times to repeat the {@link ProjectSchema.Loop}.
 * Should be greater than zero.
 * @member {Integer} repeats
 * @memberOf ProjectSchema.Loop
 */
/**
 * The {@link ProjectSchema.Note}s this {@link ProjectSchema.Loop} contains.  
 * Repeated during playback the number of times specified by repeats.  Notes 
 * should not begin before the start of the {@link ProjectSchema.Loop}, not on 
 * or after the end; though they may extend beyond the end.
 * @member {ProjectSchema.Note[]} notes
 * @memberOf ProjectSchema.Loop
 */
/**
 * A single tone in a {@link ProjectSchema.Loop}
 * @class Note
 * @memberOf ProjectSchema
 */
/**
 * The time, in hemidemisemiquavers (1/64th beats) from the start of the loop
 * at which to start playing a tone.
 * Should be greater than or equal to zero and less than the duration of the
 * parent {@link ProjectSchema.Loop}.
 * @member {Integer} start
 * @memberOf ProjectSchema.Note
 */
/**
 * The time, in hemidemisemiquavers (1/64th beats) from the start of the loop
 * at which to stop playing a tone.
 * Should be greater than start.
 * @member {Integer} end
 * @memberOf ProjectSchema.Note
 */
/**
 * The note number in the Western scale at which to play, where zero is C0
 * (16.35Hz) and 107 is B8 (7902.13Hz).  Should be within these values, 
 * inclusive.  To calculate the frequency of a note, use 
 * 16.35 * (2^12)^frequency.
 * @member {Integer} frequency
 * @memberOf ProjectSchema.Note
 */
 