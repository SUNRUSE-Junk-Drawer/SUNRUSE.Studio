angular.module('sunruseStudio')
.controller('projectController', function($scope, projectValue){
    
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
     * Adds a new, empty {@link ProjectSchema.Track} to {@link projectValue}.
     * @function newTrack
     * @memberOf projectController
     */
    $scope.newTrack = function(){
        projectValue.tracks.push({
            loops: []
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
        projectValue.tracks.splice(projectValue.tracks.indexOf(track), 1);
    };
    
});