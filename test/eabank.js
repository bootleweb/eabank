describe("Check initial conditions ", function() {

    beforeEach(module('app'));

    var controller, scope;

    beforeEach(inject(function($rootScope, $controller) {

        scope = $rootScope.$new();
        controller = $controller('AccountsCtrl', {
            $scope: scope
        });
    }));

    // some really trivial tests to prove Jasmine and Karma are working
    it('Have five currencies', function() {
        expect(scope.currencies.length).toEqual(5);
    });

    it('Have two users', function() {
        expect(scope.users.length).toEqual(2);
    });

    it('First user called Colin', function() {
        expect(scope.users[0].firstname).toEqual("Colin");
    });

    // a more complex test - actually logging in
    it("Can log in", function() {
        scope.login.username = 'colin';
        scope.login.password = 'password';
        scope.login.dongle = '12345';
        scope.signin();
        expect(scope.user.firstname).toEqual("Colin");
        expect(scope.login).toBeFalsy();
    });

    // let's fail logging in
    it("Can fail log in when password wrong", function() {
        scope.login.username = 'colin';
        scope.login.password = 'badpassword';
        scope.login.dongle = '12345';
        scope.signin();
        expect(scope.login).toBeTruthy();
        expect(scope.login.hint).toEqual("Sorry, login failed");
    });

    it("Can create a new account", function() {
        // login first though
        scope.login.username = 'colin';
        scope.login.password = 'password';
        scope.login.dongle = '12345';
        scope.signin();
        expect(scope.user.firstname).toEqual("Colin");

        scope.newaccount.accountname = "Test Account";
        scope.newaccount.currency = "JPY";
        scope.createaccount();
        expect(scope.accounts.length).toEqual(1);
        expect(scope.accounts[0].accountname).toEqual("Test Account");
        expect(scope.newaccount).toBeFalsy();
    });

});
