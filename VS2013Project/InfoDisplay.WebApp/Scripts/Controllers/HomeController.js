var homeController = function ($scope, infoHubService) {

    $scope.infoMessage = 'test';
    $scope.inputChange = function() {
        infoHubService.sendRequest($scope.message);
    };

    $scope.$on('incomingMessage', function (e, data) {
        $scope.$apply(function () {
            $scope.infoMessage = data;
        });
    });

    $scope.$on('incomingColor', function (e, data) {
        $scope.$apply(function () {
            $scope.backgroundColor = data;
        });
    });

    infoHubService.initialize();
};

homeController.$inject = ['$scope', 'infoHubService'];
