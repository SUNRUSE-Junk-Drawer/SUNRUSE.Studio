angular.module('sunruseStudio')
.service('history', function(dialog){
    
    var steps = [];
    var currentStep = 0;
    
    /**
     * Provides a global undo/redo mechanism.
     * @class history
     */
    var history = {
        /**
         * @returns {Boolean} True when there are steps which can be undone,
         * else false.
         * @memberOf history
         */
        canUndo: function(){
            return currentStep > 0;
        },
        /**
         * @returns {Boolean} True when there are undone steps which can be 
         * redone, else false.
         * @memberOf history
         */
        canRedo: function(){
            return currentStep < steps.length;
        },
        /**
         * Attempts to create a new history step to perform a given action.
         * If there are undone steps, a dialog will be shown allowing the user
         * to choose to delete these steps.  If they do not, your functions
         * are never called.
         * @param {Function} _do A function to be called when performing this
         * history step.  Will never be called twice without a call to undo
         * in between.
         * @param {Function} undo A function to be called when undoing this
         * history step.  Will never be called without a call to _do first.
         * @memberOf history
         */
        addStep: function(_do, undo){
            if(history.canRedo()) {
                dialog.show('historyClearRedoTitle', 'historyClearRedoMessage', [{
                    label: 'yes',
                    click: function(){
                        _do();
                        steps.splice(currentStep, steps.length - currentStep);
                        steps.push({_do: _do, undo: undo});
                        currentStep++;
                    }
                }, {
                    label: 'no',
                    click: function(){}
                }])
            }else{
                _do();
                steps.push({_do: _do, undo: undo});
                currentStep++;
            }
        },
        /**
         * Undoes the previous history step.
         * @memberOf history
         */
        undo: function(){
            steps[currentStep - 1].undo();
            currentStep--;
        },
        /**
         * Redoes the next undone history step.
         * @memberOf history
         */
        redo: function(){
            steps[currentStep]._do();
            currentStep++;
        },
        /**
         * Deletes all history steps.
         * @memberOf history
         */
        clear: function(){
            steps = [];
            currentStep = 0;
        }
    };
    
    return history;
    
});