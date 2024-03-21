<template>
  <div>
    <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
    <li v-for="item in categories" :key="item">
      <RouterLink
        :to="`/products?category=${item}`"
        class="nav-item nav-link text-nowrap px-2"
        >{{ item }}</RouterLink
      >
    </li>
  </div>
  <div class="container">
    <div class="mt-4 mb-9 row">
      <div class="col-md-5">
        <img
          :src="product.imageUrl"
          alt=""
          class="object-fit-cover"
          height="400px"
        />
      </div>
      <div class="col-md-6 mt-4 mb-7 ms-7 text-secondary">
        <h2 class="mb-0">{{ product.title }}</h2>
        <p class="fw-bold">NT${{ product.price }}</p>
        <p>
          {{ product.description }}
        </p>
        <p>
          {{ product.content }}
        </p>
        <div class="input-group">
          <select name="" id="" class="form-select mb-3" v-model="qty">
            <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
          </select>
        </div>

        <RouterLink
          to="/cart"
          class="btn btn-outline-secondary btn-block rounded-0 py-2"
          @click.prevent="addToCart(product.id)"
          >直接購買</RouterLink
        >
        <a
          class="btn btn-secondary btn-block rounded-0 py-2"
          @click.prevent="addToCart(product.id, qty)"
          >加入購物車</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import cartStore from '../../stores/cartStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      qty: 1,
      product: {},
      isLoading: false,
    };
  },
  watch: {
    product() {
      this.qty = 1;
    },
  },
  methods: {
    getProduct() {
      const id = this.$route.params.productId;
      this.isLoading = true;
      axios.get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product;
        this.isLoading = false;
      });
    },
    ...mapActions(cartStore, ['addToCart']),
  },
  mounted() {
    this.getProduct();
  },
};
</script>
