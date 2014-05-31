var app = angular.module('superApp', ['ngTouch']);

app.controller('SuperCtrl', function SuperCtrl($scope, $http, $window) {

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
        var toBeContinued = false;
        var display = $scope.display.split('');

        for(var i in display) {
            if(toBeContinued) {
                toBeContinued = false;
                continue;
            }
            i = parseInt(i);
            if(display[i] === '-') {
                if(i === 0 || isNaN(parseInt(display[i-1]))) {
                    display[i] = (-1 * parseInt(display[i+1])) + '';
                    display[i+1] = null;
                    toBeContinued = true;
                }
            }
        }

        for(var i in display) {
            if(display[i] === null) continue;
            if(['+', '-', '*', '/'].indexOf(display[i]) === -1) {
                currentNumber += display[i];
            } else {
                try {
                    characterArray.push(new BigDecimal(currentNumber));
                } catch(e) {
                    if(e.indexOf('Not a number') !== -1) {
                        $scope.showError();
                    }
                    return false;
                }
                characterArray.push(display[i]);
                currentNumber = '';
            }
        }

        if(currentNumber) {
            try {
                currentNumber = new BigDecimal(currentNumber);
            } catch(e) {
                if(e.indexOf('Not a number') !== -1) {
                    $scope.showError();
                }
                return false;
            }
            characterArra
            characterArray.push(currentNumber);
        }

        while(characterArray.indexOf('*') !== -1 || characterArray.indexOf('/') !== -1) {
            for(var i in characterArray) {
                i = parseInt(i);
                if(characterArray[i] === '*') {
                    characterArray[i - 1] = characterArray[i - 1].multiply(characterArray[i + 1]);
                } else if(characterArray[i] === '/') {
                    characterArray[i - 1] = characterArray[i - 1].divide(characterArray[i + 1], 7, MathContext.ROUND_HALF_UP);
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

        $scope.display = Number($scope.display) + '';
    };


    $scope.removeAll = function() {
        $scope.display = '';
    };


    $scope.showError = function() {
        $window.alert('Syntax error');
    };
});
