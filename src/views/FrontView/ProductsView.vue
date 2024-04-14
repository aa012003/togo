<template>
  <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
    <div class="bg-white sticky-top">
      <div class="container">
      </div>
    </div>
    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <RouterLink :to="`/product/${product.id}`" style="text-decoration: none;"
         class="col-md-3" v-for="product in products" :key="product.id">
          <div class="card border-0 mb-4 position-relative position-relative">
            <img :src="product.imageUrl" alt="產品圖片" class="object-fit-cover"
            style="width: 100%; height: auto; aspect-ratio: 1 / 1;">
            <a class="text-dark">
              <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"/>
            </a>
            <div class="card-body p-0">
              <h6 class="mb-0 mt-3 ">
                <div to="`/product/{product.id}`" class="text-info h4"
                style="text-decoration: none;">
                {{ product.title }}
                <div>
                  <button class="btn btn-danger text-white mt-3"
                    type="button"
                    style="position: relative; right: 0px; top: 0px; width: 100%"
                    @click.prevent="addToCart(product.id, qty)">
                    <i class="bi bi-cart me-2"/>加入購物車
                  </button>
                </div>
                <div class="text-danger h5 mt-3"
                v-if="product.origin_price == product.price">NT$ {{ product.price }}</div>
                <div v-else>
                    <div class="text-danger h5 mt-3">NT$ {{ product.price }}
                      <del class="text-light h6">NT$ {{ product.origin_price }}
                    </del>
                    </div>
                </div>
                </div>
          </h6>
            </div>
          </div>
        </RouterLink>
      </div>
      <nav class="d-flex justify-content-center">
        <ul class="pagination" :style="{ cursor: 'pointer' }">
          <li class="page-item"
          :class="{disabled: !pages.has_pre}">
            <a @click="changePage(pages.current_page-1)" class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item " :class="{active: page === pages.current_page}"
          v-for="page in pages.total_pages" :key="page+123">
            <a class="page-link" @click="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{disabled: !pages.has_next}">
            <a @click="changePage(pages.current_page+1)" class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: {},
      product: {},
      qty: 1,
      pages: {},
      selectedCategory: '',
      currentPage: 1,
      isLoading: false,
    };
  },
  watch: {
    '$route.query': {
      handler() {
        this.getProducts();
      },
    },
  },
  methods: {
    getProducts() {
      const { category = '' } = this.$route.query;
      const selectedCategory = this.selectedCategory || category;
      this.isLoading = true;

      axios.get(`${VITE_URL}/api/${VITE_PATH}/products?category=${selectedCategory}&page=${this.currentPage}`)
        .then((res) => {
          this.pages = res.data.pagination;
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
          this.isLoading = false;
        });
    },
    changePage(page) {
      this.currentPage = page;
      this.getProducts();
    },
    ...mapActions(cartStore, ['addToCart']),
  },
  mounted() {
    axios.get(`${VITE_URL}/api/${VITE_PATH}/products`)
      .then((res) => {
        this.categories = res.data.pagination.category;
      })
      .catch((err) => {
        Swal.fire(err.response.data.message);
        this.isLoading = false;
      });

    this.getProducts();
  },
};
</script>
