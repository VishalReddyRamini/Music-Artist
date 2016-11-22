var app = angular.module('plunker', ['ngRoute']);

app.factory("musicService", ["$rootScope", function($rootScope) {
  var svc = {};
  var data = [{
    name: "GroupLove",
    genre: "Alternative",
    rating: "4"
  }, {
    name: "The Bettles",
    genre: "Rock",
    rating: "5"
  }, {
    name: "The Cure",
    genre: "New Wave",
    rating: "4"
  }];

  svc.getArtists = function() {
    return data;
  };
  svc.addArtists = function(artist) {
     data.push(artist);
  };
  svc.editArtists = function(artist) {
    return data[artist];
  };
  return svc;
}]);

app.controller("ListController", ["$scope", "$location", "$routeParams", "musicService", function($scope, $location, $routeParams, musicService) {
  $scope.artists = musicService.getArtists();
  $scope.addArtist = function() {

    $location.path("/items/add");
  };
  $scope.editItem = function(x) {
    console.log("x value is:"+x);
    $location.path("/items/" + x);
  };
}]);



app.config(function($routeProvider) {
  $routeProvider
    .when('/items', {
      templateUrl: 'view-list.html',
      controller: 'ListController'
    })
    .when('/items/add', {
      templateUrl: 'view-detail.html',
      controller: 'AddController'
    })
    .when('/items/:index', {
      templateUrl: 'view-detail.html',
      controller: 'EditController'
    })
    .otherwise({
      redirectTo: "/items"
    })
});

app.controller("AddController", ["$scope", "$location", "$routeParams", "musicService", function($scope, $location, $routeParams, musicService) {
  $scope.save = function() {
    musicService.addArtists({name:$scope.items.name,genre:$scope.items.genre,rating:$scope.items.rating});
    $location.path("/items")
  };
  $scope.cancel = function() {
    $location.path("/items")
  };
}]);
app.controller("EditController", ["$scope", "$location", "$routeParams", "musicService", function($scope, $location, $routeParams, musicService) {
  console.log("index is:"+$routeParams.index);
  $scope.items = musicService.editArtists([parseInt($routeParams.index)]);

  $scope.save = function() {
    $location.path("/items")
  };
  $scope.cancel = function() {
    $location.path("/items")
  };
}]);