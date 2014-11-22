describe('history', function(){
    var _history, _dialog;
    
    beforeEach(function(){
        module('sunruseStudio');
        inject(function(history, dialog){
            _history = history;
            _dialog = dialog;
        });
        spyOn(_dialog, 'show').and.callFake(function(){
            expect(false).toBeTruthy();
        });
    });
    describe('initial state', function(){
        it('cannot undo or redo', function(){
            expect(_history.canUndo()).toBeFalsy();            
            expect(_history.canRedo()).toBeFalsy();
        });
    });
    describe('clear', function(){
        it('does nothing if no actions have been taken', function(){
            _history.clear();
        });
        it('prevents further undo if undo steps were available', function(){
            _do = jasmine.createSpy('do');
            undo = jasmine.createSpy('undo');            
            _history.addStep(_do, undo);
            _do.calls.reset();
            
            _history.clear();
            
            expect(_history.canUndo()).toBeFalsy();
            expect(_history.canRedo()).toBeFalsy();
            expect(_do).not.toHaveBeenCalled();
            expect(undo).not.toHaveBeenCalled();
        });
        it('prevents further redo if redo steps were available', function(){
            _do = jasmine.createSpy('do');
            undo = jasmine.createSpy('undo');            
            _history.addStep(_do, undo);
            _history.undo();
            _do.calls.reset();
            undo.calls.reset();
            
            _history.clear();
            
            expect(_history.canUndo()).toBeFalsy();
            expect(_history.canRedo()).toBeFalsy();            
            expect(_do).not.toHaveBeenCalled();
            expect(undo).not.toHaveBeenCalled();
        });  
        it('allows adding new steps after clearing', function(){
            _do = jasmine.createSpy('do');
            undo = jasmine.createSpy('undo');            
            _history.addStep(_do, undo);
            _history.undo();
            _do.calls.reset();
            undo.calls.reset();
            _history.clear();
            newDo = jasmine.createSpy('newDo');
            newUndo = jasmine.createSpy('newUndo');
            _history.addStep(newDo, newUndo);
            
            expect(_history.canUndo()).toBeTruthy();
            expect(_history.canRedo()).toBeFalsy();            
            expect(_do).not.toHaveBeenCalled();
            expect(undo).not.toHaveBeenCalled();  
            expect(newDo).toHaveBeenCalled();
            expect(newUndo).not.toHaveBeenCalled();
        });
        it('allows undoing steps added after clearing', function(){
            _do = jasmine.createSpy('do');
            undo = jasmine.createSpy('undo');            
            _history.addStep(_do, undo);
            _history.undo();
            _do.calls.reset();
            undo.calls.reset();
            _history.clear();
            newDo = jasmine.createSpy('newDo');
            newUndo = jasmine.createSpy('newUndo');
            _history.addStep(newDo, newUndo);
            newDo.calls.reset();
            _history.undo();
            
            expect(_history.canUndo()).toBeFalsy();
            expect(_history.canRedo()).toBeTruthy();            
            expect(_do).not.toHaveBeenCalled();
            expect(undo).not.toHaveBeenCalled();  
            expect(newDo).not.toHaveBeenCalled(); 
            expect(newUndo).toHaveBeenCalled();
        });
        it('allows redoing steps added after clearing', function(){
            _do = jasmine.createSpy('do');
            undo = jasmine.createSpy('undo');            
            _history.addStep(_do, undo);
            _history.undo();
            _do.calls.reset();
            undo.calls.reset();
            _history.clear();
            newDo = jasmine.createSpy('newDo');
            newUndo = jasmine.createSpy('newUndo');
            _history.addStep(newDo, newUndo);
            newDo.calls.reset();
            _history.undo();
            newUndo.calls.reset();
            _history.redo();            
            
            expect(_history.canUndo()).toBeTruthy();
            expect(_history.canRedo()).toBeFalsy();            
            expect(_do).not.toHaveBeenCalled();
            expect(undo).not.toHaveBeenCalled();  
            expect(newDo).toHaveBeenCalled();    
            expect(newUndo).not.toHaveBeenCalled();
        });        
    });
    describe('after adding a step', function(){
        var _do, undo;
        beforeEach(function(){
            _do = jasmine.createSpy('_do');
            undo = jasmine.createSpy('undo');
            _history.addStep(_do, undo);
        });
        it('executes the do callback but not the undo callback', function(){
            expect(_do).toHaveBeenCalled();
            expect(undo).not.toHaveBeenCalled();
        });
        it('can undo but not redo', function(){
            expect(_history.canUndo()).toBeTruthy();            
            expect(_history.canRedo()).toBeFalsy();
        });
        describe('and undoing', function(){
            beforeEach(function(){
                _do.calls.reset();
                undo.calls.reset();
                _history.undo();
            });
            it('executes the undo callback but not the do callback', function(){
                expect(_do).not.toHaveBeenCalled();
                expect(undo).toHaveBeenCalled();
            });
            it('can redo but not undo', function(){
                expect(_history.canUndo()).toBeFalsy();            
                expect(_history.canRedo()).toBeTruthy();
            });
            describe('and redoing', function(){
                beforeEach(function(){
                    _do.calls.reset();
                    undo.calls.reset();
                    _history.redo();
                });
                it('executes the do callback but not the undo callback', function(){
                    expect(_do).toHaveBeenCalled();
                    expect(undo).not.toHaveBeenCalled();
                });
                it('can undo but not redo', function(){
                    expect(_history.canUndo()).toBeTruthy();            
                    expect(_history.canRedo()).toBeFalsy();
                });
            });  
            describe('and adding a new step', function(){
                var do2, undo2, yes, no;
                beforeEach(function(){
                    do2 = jasmine.createSpy('do2');
                    undo2 = jasmine.createSpy('undo2');
                    _do.calls.reset();
                    undo.calls.reset();
                    _dialog.show.and.callFake(function(title, message, buttons){
                        expect(title).toEqual('historyClearRedoTitle');
                        expect(message).toEqual('historyClearRedoMessage');
                        expect(buttons.length).toEqual(2);
                        expect(buttons[0].label).toEqual('yes');
                        yes = buttons[0].click;
                        expect(buttons[1].label).toEqual('no');
                        no = buttons[1].click;
                    });                    
                    _history.addStep(do2, undo2);
                });
                it('does not execute any callbacks immediately', function(){
                    expect(_do).not.toHaveBeenCalled();
                    expect(undo).not.toHaveBeenCalled();
                    expect(do2).not.toHaveBeenCalled();
                    expect(undo2).not.toHaveBeenCalled();                    
                });
                it('does not change undo/redo state', function(){
                    expect(_history.canUndo()).toBeFalsy();            
                    expect(_history.canRedo()).toBeTruthy();                  
                });
                it('opens a modal dialog asking the user if they wish to erase their undone changes', function(){
                    expect(_dialog.show).toHaveBeenCalled();
                });
                describe('when choosing to', function(){
                    beforeEach(function(){
                        _do.calls.reset();
                        undo.calls.reset();
                        do2.calls.reset();
                        undo2.calls.reset();   
                        _dialog.show.calls.reset();
                        _dialog.show.and.callFake(function(){
                            expect(false).toBeTruthy();
                        });
                    });
                    describe('cancel', function(){
                        beforeEach(function(){
                            no();
                        });
                        it('calls nothing', function(){
                            expect(_do).not.toHaveBeenCalled();
                            expect(undo).not.toHaveBeenCalled();
                            expect(do2).not.toHaveBeenCalled();
                            expect(undo2).not.toHaveBeenCalled();
                        });
                        it('does not change undo/redo state', function(){
                            expect(_history.canUndo()).toBeFalsy();            
                            expect(_history.canRedo()).toBeTruthy();                  
                        });
                        describe('and redoing again', function(){
                            beforeEach(function(){
                                _do.calls.reset();
                                undo.calls.reset();
                                do2.calls.reset();
                                undo2.calls.reset(); 
                                _history.redo();
                            });
                            it('calls only the old redo step', function(){
                                expect(_do).toHaveBeenCalled();
                                expect(undo).not.toHaveBeenCalled();
                                expect(do2).not.toHaveBeenCalled();
                                expect(undo2).not.toHaveBeenCalled();
                            });
                            it('allows undo of the old step, but not redo', function(){
                                expect(_history.canUndo()).toBeTruthy();            
                                expect(_history.canRedo()).toBeFalsy();                  
                            });                            
                            describe('and undoing again', function(){
                                beforeEach(function(){
                                    _do.calls.reset();
                                    undo.calls.reset();
                                    do2.calls.reset();
                                    undo2.calls.reset(); 
                                    _history.undo();
                                });                                
                                it('calls only the old undo step', function(){
                                    expect(_do).not.toHaveBeenCalled();
                                    expect(undo).toHaveBeenCalled();
                                    expect(do2).not.toHaveBeenCalled();
                                    expect(undo2).not.toHaveBeenCalled();
                                });
                                it('allows redo of the old step, but not undo', function(){
                                    expect(_history.canUndo()).toBeFalsy();            
                                    expect(_history.canRedo()).toBeTruthy();                  
                                });                            
                            }); 
                        });
                    });
                    describe('erase the undone steps', function(){
                        beforeEach(function(){
                            yes();
                        });
                        it('calls only the new do step', function(){
                            expect(_do).not.toHaveBeenCalled();
                            expect(undo).not.toHaveBeenCalled();
                            expect(do2).toHaveBeenCalled();
                            expect(undo2).not.toHaveBeenCalled();
                        });
                        it('allows undo of the new step, but not redo of the erased step', function(){
                            expect(_history.canUndo()).toBeTruthy();            
                            expect(_history.canRedo()).toBeFalsy();                  
                        });
                        describe('and undoing again', function(){
                            beforeEach(function(){
                                _do.calls.reset();
                                undo.calls.reset();
                                do2.calls.reset();
                                undo2.calls.reset(); 
                                _history.undo();
                            });
                            it('calls only the new undo step', function(){
                                expect(_do).not.toHaveBeenCalled();
                                expect(undo).not.toHaveBeenCalled();
                                expect(do2).not.toHaveBeenCalled();
                                expect(undo2).toHaveBeenCalled();
                            });
                            it('allows redo of the new step, but not undo', function(){
                                expect(_history.canUndo()).toBeFalsy();            
                                expect(_history.canRedo()).toBeTruthy();                  
                            });                            
                            describe('and redoing again', function(){
                                beforeEach(function(){
                                    _do.calls.reset();
                                    undo.calls.reset();
                                    do2.calls.reset();
                                    undo2.calls.reset(); 
                                    _history.redo();
                                });                                
                                it('calls only the new redo step', function(){
                                    expect(_do).not.toHaveBeenCalled();
                                    expect(undo).not.toHaveBeenCalled();
                                    expect(do2).toHaveBeenCalled();
                                    expect(undo2).not.toHaveBeenCalled();
                                });
                                it('allows undo of the new step, but not redo', function(){
                                    expect(_history.canUndo()).toBeTruthy();            
                                    expect(_history.canRedo()).toBeFalsy();                  
                                });                            
                            });
                        });
                    });
                });
            });             
        });
    });
    describe('in the complex scenario', function(){
        // Add three steps.  Undo twice.  Add a new step, cleaing the undone steps.
        describe('erasing redo steps when undo steps exist does not clear the undo steps', function(){
            var unerasedDo, doA, undoA, doB, undoB, replacementDo, replacementUndo;
            beforeEach(function(){
                unerasedDo = jasmine.createSpy('unerasedDo');
                unerasedUndo = jasmine.createSpy('unerasedUndo');
                _history.addStep(unerasedDo, unerasedUndo);
                expect(unerasedDo).toHaveBeenCalled();
                expect(unerasedUndo).not.toHaveBeenCalled();
                
                doA = jasmine.createSpy('doA');
                undoA = jasmine.createSpy('undoA');
                unerasedDo.calls.reset();
                _history.addStep(doA, undoA);
                expect(doA).toHaveBeenCalled();
                expect(undoA).not.toHaveBeenCalled();
                expect(unerasedDo).not.toHaveBeenCalled();
                expect(unerasedUndo).not.toHaveBeenCalled();
                
                doB = jasmine.createSpy('doB');
                undoB = jasmine.createSpy('undoB');
                doA.calls.reset();
                _history.addStep(doB, undoB);
                expect(doB).toHaveBeenCalled();
                expect(undoB).not.toHaveBeenCalled();
                expect(doA).not.toHaveBeenCalled();
                expect(undoA).not.toHaveBeenCalled();
                expect(unerasedDo).not.toHaveBeenCalled();   
                expect(unerasedUndo).not.toHaveBeenCalled();
                
                doB.calls.reset();
                _history.undo();
                expect(doB).not.toHaveBeenCalled();
                expect(undoB).toHaveBeenCalled();
                expect(doA).not.toHaveBeenCalled();
                expect(undoA).not.toHaveBeenCalled();
                expect(unerasedDo).not.toHaveBeenCalled();    
                expect(unerasedUndo).not.toHaveBeenCalled();
                expect(_history.canRedo()).toBeTruthy();
                expect(_history.canUndo()).toBeTruthy();
                
                undoB.calls.reset();
                _history.undo();
                expect(doB).not.toHaveBeenCalled();
                expect(undoB).not.toHaveBeenCalled();
                expect(doA).not.toHaveBeenCalled();
                expect(undoA).toHaveBeenCalled();
                expect(unerasedDo).not.toHaveBeenCalled(); 
                expect(unerasedUndo).not.toHaveBeenCalled();
                expect(_history.canRedo()).toBeTruthy();
                expect(_history.canUndo()).toBeTruthy();       
                
                _dialog.show.and.callFake(function(){});
                replacementDo = jasmine.createSpy('replacementDo');
                replacementUndo = jasmine.createSpy('replacementUndo');
                undoA.calls.reset();
                _history.addStep(replacementDo, replacementUndo);
                expect(doB).not.toHaveBeenCalled();
                expect(undoB).not.toHaveBeenCalled();
                expect(doA).not.toHaveBeenCalled();
                expect(undoA).not.toHaveBeenCalled();
                expect(unerasedDo).not.toHaveBeenCalled();   
                expect(unerasedUndo).not.toHaveBeenCalled();
                expect(replacementDo).not.toHaveBeenCalled();
                expect(replacementUndo).not.toHaveBeenCalled();
                expect(_history.canRedo()).toBeTruthy();
                expect(_history.canUndo()).toBeTruthy();     
                expect(_dialog.show).toHaveBeenCalled();
            
                _dialog.show.calls.mostRecent().args[2][0].click();
                expect(doB).not.toHaveBeenCalled();
                expect(undoB).not.toHaveBeenCalled();
                expect(doA).not.toHaveBeenCalled();
                expect(undoA).not.toHaveBeenCalled();
                expect(unerasedDo).not.toHaveBeenCalled();   
                expect(unerasedUndo).not.toHaveBeenCalled();
                expect(replacementDo).toHaveBeenCalled();
                expect(replacementUndo).not.toHaveBeenCalled();
                expect(_history.canRedo()).toBeFalsy();
                expect(_history.canUndo()).toBeTruthy();  
                
                replacementDo.calls.reset();
            });
            it('reverts when undone', function(){
                _history.undo();
                expect(doB).not.toHaveBeenCalled();
                expect(undoB).not.toHaveBeenCalled();
                expect(doA).not.toHaveBeenCalled();
                expect(undoA).not.toHaveBeenCalled();
                expect(unerasedDo).not.toHaveBeenCalled();   
                expect(unerasedUndo).not.toHaveBeenCalled();
                expect(replacementDo).not.toHaveBeenCalled();
                expect(replacementUndo).toHaveBeenCalled();
                expect(_history.canRedo()).toBeTruthy();
                expect(_history.canUndo()).toBeTruthy();                  
            });
            it('undoes everything when undone twice', function(){
                _history.undo();
                replacementUndo.calls.reset();
                _history.undo();
                expect(doB).not.toHaveBeenCalled();
                expect(undoB).not.toHaveBeenCalled();
                expect(doA).not.toHaveBeenCalled();
                expect(undoA).not.toHaveBeenCalled();
                expect(unerasedDo).not.toHaveBeenCalled();   
                expect(unerasedUndo).toHaveBeenCalled();
                expect(replacementDo).not.toHaveBeenCalled();
                expect(replacementUndo).not.toHaveBeenCalled();
                expect(_history.canRedo()).toBeTruthy();
                expect(_history.canUndo()).toBeFalsy();                  
            });            
        });
    });
});