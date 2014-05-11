var app = angular.module('superApp', ['ngTouch']);

app.controller('SuperCtrl', function SuperCtrl($scope, $http) {

    $scope.display = '';
    $scope.developerInfo = false;

    $scope.buttonPressed = function($event, buttonText) {

        $event.preventDefault();

        $scope.display += buttonText;
    };


    $scope.backslash = function() {
        $scope.display = $scope.display.substring(0, $scope.display.length - 1);
    };


    $scope.process = function() {

        var characterArray = [];

        var currentNumber = '';

        for(var i in $scope.display) {
            if(['+', '-', '*', '/'].indexOf($scope.display[i]) === -1) {
                currentNumber += $scope.display[i];
            } else {
                characterArray.push(new BigDecimal(currentNumber));
                characterArray.push($scope.display[i]);
                currentNumber = '';
            }
        }

        if(currentNumber) {
            characterArray.push(new BigDecimal(currentNumber));
        }

        while(characterArray.indexOf('*') !== -1 || characterArray.indexOf('/') !== -1) {
            for(var i in characterArray) {
                i = parseInt(i);
                if(characterArray[i] === '*') {
                    characterArray[i - 1] = characterArray[i - 1].multiply(characterArray[i + 1]);
                } else if(characterArray[i] === '/') {
                    characterArray[i - 1] = characterArray[i - 1].divide(characterArray[i + 1]);
                } else {
                    continue;
                }
                characterArray.splice(i, 2);
            }
        }

        while(characterArray.indexOf('+') !== -1 || characterArray.indexOf('-') !== -1) {
            for(var i in characterArray) {
                i = parseInt(i);
                if(characterArray[i] === '+') {
                    characterArray[i - 1] = characterArray[i - 1].add(characterArray[i + 1]);
                } else if(characterArray[i] === '-') {
                    characterArray[i - 1] = characterArray[i - 1].subtract(characterArray[i + 1]);
                } else {
                    continue;
                }
                characterArray.splice(i, 2);
            }
        }

        $scope.display = '';

        for(var i in characterArray) {
            $scope.display += characterArray[i];
        }
    };


    $scope.removeAll = function() {
        $scope.display = '';
    };
});
