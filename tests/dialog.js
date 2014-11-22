describe('dialog', function(){
    beforeEach(module('sunruseStudio'));
    describe('initial state', function(){
        it('is not visible', inject(function(dialog){
            expect(dialog.isVisible).toBeFalsy();
        }));
    });
    describe('show', function(){
        it('makes the dialog visible', inject(function(dialog){
            dialog.show();
            expect(dialog.isVisible).toBeTruthy();
        }));
        it('copies the title and message to the service', inject(function(dialog){
            dialog.show('Test Title', 'Test Message');
            expect(dialog.title).toEqual('Test Title');
            expect(dialog.message).toEqual('Test Message');
        }));
        describe('buttons', function(){
            it('populates the service\'s buttons based on the buttons given', inject(function(dialog){
                dialog.show(undefined, undefined, [{
                    label: 'Button A'
                }, {
                    label: 'Button B'
                }, {
                    label: 'Button C'
                }]);
                expect(dialog.buttons.length).toEqual(3);
                expect(dialog.buttons[0].label).toEqual('Button A');
                expect(dialog.buttons[1].label).toEqual('Button B');
                expect(dialog.buttons[2].label).toEqual('Button C');
            }));      
            it('does not call any of the buttons\' click functions until clicked', inject(function(dialog){
                var clickA = jasmine.createSpy('clickA');
                var clickB = jasmine.createSpy('clickB');
                var clickC = jasmine.createSpy('clickC');
                dialog.show(undefined, undefined, [{
                    click: clickA
                }, {
                    click: clickB
                }, {
                    click: clickC
                }]);
                expect(clickA).not.toHaveBeenCalled();
                expect(clickB).not.toHaveBeenCalled();
                expect(clickC).not.toHaveBeenCalled();
            }));      
            it('calls only the clicked button\'s click function when clicked', inject(function(dialog){
                var clickA = jasmine.createSpy('clickA');
                var clickB = jasmine.createSpy('clickB');
                var clickC = jasmine.createSpy('clickC');
                dialog.show(undefined, undefined, [{
                    click: clickA
                }, {
                    click: clickB
                }, {
                    click: clickC
                }]);
                dialog.buttons[1].click();
                expect(clickA).not.toHaveBeenCalled();
                expect(clickB).toHaveBeenCalled();
                expect(clickC).not.toHaveBeenCalled();
            }));        
            it('hides the dialog when a button is clicked.', inject(function(dialog){
                dialog.show(undefined, undefined, [{
                    click: function(){}
                }]);
                dialog.buttons[0].click();
                expect(dialog.isVisible).toBeFalsy();
            }));    
            it('clears the previous list of buttons on a subsequent call', inject(function(dialog){
                dialog.show(undefined, undefined, [{label: 'Button A'}]);
                dialog.show(undefined, undefined, [{label: 'Button B'}]);
                expect(dialog.buttons.length).toEqual(1);
                expect(dialog.buttons[0].label).toEqual('Button B');
            }));              
        });
    });
});