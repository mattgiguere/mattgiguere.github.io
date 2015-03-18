var app = angular.module('myGhWebApp', [
    'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    .when("/cv", {templateUrl: "partials/cv.html", controller: "PageCtrl"})
    .when("/research", {templateUrl: "partials/research.html", controller: "PageCtrl"})
    .when("/sites", {templateUrl: "partials/sites.html", controller: "PageCtrl"})
    // Blog
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 50000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});