angular.module("App", []).controller("MainCtrl", function ($scope, $http, $interval) {
    "use strict";

    var self = this;

    this.currentDate = new Date();

    this.loadFiles = function () { 
        $http.get("files.json").then(function(result) {
            result.data.splice(result.data.length-1);
            self.files = result.data.map(function (filename) {
                var extractedDate = filename.match(/^DCS-932L(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
                var fileDate;
                if (extractedDate) {
                    fileDate = new Date(extractedDate[1], extractedDate[2], extractedDate[3], extractedDate[4], extractedDate[5], extractedDate[6], 0);
                }
                return {
                    filename: filename,
                    date: fileDate
                };
            });
        });
    };

    this.resetActive = function () {
        this.current = null;
        this.files.forEach(function (file) {
            delete file.active;
        });
    };

    this.makeActive = function (file) {
        this.resetActive();
        file.active = true;
        this.current = file;
    };

    $interval(function () {
        self.currentDate = new Date();
    }, 1000);

   $interval(function () {
       self.loadFiles();
   }, 5000);

    this.$onInit = function () {
        this.loadFiles();
    };

});
