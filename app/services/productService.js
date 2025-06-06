const apiUri = 'https://api.escuelajs.co/api/v1/products/'

app.factory("productsApi", function ($http) {
  return {
    getProducts: function () {
      const result = $http.get(apiUri)

      return result
    },
    getCategories: function () {
      const result = $http.get(`https://api.escuelajs.co/api/v1/categories`)

      return result
    },
    getProductById: function (id) {
      const result = $http.get(apiUri + id)

      return result
    },
    createOrUpdateProduct: function (data) {
      if (data.id) {
        return $http.put(`https://api.escuelajs.co/api/v1/products/${data.id}`, data)
          .then(response => response.data)
          .catch(_ => 'Erro ao editar produto')
      }


      return $http.post(`https://api.escuelajs.co/api/v1/products/`, { ...data, images: ['https://placehold.co/200'] })
        .then(response => response.data)
        .catch(_ => 'Erro ao criar produto')
    },
    deleteProduct: function (id) {
      return $http.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then(response => response.data)
        .catch(_ => 'Erro ao deletar produto')
    }
  }
})