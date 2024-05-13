<script setup lang="ts">
import {ref} from 'vue'
import {Product} from "@selldone/core-js/models/shop/product/product.model.ts";
import {Category} from "@selldone/core-js/models/shop/category/category.model.ts";



const products_count = ref(0)
const i_products = ref<Product.IProduct[]>([])
const i_folders = ref<Category.ICategory[]>([])

const fecth = () => {
  /**
   * Handles the success response from the storefront API fetch call.
   * Updates the internal state with the new data fetched.
   *
   * @param {Object} response - The response object from the API.
   * @param {Array} response.products - Array of product objects.
   * @param {number} response.total - Total number of products.
   * @param {Array} response.folders - Array of folder objects.
   * @param {Object} response.parent - The parent category object.
   */
  const handleSuccessResponse = ({products, total, folders, parent}: xapi.products.get.IResponse) => {
    products_count.value = total;
    i_products.value = products;
    i_folders.value = folders;

    console.log(products, total, folders, parent)
  };


  window.$storefront.products
      .optimize(600) // Cache products for 600 seconds
      .fetchProducts(null, 0, 10, {
        categories_count: 10,
        with_parent: true,
        with_page: true,
        with_total: true,
      })
      .cache(handleSuccessResponse)
      .then(handleSuccessResponse)
      .catch(() => {
        // log error
      })
      .finally(() => {
        // ...
      });


}

const getShopImagePath = (path: string | null,
                          size: number | null = null,
                          random_fill: boolean | number = false) => window.CDN.GET_SHOP_IMAGE_PATH(path, size, random_fill)

</script>

<template>
  <h1>Fetch Products</h1>
  <div class="card">
    <button type="button" @click="fecth">Fetch Products Now</button>
    <p>
      Total products is {{ products_count }}
    </p>
  </div>
  <h3>Products</h3>
  <div v-for="product in i_products" :key="product.id!" class="p-row">
    <img :src="getShopImagePath(product.icon!,128)">
    <div>
      <div>{{ product.title }}</div>
      <div class="-price"><b>{{ product.price }} {{ product.currency }}</b>

        <span class="-discount" v-if="product.discount">{{ product.discount }} </span>
      </div>
    </div>
  </div>

  <h3>Categories</h3>
  <div v-for="folder in i_folders" :key="folder.id" class="c-row">
    <img :src="getShopImagePath(folder.icon,128)">
    <div>{{ folder.title }}</div>
  </div>
</template>

<style scoped>
.p-row, .c-row {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: start;

  img {
    width: 42px;
    height: 42px;
    margin-inline-end: 16px;
    border-radius: 6px;
    overflow: hidden;
  }

  .-price {
    font-size: 0.9rem;
  }

  .-discount {
    color: #f00;
    font-size: 0.8rem;
    margin: 0 8px;
  }
}

</style>
