/**
 * An AngularJS value provider for the {@link ProjectSchema.Project} currently 
 * being viewed/edited.  The {@link ProjectSchema.Project} is kept here so it is
 * not lost when changing between controllers.
 * @member {ProjectSchema.Project} projectValue
 */
angular.module('sunruseStudio').value('projectValue', {
    tracks: []
});