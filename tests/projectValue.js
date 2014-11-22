describe('projectValue', function(){
    beforeEach(module('sunruseStudio'));
    it('creates an empty array of tracks', inject(function(projectValue){
        expect(projectValue.tracks).toEqual([]);
    }));
});