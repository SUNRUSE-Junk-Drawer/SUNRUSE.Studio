angular.module('sunruseStudio')
.service('dialog', function(){
    
    /**
     * Provides a system for showing modal dialogs.
     * @class dialog
     */
    var dialog = {
        /** 
         * True when the dialog is visible, else, false.
         * @member {Boolean}
         * @memberOf dialog
         */
        isVisible: false,
        
        /** 
         * The title of the currently visible dialog. 
         * @member {String}
         * @memberOf dialog
         */
        title: undefined,
        
        /** 
         * The message of the currently visible dialog. 
         * @member {String}
         * @memberOf dialog
         */
        message: undefined,
        
        /**
         * The buttons to display in the currently visible dialog.
         * @member {dialog.DialogButton[]}
         * @memberOf dialog
         */
        buttons: undefined,
        
        /**
         * A button within a visible dialog.
         * @class DialogButton
         * @memberOf dialog
         */
         
        /**
         * The label to display to the user for this {@link dialog.DialogButton}.
         * @member {String} label
         * @memberOf dialog.DialogButton
         */
         
        /**
         * A function to call on clicking this {@link dialog.DialogButton}.
         * @function click
         * @memberOf dialog.DialogButton
         */
         
        /**
         * Closes the currently open dialog.
         */
        close: function(){
            dialog.isVisible = false;
        },
        
        /**
         * Shows a specified dialog to the user, preventing further interaction
         * with the rest of the application until it is dismissed.
         * @memberOf dialog
         * @param {String} title The title of the dialog.
         * @param {String} message The message of the dialog.
         * @param {dialog.DialogButton} buttons A list of buttons to show in the
         * dialog.
         */
        show: function(title, message, buttons){
            dialog.isVisible = true;
            dialog.title = title;
            dialog.message = message;
            dialog.buttons = buttons;
            angular.forEach(buttons, function(button){
                // Wrap the functions we received so that we close the dialog
                // as well as doing what the button should do.
                // We need to store this in a temporary variable to prevent an
                // infinite loop.
                var click = button.click;
                button.click = function(){
                    dialog.close();
                    click();
                };
            });
        }
    };
    
    return dialog;
    
});