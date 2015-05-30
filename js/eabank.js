var app = angular.module('app', []);

app.controller('AccountsCtrl', function($scope) {

    $scope.currencies = [
        // rates in pennies to prevent rounding of floats
        {
            name: 'GBP',
            symbol: '£',
            rate: 100
        }, {
            name: 'EUR',
            symbol: '£',
            rate: 140
        }, {
            name: 'USD',
            symbol: '£',
            rate: 153
        }, {
            name: 'CAD',
            symbol: '£',
            rate: 190
        }, {
            name: 'JPY',
            symbol: '£',
            rate: 18900
        }
    ];

    // obviously keeping usernames and passwords in the clear is daft
    // this is only for proof of concept, and passwords should be hashed and on server side
    $scope.users = [{
        firstname: "Colin",
        lastname: "Bootle",
        username: "colin",
        password: "password",
        loggedin: false
    }, {
        firstname: "John",
        lastname: "Browne",
        username: "jbrowne",
        password: "jellybabies",
        loggedin: false
    }];

    $scope.user = '';
    $scope.username;
    $scope.password;
    $scope.login_hint;

    $scope.login = function() {
        var i = 0;
        var max = $scope.users.length;
        $scope.login_hint = "";
        $user = "";
        for (i = 0; i < max; i++) {
            if ($scope.users[i].username == $scope.username && $scope.users[i].password == $scope.password) {
                alert("found correct username " + $scope.username);

                // don't hold onto the username and password in the form!
                $scope.username = "";
                $scope.password = "";
                $scope.user = $scope.users[i];
                break;
            }
        }
        if (!$scope.user) {
        	$scope.login_hint = "Sorry, login failed";
        }
    };

    $scope.logout = function() {
    	$scope.user = '';
    }

});
