var app = angular.module('app', []);

app.factory('Person', function() {
    return function Person(name) {
        this.name - name;
    }
});

app.controller('AccountsCtrl', function($scope) {

    $scope.currencies = [
        // rates in pennies to prevent rounding of floats
        {
            name: 'GBP',
            symbol: "�",
            rate: 100
        }, {
            name: 'EUR',
            symbol: "�",
            rate: 140
        }, {
            name: 'USD',
            symbol: "$",
            rate: 153
        }, {
            name: 'CAD',
            symbol: "$",
            rate: 190
        }, {
            name: 'JPY',
            symbol: "�",
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
    $scope.localstorage;

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

        $scope.obtain();
    };

    $scope.signout = function() {
        $scope.user = '';
    };

    $scope.createaccount = function() {

        $scope.newaccount.hint = "";
        $scope.newaccount.balance = 0;

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
        $scope.persist();
    };

    $scope.transaction = function(isDeposit) {
        var account = this.account;
        var transaction = this.account.transaction;
        // should do some sanity checks...
        if (!isFinite(transaction.amount)) {
            transaction.hint = "Transaction amount must be a number (pennies).";
            return;
        }

        if (!(transaction.amount > 0)) {
            transaction.hint = "Transaction amount must be over 0.";
            return;
        }

        if (!isDeposit && (account.balance - transaction.amount + account.overdraft) < 0) {
            transaction.hint = "Rejected: would make balance beyond overdraft facility."
            return;
        }

        if (!account.transactions) {
            account.transactions = [];
        }

        if (isDeposit) {
            account.balance += transaction.amount;
            transaction.type = "deposit";
        } else {
            account.balance -= transaction.amount;
            transaction.type = "withdrawal";
        }

        transaction.balance = account.balance;
        transaction.timestamp = new Date();
        account.transactions.push(transaction);
        this.account.transaction = {};
        $scope.persist();
    }

    $scope.persist = function() {
        localStorage.users = JSON.stringify($scope.users);
        localStorage.accounts = JSON.stringify($scope.accounts);
    }

    $scope.obtain = function() {
        if (localStorage.users) {
            $scope.users = JSON.parse(localStorage.users);
        }
        if (localStorage.accounts) {
            $scope.accounts = JSON.parse(localStorage.accounts);
        }
    }

    $scope.reset = function() {
        if (confirm("Do you really want to delete all transactions for this user?")) {
            $scope.accounts = [];
            delete localStorage.accounts;
        }
    }

});
