describe('projectController', function(){
    var scope, projectValue, dialog, history;
    beforeEach(function(){
        module('sunruseStudio');
        inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            projectValue = {
                tracks: []
            };
            dialog = {};
            history = {
                addStep: jasmine.createSpy('addStep')
            };
            history.addStep.and.callFake(function(){
                expect(false).toBeTruthy();
            });
            $controller('projectController', {
                $scope: scope, 
                projectValue: projectValue,
                dialog: dialog,
                history: history
            });
        });
    });
    describe('initial state', function(){
        it('copies a reference to projectValue to the scope', function(){
            expect(scope.projectValue).toBe(projectValue);
        });
        it('copies a reference to dialog to the scope', function(){
            expect(scope.dialog).toBe(dialog);
        });        
        it('copies a reference to history to the scope', function(){
            expect(scope.history).toBe(history);
        });        
    });
    describe('newTrack', function(){
        beforeEach(function(){
            history.addStep.and.callFake(function(){});
            scope.newTrack();
        });
        it('registers a new history step', function(){
            expect(history.addStep).toHaveBeenCalled();
        });
        it('does not add a track on its own', function(){
            expect(projectValue.tracks.length).toEqual(0);
        });
        it('adds a new track when executed by history', function(){
            history.addStep.calls.mostRecent().args[0]();
            expect(projectValue.tracks.length).toEqual(1);
            expect(projectValue.tracks[0].loops).toEqual([]);
        });
        it('removes the added track when undone again', function(){
            history.addStep.calls.mostRecent().args[0]();
            history.addStep.calls.mostRecent().args[1]();
            expect(projectValue.tracks.length).toEqual(0);
        });        
    });
    describe('deleteTrack', function(){
        beforeEach(function(){
            scope.projectValue.tracks = ['Track A', 'Track B', 'Track C'];
            history.addStep.and.callFake(function(){});
            scope.deleteTrack('Track B');
        });
        it('registers a new history step', function(){
            expect(history.addStep).toHaveBeenCalled();
        });
        it('does not add a track on its own', function(){
            expect(projectValue.tracks).toEqual(['Track A', 'Track B', 'Track C']);
        });
        it('deletes the specified track when executed by history', function(){
            history.addStep.calls.mostRecent().args[0]();
            expect(projectValue.tracks).toEqual(['Track A', 'Track C']);
        });
        it('re-adds the deleted track when undone again', function(){
            history.addStep.calls.mostRecent().args[0]();
            history.addStep.calls.mostRecent().args[1]();
            expect(projectValue.tracks).toEqual(['Track A', 'Track B', 'Track C']);
        });
    });
});