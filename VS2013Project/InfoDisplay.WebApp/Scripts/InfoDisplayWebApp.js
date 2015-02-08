var InfoDisplayWebApp = angular.module('InfoDisplayWebApp', []);

InfoDisplayWebApp.controller('homeController', homeController);

InfoDisplayWebApp.factory('infoHubService', function($rootScope) {
    var proxy = null;

    var initialize = function() {
        // fetch connection object and create proxy
        this.proxy = $.connection.infoHub;

        this.proxy.client.incomingMessage = function (data) {
            $rootScope.$broadcast('incomingMessage', data);
        };

        this.proxy.client.incomingColor = function (data) {
            $rootScope.$broadcast('incomingColor', data);
        };

        // start connection
        $.connection.hub.start();
    };

    var sendRequest = function(message) {
        // invoke sendWidget method defined in hub
        this.proxy.server.pushMessage(message);
    };

    return {
        initialize: initialize,
        sendRequest: sendRequest
    };
});
