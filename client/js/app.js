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
    .controller('MonsterDetailCtrl', function($scope,CurrentMonster, RuneStorage){
        $scope.currentMonster = CurrentMonster;
        $scope.runeStorage = RuneStorage;
        $scope.monster = $scope.currentMonster.getMonster();

        $scope.runes = JSON.parse(localStorage.getItem('runeStore'));

        var temp = JSON.parse(localStorage.getItem('runeStore'));
        console.log("Lokal");
        console.log(temp);
    })
    .controller('RunesCtrl', function($scope, RuneStorage){
        $scope.runeStorage = RuneStorage;

        $scope.runeToStore = {};

        $scope.save = function(rune) {
            $scope.runeToStore = angular.copy(rune);
            $scope.runeStorage.storeRune($scope.runeToStore);
        };
    })
    .factory('CurrentMonster', function() {
        var monsterItem;
        return {
            getMonster: function() {
                return monsterItem;
            },
            setMonster: function(monster) {
                monsterItem = monster;
                localStorage.setItem('newMonster', JSON.stringify(monsterItem));
            },
        };
    })
    .factory('RuneStorage', function(){
        var runes = [];
        return {
            storeRune: function(rune){
                runes.push(rune);
                localStorage.setItem('runeStore', JSON.stringify(runes));
                console.log('Runes '+runes);
            },
            getRuneStore: function() {
                return runes;
            }
        }
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
            .state('runes', {
                url: "/runes",
                templateUrl: "partials/runes.html",
                controller: 'RunesCtrl'
            })
    });

