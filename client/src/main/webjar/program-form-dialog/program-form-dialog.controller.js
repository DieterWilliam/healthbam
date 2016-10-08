(function (angular) {
    "use strict";

    var module = angular.module("healthBam.programFormDialog");

    /**
     * Controller for the program-form dialog.
     * @param $mdDialog
     * @param $mdToast
     * @param $q
     * @param Organization
     * @param ProgramArea
     * @param $log
     * @constructor
     */
    function ProgramFormDialogController(
        $mdDialog,
        $mdToast,
        $q,
        Organization,
        ProgramArea,
        $log
    ) {
        var programFormDialog = this;

        /**
         * Cancels the dialog.
         * @returns promise.
         */
        function cancel() {
            return $mdDialog.cancel(programFormDialog.program);
        }

        /**
         * Returns true iff programArea.value is true.
         * @param programArea
         * @returns {boolean} programArea.value.
         */
        function isProgramAreaSelected(programArea) {
            return programArea.value;
        }

        /**
         * Handles a successful save of the Program.
         * @returns promise for hiding dialog.
         */
        function handleProgramSaveSuccess() {
            return $mdDialog.hide(programFormDialog.program);
        }

        /**
         * Handles an error by showing a toast.
         * @param message {string} to show in toast.
         * @returns {promise} of toast.
         */
        function handleError(message) {

            var toast;

            toast = $mdToast.simple().textContent(
                message
            ).position(
                "top right"
            );

            return $mdToast.show(
                toast
            );
        }

        /**
         * Handles an error saving the Program.
         * @returns rejected promise of error input.
         */
        function handleProgramSaveError(error) {
            $log.debug("program save error", error);
            handleError("Failed to save program.");
            return $q.reject(error);
        }

        /**
         * Handles an error querying for the ProgramAreas.
         * @returns rejected promise of error input.
         */
        function handleProgramAreaQueryError(error) {
            $log.debug("program area query error", error);
            handleError("Failed to retrieve Program Areas.");
            return $q.reject(error);
        }

        /**
         * Handles an error querying for the Organizations.
         * @returns rejected promise of error input.
         */
        function handleOrganizationQueryError(error) {
            $log.debug("organization query error", error);
            handleError("Failed to retrieve Organizations.");
            return $q.reject(error);
        }

        /**
         * Saves form and closes the dialog.
         * @returns promise.
         */
        function save() {
            programFormDialog.program.programAreas = programFormDialog.programAreas.filter(
                isProgramAreaSelected
            );

            if (!programFormDialog.otherProgramArea) {
                /* If "Other" not checked, don't save explanation field. */
                delete programFormDialog.program.otherProgramAreaExplanation;
            }

            return programFormDialog.program.$save().then(
                handleProgramSaveSuccess
            ).catch(
                handleProgramSaveError
            );
        }

        /**
         * Returns the current year.
         * @returns {number} the current year.
         */
        function getCurrentYear() {
            return new Date().getFullYear();
        }

        /**
         * Returns true iff the program is associated with a new organization.
         * @returns {boolean} true if new organization.
         */
        function isNewOrganization() {
            return angular.isObject(programFormDialog.program.organization) &&
                !programFormDialog.program.organization.id;
        }

        /**
         * Initializes the controller.
         */
        function activate() {

            programFormDialog.otherProgramArea = false;

            programFormDialog.programAreas = ProgramArea.query();
            programFormDialog.programAreas.$promise.catch(
                handleProgramAreaQueryError
            );

            programFormDialog.organizations = Organization.query();
            programFormDialog.organizations.$promise.catch(
                handleOrganizationQueryError
            );

            programFormDialog.newOrganization = new Organization();

            programFormDialog.cancel = cancel;
            programFormDialog.save = save;
            programFormDialog.getCurrentYear = getCurrentYear;
            programFormDialog.isNewOrganization = isNewOrganization;

            $log.debug("Program Form Dialog Controller loaded", programFormDialog);
        }

        /* Not a component. Run activate manually. */
        activate();
    }

    /* Inject dependencies. */
    ProgramFormDialogController.$inject = [
        "$mdDialog",
        "$mdToast",
        "$q",
        "Organization",
        "ProgramArea",
        "$log"
    ];

    /* Create controller. */
    module.controller(
        "ProgramFormDialogController",
        ProgramFormDialogController
    );

}(window.angular));
