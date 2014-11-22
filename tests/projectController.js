describe('projectController', function(){
    var scope, projectValue;
    beforeEach(function(){
        module('sunruseStudio');
        inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            projectValue = {
                tracks: []
            };
            $controller('projectController', {
                $scope: scope, 
                projectValue: projectValue
            });
        });
    });
    describe('initial state', function(){
        it('copies a reference to projectValue to the scope', function(){
            expect(scope.projectValue).toBe(projectValue);
        });
    });
    describe('newTrack', function(){
        it('adds a new track to the project', function(){
            scope.newTrack();
            
            expect(projectValue.tracks.length).toEqual(1);
            expect(projectValue.tracks[0].loops).toEqual([]);
        });
    });
    describe('deleteTrack', function(){
        it('deletes the specified track from the project', function(){
            scope.projectValue.tracks = ['Track A', 'Track B', 'Track C'];
            
            scope.deleteTrack('Track B');
            
            expect(projectValue.tracks).toEqual(['Track A', 'Track C']);
        });
    });
});