var app = angular.module('app', []);

app.factory('Person', function(){
	return function Person (name) {
		this.name - name;
	}
}) ;

app.controller('AccountsCtrl', function($scope) {

    // $scope.currencies = ["GBP","JPY"];

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
    // dongle two factor auth would also be implemented server side, as a separate request
    $scope.users = [{
        firstname: "Colin",
        lastname: "Bootle",
        username: "colin",
        password: "password",
        dongle: "12345",
        loggedin: false
    }, {
        firstname: "John",
        lastname: "Browne",
        username: "jbrowne",
        password: "jellybabies",
        dongle: "12345",
        loggedin: false
    }];

    $scope.user = '';
    $scope.login = {};
    $scope.newaccount = {};
    $scope.accounts = [];

    $scope.signin = function() {
        var i = 0;
        var max = $scope.users.length;
        $scope.login.hint = "";
        $scope.user = "";
        for (i = 0; i < max; i++) {
            if ($scope.users[i].username == $scope.login.username && $scope.users[i].password == $scope.login.password && $scope.users[i].dongle == $scope.login.dongle) {
                // don't hold onto the username and password in the form!
                $scope.login = undefined;
                $scope.user = $scope.users[i];
                break;
            }
        }
        if (!$scope.user) {
            $scope.login.hint = "Sorry, login failed";
        }
    };

    $scope.signout = function() {
        $scope.user = '';
    };

    $scope.createaccount = function() {

        $scope.newaccount.hint = "";

        if (!$scope.newaccount.accountname) {
            $scope.newaccount.hint = "Please give your new account a name.";
            return;
        };
        if (!$scope.newaccount.currency) {
            $scope.newaccount.hint = "Please select a currency.";
            return;
        };

        angular.forEach($scope.accounts, function(value, key) {
            if (value.accountname == $scope.newaccount.accountname) {
                $scope.newaccount.hint = "Sorry, that account name is already in use.";
                return;
            }
        });

        $scope.accounts.push($scope.newaccount);
        $scope.newaccount = undefined;
    };

});
