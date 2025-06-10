(function () {
  app.controller("ProductController", function ($scope, $location, $routeParams, productsApi) {
    const productId = $routeParams.id

    productsApi.getProducts().then(function (response) {
      $scope.products = response.data;
    });

    productsApi.getCategories().then(function (response) {
      $scope.categories = response.data;
    });

    $scope.submitForm = function () {
      delete $scope.formData.slug;

      productsApi.createOrUpdateProduct(angular.copy($scope.formData))
        .then(savedProduct => {
          $scope.product = savedProduct;

          const idx = $scope.products.findIndex(product => product.id === savedProduct.id)

          if (idx !== -1) {
            $scope.products[idx] = savedProduct;
          } else {
            $scope.products.push(savedProduct);
          }

          $location.path(`/products/${savedProduct.id}`);
        })
        .catch(errorMsg => {
          alert(errorMsg);
        });
    }

    if (productId) {
      productsApi.getProductById(productId).then(result => {
        $scope.product = result.data
        $scope.formData = {
          ...result.data,
          categoryId: result.data.category.id
        };
      })
    }

    $scope.deleteProduct = function (id) {
      const idx = $scope.products.findIndex(product => product.id === id)

      productsApi.deleteProduct(id).then(_ => {
        if (idx !== -1) {
          $scope.products.splice(idx, 1);
        }

        $location.path('/products');

      }).catch(_ => alert("Erro ao deletar produto"))
    }
  });
})()