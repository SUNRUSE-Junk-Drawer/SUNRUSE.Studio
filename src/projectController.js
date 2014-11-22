angular.module('sunruseStudio')
.controller('projectController', function($scope, projectValue, dialog, history){
    
    /**
     * The controller used when overviewing {@link projectValue} as a whole.
     * @class projectController 
    */
    
    /**
     * A reference to {@link projectValue}, for data binding.
     * @member {ProjectSchema.Project} project
     * @memberOf projectController
     */
    $scope.projectValue = projectValue;
    
    /**
     * A reference to {@link dialog}, for data binding.
     * @member {dialog} dialog
     * @memberOf projectController
     */    
    $scope.dialog = dialog;
    
    /**
     * A reference to {@link history}, for data binding.
     * @member {history} history
     * @memberOf projectController
     */    
    $scope.history = history;    
    
    /**
     * Adds a new, empty {@link ProjectSchema.Track} to {@link projectValue}.
     * @function newTrack
     * @memberOf projectController
     */
    $scope.newTrack = function(){
        var track = {
            loops: []
        };
        history.addStep(function(){
            projectValue.tracks.push(track);
        }, function(){
            projectValue.tracks.splice(projectValue.tracks.length - 1, 1);
        });
    };
    
    /**
     * Deletes a given {@link ProjectSchema.Track} from {@link projectValue}.
     * @function deleteTrack
     * @memberOf projectController
     * @param {ProjectSchema.Track} track The {@link ProjectSchema.Track} to 
     * delete.
     */    
    $scope.deleteTrack = function(track){
        var index = projectValue.tracks.indexOf(track);
        history.addStep(function(){
            projectValue.tracks.splice(index, 1);
        }, function(){
            projectValue.tracks.splice(index, 0, track);
        });        
    };
});