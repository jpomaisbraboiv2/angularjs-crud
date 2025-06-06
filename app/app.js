const app = angular.module('appRouter', ['ngRoute', 'ngMessages'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/products', {
      templateUrl: 'app/views/product-list.html',
      controller: 'ProductController'
    })
    .when('/products/new', {
      templateUrl: 'app/views/product-form.html',
      controller: 'ProductController'
    })
    .when('/products/:id', {
      templateUrl: 'app/views/product.html',
      controller: 'ProductController'
    })
    .when('/products/:id/edit', {
      templateUrl: 'app/views/product-form.html',
      controller: 'ProductController'
    })
    .otherwise({
      redirectTo: '/products'
    })
})