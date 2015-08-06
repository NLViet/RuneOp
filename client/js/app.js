/**
 * Created by Viet on 04.08.2015.
 */
angular.module('OPRuned', ['ui.router'])
    .controller('MonsterCtrl', function($scope, $http, CurrentMonster){
        $scope.currentMonster = CurrentMonster;
        $http.get('js/monsterstat.json').then(function(articlesResponse) {
            $scope.monsters = articlesResponse.data;
        });
    })
    .controller('MonsterDetailCtrl', function($scope,CurrentMonster){
        $scope.currentMonster = CurrentMonster;
    })
    .factory('CurrentMonster', function() {
        var monsterItem;
        return {
            getMonster: function() {
                return monsterItem;
            },
            setMonster: function(monster) {
                monsterItem = monster;
                console.log(monster);
            },
        };
    })
    .config(function($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/start");
        // Now set up the states
        $stateProvider
            .state('start', {
                url: "/start",
                templateUrl: "partials/start.html"
            })
            .state('details', {
                url: "/details",
                templateUrl: "partials/details.html",
                controller: 'MonsterDetailCtrl'
            })

    });

